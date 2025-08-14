const User = require('../models/userModel');
const Token = require('../models/blackListTokens');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    try {
        const isUserExist = (await User.find({ username: req.body.username })).length;
        if (isUserExist) {
            return res.status(401).send('User already exists')
        }
        const user = new User(req.body);
        await user.save();
        return res.status(201).send("User Created")
    } catch (error) {
        return res.status(500).send('Internal Server error')
    }
}

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const isUserExist = (await User.find({ username, password })).length;
        if (isUserExist) {
            const token = jwt.sign({ username }, SECRET, { expiresIn: '15m' })
            res.status(200).json({
                token: token,
                message: "Logged in"
            })
        } else {
            res.status(401).send('Username or password is invalid')
        }
    } catch (error) {
        return res.status(500).send('Internal Server error')
    }
}

const logout = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const blackListToken = new Token({ token });
        await blackListToken.save();
        return res.status(200).send('Logged out');
    } catch (error) {
        return res.status(500).send('Internal Server error')
    }
}

module.exports = { createUser, login, logout }
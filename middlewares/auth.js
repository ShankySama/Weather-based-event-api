const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const auth = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token is required')
    }
    try {
        const decode = jwt.verify(token, SECRET);
        if (decode) {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send('Invalid token')
    }
}

module.exports = { auth }
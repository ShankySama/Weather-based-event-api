const express = require('express');
const { validateUser } = require('../middlewares/userValidateor');
const { createUser, login, logout } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const { createEvent, getEvents, updateEvent, deleteEvent, getEventById } = require('../controllers/eventController');
const { validateCreateEvent } = require('../middlewares/eventValidator');
const router = express.Router();

router.get('', (req, res) => {
    res.send("Weather API are running")
})

// User routes
router.post('/users/signup', validateUser, createUser)
router.post('/users/login', validateUser, login)
router.post('/logout', logout)

// Events Routes
router.get('/events', getEvents)
router.get('/event/:id',getEventById)
router.post('/event', auth,validateCreateEvent, createEvent)
router.put('/event/:id', auth,validateCreateEvent, updateEvent)
router.delete('/event/:id', auth, deleteEvent)

module.exports = { router }
const Event = require('../models/eventModel');
const API_KEY = "e186d45e428fe54668a8c4e7cdc8ec1b"

const getEvents = async (req, res) => {
    try {
        const data = await Event.find({ isDeleted: false });
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server error')
    }

}

const getEventById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Event.findById({ _id });
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server error')
    }

}

const createEvent = async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    try {
        const weatherData = await fetch(url).then((res) => res.json());
        const eventData = {
            ...req.body,
            eventData: weatherData,
            isDeleted: false
        }
        const data = new Event(eventData);
        await data.save();
        return res.status(201).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server error')
    }
}

const updateEvent = async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    try {
        const weatherData = await fetch(url).then((res) => res.json());
        const updatedData = {
            ...req.body,
            eventData: weatherData
        }
        await Event.updateOne({
            _id: req.params.id
        }, {
            $set: updatedData
        }
        )
        res.status(200).send("Event Updated")
    } catch (error) {
        return res.status(500).send('Internal Server error')
    }
    return res.status(201).send('event updated');
}

const deleteEvent = async (req, res) => {
    try {
        await Event.updateOne({ _id: req.params.id }, {
            $set: { isDeleted: true }
        });
        return res.status(200).send("Event Deleted");
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server error')
    }
}


module.exports = { createEvent, getEvents, updateEvent, deleteEvent, getEventById }
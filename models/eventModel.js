const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: { type: String, require: true },
    desc: { type: String, require: true },
    date: { type: Date, require: true },
    time: { type: Date, require: true },
    location: { type: String, require: true },
    lat: { type: Number, require: true },
    lon: { type: Number, require: true },
    eventData: { type: Object, require: true },
    isDeleted: { type: Boolean, require: true },
})

module.exports = mongoose.model('event', schema)
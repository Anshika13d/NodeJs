const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [ { timestamp: {type: Number} } ]
})
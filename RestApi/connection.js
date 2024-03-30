const mongoose = require('mongoose')

async function connectMonogDb(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMonogDb,
}
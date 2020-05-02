const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    countryId: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required:true
    },
})

module.exports = mongoose.model('cities', citySchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
    title: {
        type: String,
        required:true
    },
    code: String,
})

module.exports = mongoose.model('countries', countrySchema)
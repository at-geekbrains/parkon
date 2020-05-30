const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    phones: [String],
    emails:[String],
    address: {
        cityId: String,
        street: String
    },
    userId: {
        type: String,
        required:true
    },
})

module.exports = mongoose.model('contacts', contactSchema)
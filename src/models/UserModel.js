const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    role: {
        type: Number,
        default: 0, // O - User; 1 - Admin
    }
})

module.exports = mongoose.model('users', userSchema)

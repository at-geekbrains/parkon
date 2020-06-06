const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nnSchema = new Schema({
    timestamp: {
        type: Number,
    },
    cam_id: {
        type: String,
    },
    result: {
            'lat1 lon1': {
                type: Number
            },
            'lat2 lon2': {
                type: Number
            },
            'lat3 lon3': {
                type: Number
            },
            'lat4 lon4': {
                type: Number
            },
            'lat5 lon5': {
                type: Number
            },
            'lat6 lon6': {
                type: Number
            },
            'lat7 lon7': {
                type: Number
            },
    },
})

module.exports = mongoose.model('nn_output', nnSchema)

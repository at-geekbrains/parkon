const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nnSchema = new Schema({
    timestamp: {
        type: Double,
    },
    cam_id: {
        type: String,
    },
    result: {
            'lat1 lon1': {
                type: Double
            },
            'lat2 lon2': {
                type: Double
            },
            'lat3 lon3': {
                type: Double
            },
            'lat4 lon4': {
                type: Double
            },
            'lat5 lon5': {
                type: Double
            },
            'lat6 lon6': {
                type: Double
            },
            'lat7 lon7': {
                type: Double
            },
    },
})

module.exports = mongoose.model('nn_output', nnSchema)

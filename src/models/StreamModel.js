const mongoose = require('mongoose')
const Schema = mongoose.Schema

const streamSchema = new Schema({
    url: { // Адрес потока
        type: String,
        required:true,
        unique: true
    },
    displayName: { // Отображаемое имя потока
        type: String,
    },
    location: { // Расположение источника потока (адрес камеры)
        type: String,
    },
    description: { // Описание потока
        type: String,
    },
    port: {
        type: Number,
        default: 9000, // Порт на котором будет показываться стрим
    },
    consumers: [
        {
            consumerId: {
                type: String // Идентификатор зрителя
            },
            consumerStatus: {
                type: Number, //
            }
        }
    ],
    status: {
        type: Number,
        default: 0, // Статус потока
    }
})

module.exports = mongoose.model('streams', streamSchema)

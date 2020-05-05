ConsumerStream = require('node-rtsp-stream')
const Stream = require('../models/StreamModel')
const User = require('../models/UserModel')
const errorHandler = require('../utils/errorHandler')

const demoStream=[ // некторые рабочие каналы, на всякий случай
    "rtsp://stream.studio360.tv:554/nw/nw_576p",
    'rtmp://stream.studio360.tv:1935/nw/nw_576p',
    'http://dprtv.phoenix-dnr.ru/first-republic-tv',
    'http://12channel.bonus-tv.ru:80/stream549837052987/tracks-v1a1/mono.m3u8',
]
const wsStartPort = 9000;
let wsCurrentPort = wsStartPort;
const currentStream = [] // Информация о текущем стриме из БД
const activeConsumerStream = [] // Здесь будут лежать сами запущенные стримы

// stream = new consumerStream({
//     name: 'name',
//     streamUrl: url[0],
//     wsPort: 9999,
//     ffmpegOptions: { // options ffmpeg flags
//         '-stats': '', // an option with no neccessary value uses a blank string
//         '-r': 30 // options with required values specify the value after the key
//     }
// })
const showStream = (displayName = 'StreamName', url = '', port) => {
    return new ConsumerStream({
        name: displayName,
        streamUrl: url,
        wsPort: port,
        ffmpegOptions: { '-stats': '', '-r': 30 }
    })
}

module.exports.getAll = async function (req, res){
    try {
        const streams = await Stream.find();
        res.status(200).json(streams)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res){
    try {
        const stream = await Stream.findById(req.params.id)
        res.status(200).json(stream)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res){
    try {
        await Stream.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Stream removed'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res){
    const stream = new Stream({
        url: req.body.url,
        displayName: req.body.displayName,
        location: req.body.location,
        description: req.body.description
    })
    try {
        await stream.save()
        res.status(201).json(stream)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res){
    const updated = {
        url: req.body.url,
        displayName: req.body.displayName,
        location: req.body.location,
        description: req.body.userId
    }
    try {
        const contact = await Stream.findOneAndUpdate(
            {_id: req.params.id},
            {$set:updated},
            {new:true}
        )
        res.status(200).json(stream)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.open = async function(req, res){
    try {
        const stream = await Stream.findById(req.params.id) // Ожидам со стороны клиентского приложения идентификатор стрима
        const consumer = await User.findById(req.body.id) // Ожидам со стороны клиентского приложения идентификатор пользователя
        if(stream._id && consumer._id) { // Проверяем наличие в БД стрима и пользователя
            const index = currentStream.findIndex((item) => (item._id === stream._id)) // Показывается ли этот поток уже
            if(index === -1){ // Если этот стрим сейчас не просматривается...
                stream.consumers.push({consumerId: consumer._id, consumerStatus: 0}); // Добавить идентификатор зрителя
                currentStream.push(stream); // Поместить стрим в массив просматриваемых сейчас стримов
                activeConsumerStream.push({
                    streamId: stream._id,
                    show: showStream(stream.displayName, stream.url, ++wsCurrentPort)
                })
                res.status(200).json(stream) // Передаем на клиента информацию о запущенном стриме
            }else{ // Если такой стрим просматривается ....
                // TODO - здесь возможен вариант что у пользователя на этот стрим может быть запущено несколько вкладок, надо как то их различать
                currentStream[index].consumers.push({consumerId: consumer._id, consumerStatus: 0}); // Добавить идентификатор зрителя
                currentStream[index].port = ++wsCurrentPort;
                activeConsumerStream.push({ // Реально запускаем сам стрим
                    streamId: stream._id, // Связываем запущенный стрим со стримом в БД
                    show: showStream(stream.displayName, stream.url, wsCurrentPort)
                })
                res.status(200).json(currentStream[index]) // Передаем на клиента информацию о запущенном стриме
            }
        }

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.close = async function(req, res){
    try {

    } catch (e) {
        errorHandler(res, e)
    }
}


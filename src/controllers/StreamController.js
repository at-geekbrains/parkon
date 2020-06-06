const ConsumerStream = require('node-rtsp-stream')
const Stream = require('../models/StreamModel')
const User = require('../models/UserModel')
const Nnm = require('../models/NNModel')
const errorHandler = require('../utils/errorHandler')

const demoStream=[ // некоторые рабочие каналы, на всякий случай
    "rtsp://stream.studio360.tv:554/nw/nw_576p",
    'rtmp://stream.studio360.tv:1935/nw/nw_576p',
    'http://dprtv.phoenix-dnr.ru/first-republic-tv',
    'http://12channel.bonus-tv.ru:80/stream549837052987/tracks-v1a1/mono.m3u8',
]
const wsStartPort = 9000;
let wsCurrentPort = wsStartPort;
let currentStream = [] // Информация о текущем стриме из БД
let activeConsumerStream = [] // Здесь будут лежать сами запущенные стримы

const showStream = (stream) => {
    const options = {
        name: stream.displayName,
        streamUrl: stream.url,
        wsPort: stream.wsPort,
        ffmpegOptions: { '-stats': '', '-r': 30 }
    }
    return new ConsumerStream(options);
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
        const stream = await Stream.findById(req.params.id) // Ожидаем со стороны клиентского приложения идентификатор стрима
        const consumer = await User.findById(req.body.id) // Ожидаем со стороны клиентского приложения идентификатор пользователя
        if(stream._id && consumer._id) {
            // Проверяем наличие в БД стрима и пользователя
            // Показывается ли этот поток уже
            const index = currentStream.findIndex(item => item._id.toString() == stream._id.toString())
            nnmInit(); // создаем тестовую запись в nn_output
            const nnm = await Nnm.find({cam_id: stream._id.toString()}).sort({timestam: -1}).limit(1);
            //console.log(nnm);
            if(index >= 0){
                    // Если такой стрим активен и просматривается ....
                    // TODO - здесь возможен вариант что у пользователя на этот стрим может быть запущено несколько вкладок,
                    //  надо как то их различать, или не надо?
                // Добавить идентификатор зрителя
                currentStream[index].consumers.push({consumerId: consumer._id, consumerStatus: 0});
                // Передаем на клиента информацию о запущенном стриме
                res.status(200).json({
                        'port': currentStream[index].wsPort,
                        'output': nnm
                    })
                }
            else{
                // Если этот стрим сейчас не просматривается...
                stream.consumers.push({consumerId: consumer._id, consumerStatus: 0}); // Добавить идентификатор зрителя
                wsCurrentPort++;
                stream.wsPort = wsCurrentPort;
                currentStream.push(stream); // Поместить стрим в массив просматриваемых сейчас стримов
                activeConsumerStream.push({
                    streamId: stream._id,
                    show: showStream(stream)//показ потока
                });
                //activeConsumerStream[activeConsumerStream.length - 1].show.start();
                // Передаем на клиента информацию о запущенном стриме
                res.status(200).json({
                    'port': stream.wsPort,
                    'output': nnm

                })
            }
        }
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.close = async function(req, res){
    try {
        const stream = await Stream.findById(req.params.id) // Ожидам со стороны клиентского приложения идентификатор стрима
        const consumer = await User.findById(req.body.id) // Ожидам со стороны клиентского приложения идентификатор пользователя
        if(stream._id && consumer._id) { // Проверяем наличие в БД стрима и пользователя

            // Показывается ли этот поток уже
            const index = activeConsumerStream.findIndex(item => item.streamId.toString() == stream._id.toString() )

            if(index >= 0){ // Если такой стрим активен и просматривается ....
                // TODO - здесь возможен вариант что у пользователя на этот стрим может быть запущено несколько вкладок,
                //  надо как то их различать, или не надо?
                // TODO - в этой версии удаляется весь стрим, даже если его смотрят другие пользователи,
                //  нужно описание логики от постановщика задач
                currentStream.splice(index,1);
                activeConsumerStream[index].show.stop();
                activeConsumerStream.splice(index,1);
                wsCurrentPort--;
                res.status(200).json('Stream closed') // Передаем на клиента информацию о запущенном стриме
            } else {
                res.status(200).json('Stream not found')
            }
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

const nnmInit = async () => {
    const nnm = new Nnm({
        timestamp: Date.now(),
        cam_id: "5ed27b0f8c07852e00cf1a90",
        result: [
           0,0,0,1,0,1,0
        ]
    })
    try {
        await nnm.save()
    } catch (e) {
        errorHandler(res, e)
    }
}


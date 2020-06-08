/*********** Common options ***********/
const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path');

/*********** MongoDB options ***********/
const dbOptions = require("./src/config/db");

/*********** Routes - REST ***********/
const homeRoutes = require('./src/routes/HomeRoutes')
const aboutRoutes = require('./src/routes/AboutRoutes')
const contactsRoutes = require('./src/routes/ContactsRoutes')
const authRoutes = require('./src/routes/AuthRoutes')
const userRoutes = require('./src/routes/UserRoutes')
const countryRoutes = require('./src/routes/CountryRoutes')
const cityRoutes = require('./src/routes/CityRoutes')
const contactRoutes = require('./src/routes/ContactRoutes')
const streamRoutes = require('./src/routes/StreamRoutes')
const mailRoutes = require('./src/routes/MailRoutes')

/*********** Server options ***********/
const port = process.env.PORT || 3000
const message = {
    start:`Server has been started on ${port}!`
}
/*********** CORS ***********/
let corsOptions = {
    origin: ' https://kradyedy.github.io/ParkOn/',
    optionsSuccessStatus: 204,
    credentials: true
}
/*********** Server init ***********/
const app = express();
mongoose.connect(dbOptions.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('MongoDB connected!'))
    .catch(error => console.log(error))

/*********** Express + Socket.IO ***********/
const httpServer = require('http').Server(app);
const io = require("socket.io")(httpServer);

/*********** Express options ***********/
app.use(passport.initialize())
require('./src/middleware/passport')(passport)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

/*********** EJS Options ***********/
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './src/views'));

/*********** EJS Template Routes - Pages ***********/
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/contacts', contactsRoutes);

/*********** Express Routes - REST - API ***********/
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/mail', mailRoutes);

/*********** Stream Routes ***********/
app.use('/api/stream', streamRoutes);

/*********** Server start ***********/
// Stream = require('node-rtsp-stream')
const url=[
    "rtsp://stream.studio360.tv:554/nw/nw_576p",
    'rtmp://stream.studio360.tv:1935/nw/nw_576p',
    'http://dprtv.phoenix-dnr.ru/first-republic-tv',
    'http://12channel.bonus-tv.ru:80/stream549837052987/tracks-v1a1/mono.m3u8',
]

    //
    //                     rtsp://stream.the.sk/live/24cz/24cz.3gp
    //                         rtsp://stream.the.sk/live/ta3.3gp
    //                             rtsp://stream.the.sk/live/musicbox/musicbox.3gp
    //                                 rtsp://stream.the.sk/live/ct24/ct24.3gp
    //
    //                                     rtsp://qtss1.telemakstream.net/3gpp/abmangas_fr_edge.sdp
    //                                         rtsp://qtss1.telemakstream.net/3gpp/abaction_fr_edge.sdp
    //                                             rtsp://qtss1.telemakstream.net/3gpp/ab4_fr_edge.sdp
    //                                                 rtsp://qtss1.telemakstream.net/3gpp/ab3_fr_edge.sdp
    //                                                     rtsp://qtss1.telemakstream.net/3gpp/tracetv_fr_edge.sdp
    //                                                         rtsp://qtss1.telemakstream.net/3gpp/tv5europe_fr_edge.sdp
    //                                                             rtsp://qtss1.telemakstream.net/3gpp/euronews_fr_edge.sdp
    //                                                                 rtsp://qtss1.telemakstream.net/3gpp/canalz_fr_edge.sdp
    //                                                                     rtsp://qtss1.telemakstream.net/3gpp/liberty_nl_edge.sdp
    //                                                                         rtsp://qtss1.telemakstream.net/3gpp/kanaalz_nl_edge.sdp
    //                                                                             rtsp://qtss1.telemakstream.net/3gpp/jimtv_nl_edge.sdp
    //                                                                                 rtsp://qtss1.telemakstream.net/3gpp/vtm_nl_edge.sdp
    //                                                                                     rtsp://qtss1.telemakstream.net/3gpp/tracetv_uk_edge.sdp
    //                                                                                         rtsp://qtss1.telemakstream.net/3gpp/ebs_uk_edge.sdp
    //                                                                                             rtsp://qtss1.telemakstream.net/3gpp/fashiontv_uk_edge.sdp
    //                                                                                                 rtsp://qtss1.telemakstream.net/3gpp/euronews_uk_edge.sdp
    //                                                                                                     rtsp://qtss1.telemakstream.net/3gpp/ebs_floor_edge.sdp
    //
    //                                                                                                         Просто потоковые песни:
    // rtsp://66.220.31.130/3gp/miles.3gp
    //     rtsp://66.220.31.130/3gp/baby.3gp
    //         rtsp://66.220.31.130/3gp/lights.3gp
    //             rtsp://66.220.31.130/3gp/taxi.3gp
    //                 rtsp://66.220.31.130/3gp/cherish.3gp
    //                     rtsp://66.220.31.130/3gp/complicated.3gp
    //                         rtsp://66.220.31.130/3gp/cream.3gp
    //                             rtsp://66.220.31.130/3gp/love.3gp
    //                                 rtsp://66.220.31.130/3gp/nakita.3gp
    //                                     rtsp://66.220.31.130/3gp/horizon.3gp
    //                                         rtsp://66.220.31.130/3gp/feat.3gp
    //                                             rtsp://66.220.31.130/3gp/crazy.3gp
    //                                                 rtsp://66.220.31.130/3gp/game.3gp
    //                                                     rtsp://66.220.31.130/3gp/summer.3gp
    //                                                         rtsp://66.220.31.130/3gp/alibis.3gp
    //                                                             rtsp://66.220.31.130/3gp/rule.3gp
    //                                                                 rtsp://66.220.31.130/3gp/chance.3gp
    //                                                                     rtsp://66.220.31.130/3gp/yeah.3gp
    //                                                                         rtsp://66.220.31.130/Playlist3GP.sdp
    //                                                                             rtsp://tributary.rave.ac.uk/3g/db/BUMP_N_RIND-mp4.3gp
/********************************************************************************/
// stream = new Stream({
//     name: 'name',
//     streamUrl: url[3],
//     wsPort: 9999,
//     ffmpegOptions: { // options ffmpeg flags
//         '-stats': '', // an option with no neccessary value uses a blank string
//         '-r': 30 // options with required values specify the value after the key
//     }
// })

httpServer.listen(port, () => { console.log(message.start); });

/*********** Mail ***********/
// тестовая отправка
//const mailer = require('./src/controllers/MailController')
//mailer.testSend();

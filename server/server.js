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

/*********** Server options ***********/
const port = process.env.PORT || 3000
const message = {
    start:`Server has been started on ${port}!`
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
app.use(cors())
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

/*********** Server start ***********/
Stream = require('node-rtsp-stream')
const url=[
    "rtsp://184.72.239.149:554/vod/mp4:BigBuckBunny_115k.mov",
    "rtsp://stream.studio360.tv:554/nw/nw_576p",
    "videoproxy2.echd.ru:41025/rtsplive/10.200.21.21:2033/rtsp___10.208.1.18_axis_media_media.amp",
    "rtsp://admin:12345@192.168.0.209:554/mpeg4/ch01/main/av_stream",
    "tsp://v8.cache8.c.youtube.com/CigLENy73wIaHwlcw_gs85OUchMYDSANFEgGUgx1c2VyX3VwbG9hZHMM/0/0/0/video.3gp",
    'rtsp://v4.cache4.c.youtube.com/CigLENy73wIaHwlcw_gs85OUchMYESARFEgGUgx1c2VyX3VwbG9hZHMM/0/0/0/video.3gp',
    "rtsp://rtsp.me/6f683196-c00b-4976-b5b8-263f672b9cb6"
]
stream = new Stream({
    name: 'name',
    streamUrl: url[1],
    wsPort: 9999,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
})
httpServer.listen(port, () => { console.log(message.start); });

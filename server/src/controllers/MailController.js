const User = require('../models/UserModel')
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'Info.ParkOn@mail.ru', // Тестовый ящик
        pass: 'DE#sw2aq1'
    }
});
const sendMail = async (
    to = "Info.ParkOn@mail.ru",
    subject = "Message from Node js",
    text = "This message was sent from Node js server.",
    html = "This <i>message</i> was sent from <strong>Node js</strong> server."
) => {
    try {
        return await transporter.sendMail({
            from: '"ParkOnProjectsTeam" <Info.ParkOn@mail.ru>',
            to: to,
            subject: subject,
            text: text,
            html: html
        });
    }catch (e) {
        console.log(e.message);
    }
}


module.exports.send = async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        const to = req.body.to;
        const subject = req.body.subject;
        const text = req.body.text;
        const html = req.body.html;
        sendMail(to, subject, text, html).then((sendResult)=>{
            console.log(sendResult);
            console.log(text);
            res.status(201).json(sendResult)
        });

    }catch (e) {
        console.log(e.message);
    }

}

module.exports.testSend = function (req, res) {
    sendMail().then((sendResult)=>{
        console.log(sendResult);
    });
}
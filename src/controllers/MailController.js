const User = require('../models/UserModel');
const Mail = require('../config/mail');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: Mail.host,
    port: Mail.port,
    secure: Mail.secure,
    auth: {
        user: Mail.auth.user, // Тестовый ящик
        pass: Mail.auth.pass
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
            from: `"ParkOnProjectsTeam" <${Mail.auth.user}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        });
    }catch (e) {
        console.log(e.message);
    }
}

module.exports.notification = async function(email, password) {
    try {
        const to = email;
        const subject = 'ParkOn - Уведомление о регистрации в системе';
        const text = `Вы зарегистрированы как ${email} с паролем ${password}. Если письмо попало к вам ошибочно, просто проигнорируйте его.`;
        const html = `<p>Вы зарегистрированы как <strong>${email}</strong> с паролем <strong>${password}</strong>.</p><p>Если письмо попало к вам ошибочно, просто проигнорируйте его.</p>`;;
        sendMail(to, subject, text, html).then((sendResult)=>{
            console.log(sendResult);
        });
    } catch (e) {
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
module.exports = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURITY,
    auth: {
        user: process.env.MAIL_USER, // Тестовый ящик
        pass: process.env.MAIL_USER_PASS
    }
}
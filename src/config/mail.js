if(process.env.NODE_ENV === 'production'){
    module.exports = require('./mail.prod')
}else {
    module.exports = require('./mail.dev')
}
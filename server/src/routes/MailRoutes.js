const express = require('express')
const controller = require('../controllers/MailController')
const router = express.Router()

//router.post('/:userId', passport.authenticate('jwt', {session: false}), controller.send)
router.post('/:userId', controller.send)

module.exports = router

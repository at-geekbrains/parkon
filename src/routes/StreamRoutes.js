const express = require('express')
const passport = require('passport')
const controller = require('../controllers/StreamController')
const router = express.Router()

/*********** CRUD for Stream ***********/
// router.get('/',  passport.authenticate('jwt', {session: false}), controller.getAll)
// router.get('/:id',  passport.authenticate('jwt', {session: false}), controller.getById)
// router.delete('/:id',  passport.authenticate('jwt', {session: false}), controller.remove)
// router.post('/',  passport.authenticate('jwt', {session: false}), controller.create)
// router.patch('/:id',  passport.authenticate('jwt', {session: false}), controller.update)

// Для демо-версии без защиты маршрутов
router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.patch('/:id', controller.update)

/*********** Управление потоком со стороны пользователя ***********/
// router.post('/open/:id',  passport.authenticate('jwt', {session: false}), controller.open)
// router.post('/close/:id',  passport.authenticate('jwt', {session: false}), controller.close)

// Для демо-версии без защиты маршрутов
router.post('/open/:id', controller.open)
router.post('/close/:id', controller.close)

module.exports = router

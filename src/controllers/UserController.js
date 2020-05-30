const User = require('../models/UserModel')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
            await User.remove({_id: req.params.id})
            res.status(200).json({
                message: 'User removed'
            })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        password: req.body.password,//TODO - включить шифрацию
    })
    try {
        //TODO - произвести валидацию уникальности пользователя
        console.log(user);
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res) {
    const updated = {
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
    }
    try {
            const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set:updated},
            {new:true}
        )
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}
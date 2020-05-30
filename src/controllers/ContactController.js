const Contact = require('../models/ContactModel')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const contact = await Contact.findById(req.params.id)
        res.status(200).json(contact)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
            await Contact.remove({_id: req.params.id})
            res.status(200).json({
                message: 'Contact removed'
            })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    const contact = new Contact({
        phones: req.body.phones,
        emails: req.body.emails,
        address: req.body.address,
        userId: req.body.userId
    })
    try {
        await contact.save()
        res.status(201).json(contact)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res) {
    const updated = {
        phones: req.body.phones, //TODO - проверить передачу массивов
        emails: req.body.emails,
        address: req.body.address,
        userId: req.body.userId
    }
    try {
            const contact = await Contact.findOneAndUpdate(
            {_id: req.params.id},
            {$set:updated},
            {new:true}
        )
        res.status(200).json(contact)
    } catch (e) {
        errorHandler(res, e)
    }
}
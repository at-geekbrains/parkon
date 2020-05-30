const Country = require('../models/CountryModel')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const countries = await Country.find();
        res.status(200).json(countries)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const country = await Country.findById(req.params.id)
        res.status(200).json(country)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
            const title = (await Country.findById(req.params.id)).title;
            await Country.remove({_id: req.params.id})
            res.status(200).json({
                message: `Country ${title} removed`
            })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    const country = new Country({
        title: req.body.title,
        code: req.body.code,
    })
    try {
        await country.save()
        res.status(201).json(country)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res) {
    const updated = {
        title: req.body.title,
        code: req.body.code,
    }
    try {
            const country = await Country.findOneAndUpdate(
            {_id: req.params.id},
            {$set:updated},
            {new:true}
        )
        res.status(200).json(country)
    } catch (e) {
        errorHandler(res, e)
    }
}
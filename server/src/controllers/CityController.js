const City = require('../models/CityModel')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const cities = await City.find();
        res.status(200).json(cities)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const city = await City.findById(req.params.id)
        res.status(200).json(city)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
            const title = await City.findById(req.params.id).title;
            await City.remove({_id: req.params.id})
            res.status(200).json({
                message: `City ${title} removed`
            })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    const city = new City({
        title: req.body.title,
        countryId: req.body.countryId,
    })
    try {
        await city.save()
        res.status(201).json(city)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async function(req, res) {
    const updated = {
        title: req.body.title,
        countryId: req.body.countryId,
    }
    try {
            const city = await City.findOneAndUpdate(
            {_id: req.params.id},
            {$set:updated},
            {new:true}
        )
        res.status(200).json(city)
    } catch (e) {
        errorHandler(res, e)
    }
}
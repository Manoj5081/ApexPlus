const Joi = require('@hapi/joi')

async function addScenarioValidation (req, res, next){
    Joi.validate(req.body, {
        name: Joi.string().required().error(new Error('Name is required')),
        time: Joi.number().required().error(new Error('Time is required')),
    }, (err, value) => {
        if (err) {
            res.status(400).json({
                message: err.message
            })
        } else {
            next()
        }
    })
}
async function updateScenarioValidation (req, res, next){
    Joi.validate({...req.body,...req.params}, {
        id: Joi.string().required().error(new Error('id is required')),
        name: Joi.string().error(new Error('Name is required')),
        time: Joi.number().error(new Error('Time is required')),
    }, (err, value) => {
        if (err) {
            res.status(400).json({
                message: err.message
            })
        } else {
            next()
        }
    })
}
async function deleteScenarioValidation (req, res, next){
    Joi.validate(req.params, {
        id: Joi.string().required().error(new Error('id is required'))
    }, (err, value) => {
        if (err) {
            res.status(400).json({
                message: err.message
            })
        } else {
            next()
        }
    })
}

module.exports = {addScenarioValidation, updateScenarioValidation, deleteScenarioValidation}
const Joi = require('@hapi/joi')

async function addVehicleValidation (req, res, next){
    Joi.validate(req.body, {
        scenarioId: Joi.number().required().error(new Error('scenarioId is required')),
        name: Joi.string().required().error(new Error('Name is required')),
        positionX: Joi.number().required().error(new Error('X Position is required')),
        positionY: Joi.number().required().error(new Error('Y Position is required')),
        speed: Joi.number().required().error(new Error('Speed is required')),
        direction: Joi.string().valid('up', 'down', 'front','back').required().error(new Error('direction is required')),
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
async function updateVehicleValidation (req, res, next){
    Joi.validate({...req.body,...req.params}, {
        id: Joi.string().required().error(new Error('id is required')),
        scenarioId: Joi.number().required().error(new Error('scenarioId is required')),
        name: Joi.string().error(new Error('Name is required')),
        positionX: Joi.number().error(new Error('X Position is required')),
        positionY: Joi.number().error(new Error('Y Position is required')),
        speed: Joi.number().error(new Error('Speed is required')),
        direction: Joi.string().valid('up', 'down', 'front','back').error(new Error('direction is required')),
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
async function deleteVehicleValidation (req, res, next){
    Joi.validate(req.params, {
        id: Joi.string().required().error(new Error('id is required')),
        scenarioId: Joi.number().required().error(new Error('scenarioId is required')),
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

module.exports = {addVehicleValidation, updateVehicleValidation, deleteVehicleValidation}
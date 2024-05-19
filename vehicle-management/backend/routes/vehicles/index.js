const { addVehicleValidation,updateVehicleValidation, deleteVehicleValidation } = require('../../validations/vehicle');
const { addVehicle, updateVehicle, deleteVehicle, getVehiclesOfScenario } = require('./vehicleHandler');

const router = require('express').Router();
router.post('/', addVehicleValidation, addVehicle)
router.put('/:id',updateVehicleValidation, updateVehicle)
router.delete('/:id/scenario/:scenarioId',deleteVehicleValidation, deleteVehicle)
module.exports = router;
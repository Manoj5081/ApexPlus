const { addVehicleToScenario, updateVehicleToScenario, deleteVehicleFromScenario } = require("../../controllers/vehicleController");
const { customResponse, sendErrorResponse } = require("../../util");

async function addVehicle(req, res) {
    try {
      let result = addVehicleToScenario(req.body);
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}
async function updateVehicle(req, res) {
    try {
      let result = updateVehicleToScenario({...req.body, id: Number(req.params.id)});
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}
async function deleteVehicle(req, res) {
    try {
      let result = deleteVehicleFromScenario(Number(req.params.id), Number(req.params.scenarioId));
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}


module.exports = {addVehicle, deleteVehicle, updateVehicle}
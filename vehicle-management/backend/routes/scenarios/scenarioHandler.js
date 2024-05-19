const { addScenario, updateScenario, deleteScenario, deleteAllScenario, getAllScenario } = require("../../controllers/scenariosController");
const { customResponse, sendErrorResponse } = require("../../util");

async function addScenarioHandler(req, res) {
    try {
      let result = addScenario(req.body);
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}
async function updateScenarioHandler(req, res) {
    try {
      let result = updateScenario({...req.body, id: Number(req.params.id)});
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}
async function deleteSpecificScenarioHandler(req, res) {
    try {
      let result = deleteScenario(Number(req.params.id));
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}

async function deleteAllScenariosHandler(req, res) {
    try {
      let result = deleteAllScenario();
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}

async function getAllScenariosHandler(req, res) {
    try {
      let result = getAllScenario(req.body);
      customResponse(200, result, res);
    } catch (err) {
      sendErrorResponse(err, res);
    }
}

module.exports = {addScenarioHandler, updateScenarioHandler, deleteSpecificScenarioHandler, deleteAllScenariosHandler, getAllScenariosHandler}
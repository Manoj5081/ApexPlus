
const router = require('express').Router();
const { addScenarioValidation, updateScenarioValidation, deleteScenarioValidation } = require('../../validations/scenario');
const { addScenarioHandler, updateScenarioHandler, deleteSpecificScenarioHandler, deleteAllScenariosHandler, getAllScenariosHandler} = require('./scenarioHandler');

router.get('/', getAllScenariosHandler)
router.post('/', addScenarioValidation, addScenarioHandler)
router.put('/:id', updateScenarioValidation, updateScenarioHandler)
router.delete('/removeall', deleteAllScenariosHandler)
router.delete('/:id',deleteScenarioValidation, deleteSpecificScenarioHandler)

module.exports = router;
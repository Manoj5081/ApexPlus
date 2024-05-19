const router = require('express').Router();
const vehicleHandler = require('./vehicles');
const scenarioHandler = require('./scenarios');
router.use('/vehicle', vehicleHandler);
router.use('/scenario', scenarioHandler);
module.exports = router;
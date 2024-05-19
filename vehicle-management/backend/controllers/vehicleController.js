const { readData, writeData } = require("../util")

const addVehicleToScenario =  (data) => {
    let tbData = readData()
    let scenarios = tbData.scenarios
    let scenario = scenarios.find(scenario => scenario.id === data.scenarioId);
    if(!scenario) throw new Error("Scenario not found");
    let remainingScenarios = scenarios.filter(scenario => scenario.id !== data.scenarioId)
    let rec = {id:tbData.vehicleLength+1,...data}
    let vehicles = [...scenario.vehicles, rec]
    let newRecord = {...scenario, vehicles}
    scenarios = [...remainingScenarios, newRecord];
    writeData({...tbData, vehicleLength:tbData.vehicleLength+1, scenarios});
    return rec;
}
const updateVehicleToScenario = (data) => {
    let tbData = readData()
    let scenarios = tbData.scenarios
    let scenario = scenarios.find(scenario => scenario.id === Number(data.scenarioId));
    if(!scenario) throw new Error("Scenario not found");
    let remainingScenarios = scenarios.filter(scenario => scenario.id !== Number(data.scenarioId))
    let vehicle = scenario.vehicles.find(vehicle => vehicle.id === Number(data.id));
    if(!vehicle) throw new Error("Vehicle not found");
    let remainingVehicles = scenario.vehicles.filter(vehicle => vehicle.id !== Number(data.id));
    let rec = {...vehicle,...data}
    let vehicles = [...remainingVehicles, rec]
    scenario.vehicles = vehicles
    scenarios = [...remainingScenarios, scenario];
    writeData({...tbData, scenarios});
    return rec;
}
const deleteVehicleFromScenario = (id, scenarioId) => {
    let tbData = readData()
    let scenarios = tbData.scenarios
    let scenario = scenarios.find(scenario => scenario.id === scenarioId);
    if(!scenario) throw new Error("Scenario not found");
    let remainingScenarios = scenarios.filter(scenario => scenario.id !== scenarioId)
    let vehicle = scenario.vehicles.find(vehicle => vehicle.id === id);
    if(!vehicle) throw new Error("Vehicle not found");
    let remainingVehicles = scenario.vehicles.filter(vehicle => vehicle.id !== id);
    scenario.vehicles = remainingVehicles
    scenarios = [...remainingScenarios, scenario];
    writeData({...tbData, scenarios});
    return true;
}

module.exports = {
    addVehicleToScenario,
    deleteVehicleFromScenario,
    updateVehicleToScenario,
};
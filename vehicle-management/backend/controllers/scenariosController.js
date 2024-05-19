const { readData, writeData } = require("../util")

const addScenario =  (data) => {
    let tbData = readData()
    let scenarios = tbData.scenarios
    let newRecord = {id: tbData.scenarioLength +1, name: data.name, time: data.time, vehicles:[]}
    scenarios = [...scenarios, newRecord];
    writeData({...tbData, scenarioLength:newRecord.id, scenarios});
    return newRecord;
}
const updateScenario = (data) => {
    let tbData = readData()
    let scenarios = tbData.scenarios
    let rec = scenarios.find(scenario => scenario.id === data.id)
    scenarios = scenarios.filter(scenario => scenario.id !== data.id)
    if(!rec) throw new Error("id not found");
    rec = {...rec, ...data};
    scenarios = [...scenarios,rec];
    writeData({...tbData, scenarios});
    return rec;
}
const deleteScenario = (id) => {
    let tbData = readData()
    let scenarios = tbData.scenarios
    let rec = scenarios.find(scenario => scenario.id === id)
    if(!rec) throw new Error("id not found");
    scenarios = scenarios.filter(scenario => scenario.id !== id)
    writeData({...tbData, scenarios});
    return true;
}
const deleteAllScenario = () => {
    let tbData = readData()
    writeData({...tbData, scenarios: []});
    return true;;
}
const getAllScenario = () => {
   return (readData()).scenarios;
}
module.exports = {
    addScenario,
    updateScenario,
    deleteScenario,
    deleteAllScenario,
    getAllScenario
};
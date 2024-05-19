import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const url = process.env.REACT_APP_BASEURL;

const VehicleForm = () => {
  const location = useLocation();
  const [scenarios, setScenarios] = useState([]);
  const [vehicle, setVehicle] = useState({
    name: "",
    positionX: 0,
    positionY: 0,
    speed: 0,
    direction: "front",
    scenarioId: null
  });

  const getAllscenarios = async () => {
    try {
      const response = await fetch(`${url}/scenario`, {
        method: 'GET',
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      if(res?.data){
        setScenarios(res.data);
      }
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const addVehicle = async (data) => {
    try {
      const response = await fetch(`${url}/vehicle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      alert('Vehicle added successfully')
      handleReset();
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  useEffect(()=>{
    getAllscenarios()
  },[])

  useEffect (()=>{
    if(scenarios?.length){
      if(location?.state?.scenarioId){
        setVehicle({ ...vehicle, scenarioId: location?.state?.scenarioId });
      }
    }
  },[scenarios])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleReset = () => {
    setVehicle({
      name: "",
      positionX: 0,
      positionY: 0,
      speed: 0,
      direction: "Towards",
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle({
      ...vehicle,
      positionX: Number(vehicle.positionX),
      positionY: Number(vehicle.positionY),
      speed: Number(vehicle.positionY),
      scenarioId: Number(vehicle.scenarioId),
    })
  };

  return (
    <div className="vehicle-container">
      <h2>Create Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="vehiclee-form">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="scenaiolist">Scenario List</label>
            <select
              name="scenarioId"
              value={vehicle.scenarioId || ""}
              onChange={handleChange}
              style={{ height: "45px", width: "18rem" }}
            >
              <option value="" disabled>
                Select a scenario
              </option>
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="name">Vehicle Name</label>
            <input
              type="text"
              name="name"
              placeholder="Vehicle Name"
              value={vehicle.name}
              onChange={handleChange}
              style={{ height: "45px", width: "18rem" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="initialPositionX">Position X</label>
            <input
              type="number"
              name="positionX"
              placeholder="Initial Position X"
              value={vehicle.positionX}
              onChange={handleChange}
              style={{ height: "45px", width: "18rem" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="initialPositionY">Position Y</label>
            <input
              type="number"
              name="positionY"
              placeholder="Initial Position Y"
              value={vehicle.positionY}
              onChange={handleChange}
              style={{ height: "45px", width: "18rem" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="speed">Speed</label>
            <input
              type="number"
              name="speed"
              placeholder="Speed"
              value={vehicle.speed}
              onChange={handleChange}
              style={{ height: "45px", width: "18rem" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="direction">Direction</label>
            <select
              name="direction"
              value={vehicle.direction}
              onChange={handleChange}
              style={{ height: "45px", width: "18rem" }}
            >
              <option value="front" selected>Towards</option>
              <option value="back">Backwards</option>
              <option value="up">Upwards</option>
              <option value="down">Downwards</option>
            </select>
          </div>
        </div>
        <div className="vehicle-btns" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "lightgreen",
            }}
          >
            Add
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "orange",
            }}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "lightblue",
            }}
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;

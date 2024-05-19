import React, { useState, useRef, useEffect } from "react";
import "../Styles/Homepage.css";
const url = process.env.REACT_APP_BASEURL;
const DIRECTIONS = {
  up: 'Upwards',
  back: 'Backwards',
  front: 'Forwards',
  down: 'Downwards'
}

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [scenario, setScenario] = useState("");
  const [editVehicle, setEditVehicle] = useState(null);
  const [editValues, setEditValues] = useState({});
  const vehicleRefs = useRef({});
  const boardRef = useRef(null);
  const [data, setData] = useState([]);

  const getAllscenarios = async () => {
    try {
      const response = await fetch(`${url}/scenario`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        },
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      if(res?.data){
        setData(res.data);
      }
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const updateVehicle = async (data) => {
    try {
      const response = await fetch(`${url}/vehicle/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      alert('Vehicle updated successfully')
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const deleteVehicle = async (data) => {
    try {
      const response = await fetch(`${url}/vehicle/${data.id}/scenario/${data.scenarioId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      alert('Vehicle Deleted successfully')
      return response;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const handleScenarioChange = (e) => {
    const selectedScenario = e.target.value;
    setScenario(selectedScenario);
    const scenarioData = data.find((sc) => sc.name === selectedScenario);
    if (scenarioData) {
      setVehicles(
        scenarioData.vehicles.map((v) => ({
          ...v,
          position: {
            x: parseInt(v.positionX, 10),
            y: parseInt(v.positionY, 10),
          },
          moving: false,
          visible: true,
        }))
      );
    }
  };
 
  const startSimulation = () => {
    setVehicles((prev) => prev.map((v) => ({ ...v, moving: true })));
  };

  const stopSimulation = () => {
    setVehicles((prev) => prev.map((v) => ({ ...v, moving: false })));
  };

  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle.id);
    setEditValues(vehicle);
  };

  const handleDelete = async (id, scenarioId) => {
    await deleteVehicle({id, scenarioId})
    await getAllscenarios()
  };

  const handleSave = async () => {
    let data = {
      "id": editValues.id,
      "name": editValues.name,
      "positionX": editValues.positionX,
      "positionY": editValues.positionY,
      "speed": editValues.speed,
      "direction": editValues.direction,
      "scenarioId": editValues.scenarioId,
   }
    await updateVehicle(data)
    await getAllscenarios()
    setEditVehicle(null);
    setEditValues(null)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  useEffect(()=>{
    getAllscenarios()
  },[])

  useEffect (()=> {
    if(scenario){
      const scenarioData = data.find((sc) => sc.name === scenario);
      if (scenarioData) {
        setVehicles(
          scenarioData.vehicles.map((v) => ({
            ...v,
            position: {
              x: parseInt(v.positionX, 10),
              y: parseInt(v.positionY, 10),
            },
            moving: false,
            visible: true,
          }))
        );
      }
    }
  }, [data])

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((vehicle) => {
          if (!vehicle.moving) return vehicle;
          const newPosition = { ...vehicle.position };
          const speed = parseInt(vehicle.speed, 10);

          switch (vehicle.direction) {
            case "front":
              newPosition.x += speed;
              break;
            case "back":
              newPosition.x -= speed;
              break;
            case "up":
              newPosition.y -= speed;
              break;
            case "down":
              newPosition.y += speed;
              break;
            default:
              break;
          }

          const board = boardRef.current.getBoundingClientRect();
          if (
            newPosition.x < 0 ||
            newPosition.x > board.width ||
            newPosition.y < 0 ||
            newPosition.y > board.height
          ) {
            return { ...vehicle, visible: false };
          }
          return { ...vehicle, position: newPosition, visible: true };
        })
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="select-scenario">
        <label>
          Scenario:
        </label>
        <select
        value={scenario}
        onChange={handleScenarioChange}
      >
        <option value="" disabled>
          Select a scenario
        </option>
        {data.map((scen, index) => (
          <option key={index} value={scen.name}>
            {scen.name}
          </option>
        ))}
      </select>
      </div>
      <table className="vehicle-table">
        <thead>
          <tr>
          <th>Vehicle Id</th>
          <th>Vehicle Name</th>
          <th>Speed</th>
          <th>Position X</th>
          <th>Position Y</th>
          <th>Direction</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              {editVehicle === vehicle.id ? (
                <>
                  <td>{vehicle.id}</td>
                  <td>
                    <input
                      type="text"
                      name="vehicleName"
                      value={editValues.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="speed"
                      value={editValues.speed}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="positionX"
                      value={editValues.positionX}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="positionY"
                      value={editValues.positionY}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                    name="direction"
                    value={editValues.direction}
                    onChange={handleChange}
                    style={{ height: "45px", width: "18rem" }}
                  >
                    <option value="front" selected>Towards</option>
                    <option value="back">Backwards</option>
                    <option value="up">Upwards</option>
                    <option value="down">Downwards</option>
                  </select>
                  </td>
                  <td><i class="fa-solid fa-check" onClick={handleSave} style={{cursor:"pointer", fontSize: "20px"}}></i></td>
                  <td><i class="fa-solid fa-trash" style={{cursor:"pointer",  fontSize: "20px"}} onClick={() => handleDelete(vehicle.id, vehicle.scenarioId)}></i></td>
                </>
              ) : (
                <>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.speed}</td>
                  <td>{vehicle.positionX}</td>
                  <td>{vehicle.positionY}</td>
                  <td>{DIRECTIONS[vehicle.direction]}</td>
                  <td><i class="fa-solid fa-pencil" style={{cursor:"pointer",  fontSize: "20px"}} onClick={() => handleEdit(vehicle)}></i></td>
                  <td><i class="fa-solid fa-trash" style={{cursor:"pointer",  fontSize: "20px"}} onClick={() => handleDelete(vehicle.id, vehicle.scenarioId)}></i></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="controls">
        <button
          onClick={startSimulation}
          style={{ height: "40px", backgroundColor: "lightgreen" }}
        >
          Start Simulation
        </button>
        <button
          onClick={stopSimulation}
          style={{ height: "40px", backgroundColor: "lightblue" }}
        >
          Stop Simulation
        </button>
      </div>
      <div className="game-board" ref={boardRef}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            ref={(el) => (vehicleRefs.current[vehicle.id] = el)}
            className={`vehicle ${vehicle.visible ? "" : "hidden"}`}
            style={{ top: vehicle.position.y, left: vehicle.position.x}}
          >
            {vehicle.id}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;

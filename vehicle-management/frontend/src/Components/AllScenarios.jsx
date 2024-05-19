import React, { useEffect, useState } from "react";
import "../Styles/AllScenarios.css";
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_BASEURL;
const AllScenarios = () => {
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([]);
  const [editScenario, setEditScenario] = useState(null) 
  const [editValues, setEditValues] = useState(null)
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
        setScenarios(res.data);
      }
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const deleteAllscenarios = async () => {
    try {
      const response = await fetch(`${url}/scenario/removeall`, {
        method: 'DELETE',
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      alert('Deleted successfully');
      getAllscenarios()
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const deleteSpecificScenario = async (id) => {
    try {
      const response = await fetch(`${url}/scenario/${id}`, {
        method: 'DELETE',
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      alert('Deleted successfully');
      getAllscenarios()
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const updateScenario = async (data, id) => {
    try {
      const response = await fetch(`${url}/scenario/${id}`, {
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
      alert('Scenario Updated successfully')
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const handleSave = async () => {
    let data = {
      "name": editValues.name,
      "time": editValues.time,
   }
    await updateScenario(data, editValues.id)
    await getAllscenarios()
    setEditScenario(null);
    setEditValues(null)
  };

  useEffect(()=>{
    getAllscenarios()
  },[])

  return (
    <div className= "all-scenarios">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <h2>All Scenarios</h2>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={()=>{
              navigate('/add-scenario');
            }}
            className="common-btn add-scenario"
          >
            New Scenario
          </button>
          <button
            onClick={()=>{
              navigate('/create-vehicle');
            }}
            className="common-btn add-vehicle"
          >
            Add Vehicle
          </button>
          <button
            onClick={deleteAllscenarios}
            className=" common-btn delete"
          >
            Delete All
          </button>
        </div>
      </div>

      <table className="scenario-table">
        <thead>
          <tr>
              <th>Scenario ID</th>
              <th>Scenario Name</th>
              <th>Scenario Time</th>
              <th>Number of Vehicles</th>
              <th>Add Vehicle</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            editScenario === scenario?.id ?
            <tr key={scenario.id}>
            <td>{scenario.id}</td>
            <td>
            <input
              type="text"
              name="name"
              value={editValues.name}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="time"
              value={editValues.time}
              onChange={handleChange}
            />
          </td>
          <td>{scenario?.vehicles?.length || 0}</td>
          <td>
          <i class="fa-regular fa-circle-plus" onClick={()=>{
            navigate('/create-vehicle', {
              state: {
                scenarioId: scenario.id,
              }
            });
          }} style={{cursor:"pointer", fontSize: "20px"}}></i>
          </td>
          <td><i class="fa-solid fa-check" onClick={handleSave} style={{cursor:"pointer", fontSize: "20px"}}></i></td>
          <td><i class="fa-solid fa-trash" style={{cursor:"pointer", fontSize: "20px"}} onClick={() => {
            deleteSpecificScenario(scenario.id)
          }}></i></td>
            </tr>:
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time}</td>
              <td>{scenario?.vehicles?.length || 0}</td>
              <td>
              <i class="fa-regular fa-circle-plus" onClick={()=>{
                navigate('/create-vehicle', {
                  state: {
                    scenarioId: scenario.id,
                  }
                });
              }} style={{cursor:"pointer", fontSize: "20px"}}></i>
              </td>
              <td><i class="fa-solid fa-pencil" style={{cursor:"pointer", fontSize: "20px"}} onClick={() => {
                setEditValues(scenario)
                setEditScenario(scenario.id)
              }}></i></td>
              <td><i class="fa-solid fa-trash" style={{cursor:"pointer", fontSize: "20px"}} onClick={() => {
                deleteSpecificScenario(scenario.id)
              }}></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenarios;

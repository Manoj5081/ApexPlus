import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ScenarioForm.css";
const url = process.env.REACT_APP_BASEURL;

const ScenarioForm = () => {
  const [scenario, setScenario] = useState({ name: "", time: 0 });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScenario({ ...scenario, [name]: value });
  };

  const addScenario = async (data) => {
    try {
      const response = await fetch(`${url}/scenario`, {
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
      alert('Scenario added successfully')
      handleReset();
      return res;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    await addScenario(scenario)
  };

  const handleReset = () => {
    setScenario({ name: "", time: 0 });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="scenario-form">
      <h2>Add Scenario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <div className="form-group-inner">
        <div className="inputs">
        <label
          htmlFor="name"
          style={{ textAlign: "center", fontSize: "large" }}
        >
          Scenario Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Scenario Name"
          value={scenario.name}
          onChange={handleChange}
          // required
        />
      </div>
      <div className="inputs">
        <label
          htmlFor="time"
          style={{ textAlign: "center", fontSize: "large" }}
        >
          Scenario Time(seconds)
        </label>
        <input
          type="number"
          id="time"
          name="time"
          placeholder="Time"
          value={scenario.time}
          onChange={handleChange}
          required
        />
      </div>
        </div>

        </div>
        <div className="form-buttons">
          <button type="submit" style={{ backgroundColor: "green" }}>
            Add
          </button>
          <button
            type="button"
            style={{ backgroundColor: "orange" }}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            style={{ backgroundColor: "lightblue" }}
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScenarioForm;

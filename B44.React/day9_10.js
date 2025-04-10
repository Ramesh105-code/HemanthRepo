import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: ""
    }
  },
  courses_offered: []
};

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "establishment_year":
      return { ...state, establishment_year: action.payload };
    case "building":
      return {
        ...state,
        address: { ...state.address, building: action.payload }
      };
    case "street":
      return {
        ...state,
        address: { ...state.address, street: action.payload }
      };
    case "city_name":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            name: action.payload
          }
        }
      };
    case "pinCode":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              pinCode: action.payload
            }
          }
        }
      };
    case "landmark":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              landmark: action.payload
            }
          }
        }
      };
    case "state_name":
      return {
        ...state,
        address: { ...state.address, state: action.payload }
      };
    case "latitude":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            latitude: action.payload
          }
        }
      };
    case "longitude":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            longitude: action.payload
          }
        }
      };
    case "courses_offered":
      return {
        ...state,
        courses_offered: action.payload.split(",").map((c) => c.trim())
      };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (type) => (e) => {
    try {
      dispatch({ type, payload: e.target.value });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
    setError("");
  };

  return (
    <div style={styles.container}>
      <h2>College Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="College Name" onChange={handleChange("name")} value={state.name} />
        <input placeholder="Establishment Year" onChange={handleChange("establishment_year")} value={state.establishment_year} />

        <input placeholder="Building" onChange={handleChange("building")} value={state.address.building} />
        <input placeholder="Street" onChange={handleChange("street")} value={state.address.street} />
        <input placeholder="City Name" onChange={handleChange("city_name")} value={state.address.city.name} />
        <input placeholder="Pincode" onChange={handleChange("pinCode")} value={state.address.city.locality.pinCode} />
        <input placeholder="Landmark" onChange={handleChange("landmark")} value={state.address.city.locality.landmark} />
        <input placeholder="State" onChange={handleChange("state_name")} value={state.address.state} />
        <input placeholder="Latitude" onChange={handleChange("latitude")} value={state.address.coordinates.latitude} />
        <input placeholder="Longitude" onChange={handleChange("longitude")} value={state.address.coordinates.longitude} />

        <input placeholder="Courses (comma separated)" onChange={handleChange("courses_offered")} value={state.courses_offered.join(", ")} />

        <button type="submit" style={styles.btn}>Submit</button>
        <button type="button" onClick={handleReset} style={{ ...styles.btn, backgroundColor: "#999" }}>Reset</button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {submitted && (
        <div style={styles.output}>
          <h3>Submitted College Data</h3>
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>Established:</strong> {state.establishment_year}</p>
          <p><strong>Address:</strong> {state.address.building}, {state.address.street}, {state.address.city.name}, {state.address.state} - {state.address.city.locality.pinCode}</p>
          <p><strong>Landmark:</strong> {state.address.city.locality.landmark}</p>
          <p><strong>Coordinates:</strong> ({state.address.coordinates.latitude}, {state.address.coordinates.longitude})</p>
          <p><strong>Courses:</strong> {state.courses_offered.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

// Simple styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  btn: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px"
  },
  output: {
    marginTop: "20px",
    backgroundColor: "#f0f0f0",
    padding: "15px",
    borderRadius: "5px"
  }
};

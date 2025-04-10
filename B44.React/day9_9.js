import React, { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
  submitted: false, 
};

function formReducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email.trim() === "" || state.password.trim() === "") return;
    dispatch({ type: "submit" });
  };

  return (
    <div style={styles.container}>
      <h2>User Login Form</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "email", payload: e.target.value })
          }
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "password", payload: e.target.value })
          }
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Submit</button>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          style={{ ...styles.button, backgroundColor: "#999" }}
        >
          Reset
        </button>
      </form>

      <div style={styles.output}>
        {state.submitted ? (
          <div>
            <div>User Email: {state.email}</div>
            <div>User Password: {state.password}</div>
          </div>
        ) : (
          <div>No details found</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
    margin: "0 auto",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "8px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  output: {
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default App;

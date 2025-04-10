import React, { useReducer } from "react";

const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={styles.container}>
      <h1>Counter App</h1>
      <h2>Count: {state.count}</h2>
      <div style={styles.buttonGroup}>
        <button onClick={() => dispatch({ type: "INCREMENT" })} style={styles.button}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })} style={styles.button}>
          Decrement
        </button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  buttonGroup: {
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "0 10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;

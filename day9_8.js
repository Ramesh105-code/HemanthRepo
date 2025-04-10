import React, { useReducer } from "react";

const initialState = {
  isVisible: false,
};

function visibilityReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  return (
    <div style={styles.container}>
      <h1>Toggle Visibility App</h1>
      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
        style={styles.button}
      >
        Toggle Message
      </button>

      {state.isVisible && <p style={styles.message}>Hello, World!</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontSize: "20px",
    color: "#007BFF",
  },
};

export default App;

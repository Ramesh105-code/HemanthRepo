import React, { useReducer } from "react";


const initialState = {
  theme: "light", 
};

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const appStyle = {
    height: "100vh",
    backgroundColor: state.theme === "light" ? "#f0f0f0" : "#222",
    color: state.theme === "light" ? "#000" : "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <div style={appStyle}>
      <h1>Current Theme: {state.theme.toUpperCase()}</h1>
      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: state.theme === "light" ? "#333" : "#ddd",
          color: state.theme === "light" ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;

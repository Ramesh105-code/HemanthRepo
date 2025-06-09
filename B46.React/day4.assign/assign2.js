import { useState } from "react";
import LiveClock from "./LiveClock";

function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div style={styles.container}>
      {showClock && <LiveClock />}
      <button onClick={() => setShowClock(!showClock)} style={styles.button}>
        {showClock ? "Hide Clock" : "Show Clock"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "1.5rem",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#0b74de",
    color: "#fff",
    border: "none",
  },
};

export default App;

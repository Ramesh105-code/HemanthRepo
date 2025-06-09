
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div style={styles.container}>
      <button
        onClick={() => setCount(count - 1)}
        disabled={count === 0}
        style={{ ...styles.button, opacity: count === 0 ? 0.5 : 1 }}
      >
        -
      </button>

      <div style={styles.counterText}>Current Count: {count}</div>

      <button onClick={() => setCount(count + 1)} style={styles.button}>
        +
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    gap: "1rem",
    fontSize: "1.5rem",
    flexWrap: "wrap",
  },
  button: {
    padding: "0.5rem 1.5rem",
    fontSize: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
  },
  counterText: {
    minWidth: "200px",
    textAlign: "center",
  },
};

export default App;

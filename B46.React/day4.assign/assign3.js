import { useEffect, useState } from "react";
import { exchangeRates } from "./exchangeRates";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  GBP: "£",
  JPY: "¥",
};

function App() {
  const [amount, setAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [convertedValue, setConvertedValue] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);


  useEffect(() => {
    const savedAmount = localStorage.getItem("amount");
    const savedCurrency = localStorage.getItem("currency");
    if (savedAmount) setAmount(savedAmount);
    if (savedCurrency) setTargetCurrency(savedCurrency);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("amount", amount);
    localStorage.setItem("currency", targetCurrency);
  }, [amount, targetCurrency]);

 
  useEffect(() => {
    if (!amount || isNaN(amount) || Number(amount) < 0) {
      setConvertedValue(null);
      if (amount !== "") {
        setError("Please enter a valid non-negative number.");
      }
      return;
    }
    setError("");
    const converted = Number(amount) * exchangeRates[targetCurrency];
    setConvertedValue(converted);

    // Track session analytics
    const entry = `✔ ${amount} USD → ${currencySymbols[targetCurrency]}${converted.toFixed(2)}`;
    setHistory((prev) => {
      const updated = [entry, ...prev];
      return updated.slice(0, 3);
    });
  }, [amount, targetCurrency]);

  const resetHandler = () => {
    setAmount("");
    setTargetCurrency("INR");
    setConvertedValue(null);
    setError("");
    setHistory([]);
    localStorage.removeItem("amount");
    localStorage.removeItem("currency");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Currency Converter</h2>
        <div style={styles.inputGroup}>
          <label>Amount (USD):</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Convert to:</label>
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            style={styles.select}
          >
            {Object.keys(exchangeRates)
              .filter((cur) => cur !== "USD")
              .map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
          </select>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {convertedValue !== null && !error && (
          <div style={styles.result}>
            → Converted: {currencySymbols[targetCurrency]}
            {convertedValue.toFixed(2)}
          </div>
        )}

        <button onClick={resetHandler} style={styles.reset}>
          Reset
        </button>
      </div>

      <div style={styles.analytics}>
        <h3>-- Analytics --</h3>
        <p>Conversions this session: {history.length}</p>
        {history.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "2rem",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  result: {
    fontSize: "1.25rem",
    margin: "1rem 0",
    fontWeight: "bold",
    color: "#0b74de",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  reset: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  analytics: {
    width: "300px",
    textAlign: "left",
  },
};

export default App;

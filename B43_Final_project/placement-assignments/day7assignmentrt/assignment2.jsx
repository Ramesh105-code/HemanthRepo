import { useState } from "react";

function expensiveAnalysis(num) {
  let isPrime = num > 1;
  const factors = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
      if (i !== 1 && i !== num) isPrime = false;
    }
  }

  const sum = factors.reduce((a, b) => a + b, 0);

  return { isPrime, factors, sum };
}

export default function NumberAnalyzer() {
  const [number, setNumber] = useState(10);
  const [theme, setTheme] = useState("light");
  const [calcCount, setCalcCount] = useState(0);

  const result = expensiveAnalysis(number);
  setCalcCount(c => c + 1); 

  return (
    <div className={theme}>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(+e.target.value)}
      />

      <button onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}>
        Toggle Theme
      </button>

      <p>Prime: {result.isPrime ? "Yes" : "No"}</p>
      <p>Factors: {result.factors.join(", ")}</p>
      <p>Sum: {result.sum}</p>
      <p>Calculations: {calcCount}</p>
    </div>
  );
}

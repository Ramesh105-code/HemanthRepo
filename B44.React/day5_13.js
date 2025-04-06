import React, { useState, useEffect } from 'react';
import './CounterApp.css';

function CounterApp() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Counter value: ${count}`);
  }, [count]); 

  return (
    <div className="counter-container">
      <h2>Counter Application</h2>
      <p className="count-display">Count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default CounterApp;
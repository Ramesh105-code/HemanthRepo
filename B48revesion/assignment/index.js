import React, { useState, useEffect, useRef } from "react";

function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastExecuted.current >= delay) {
        setThrottledValue(value);
        lastExecuted.current = now;
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
}

export default function ThrottleDemo() {
  const [inputValue, setInputValue] = useState("");
  const throttledValue = useThrottle(inputValue, 1000); // 1s throttle

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Custom useThrottle Hook</h1>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="space-y-2">
          <p>
            <strong>Original Value:</strong> {inputValue}
          </p>
          <p>
            <strong>Throttled Value:</strong> {throttledValue}
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center">
          (Throttled value updates at most once every 1 second)
        </p>
      </div>
    </div>
  );
}

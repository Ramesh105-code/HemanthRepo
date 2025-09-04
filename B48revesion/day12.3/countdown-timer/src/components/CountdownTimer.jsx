import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState(""); // input seconds
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (audioRef.current) {
              audioRef.current.play();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    const inputTime = parseInt(time, 10);
    if (!inputTime || inputTime <= 0) {
      alert("Please enter a valid time in seconds");
      return;
    }
    setSecondsLeft(inputTime);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setSecondsLeft(0);
    setTime("");
  };

  
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center space-y-4">
      <h1 className="text-2xl font-bold">⏳ Countdown Timer</h1>

    
      <input
        type="number"
        placeholder="Enter time in seconds"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={isRunning}
        className="w-full p-2 border rounded"
      />

      <div className="text-4xl font-mono">
        {secondsLeft > 0 ? formatTime(secondsLeft) : "00:00"}
      </div>

     
      {isRunning && (
        <div className="w-full bg-gray-300 h-2 rounded">
          <div
            className="bg-green-500 h-2 rounded transition-all duration-1000"
            style={{ width: `${(secondsLeft / time) * 100}%` }}
          />
        </div>
      )}

     
      <div className="space-x-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePauseResume}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>

     
      {!isRunning && secondsLeft === 0 && (
        <p className="text-red-500 font-semibold">⏰ Time’s up!</p>
      )}

    
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
    </div>
  );
};

export default CountdownTimer;

import React, { useState, useEffect } from "react";

const LifecycleLogger = () => {
  useEffect(() => {
    console.log("Component Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return <div>This is the LifecycleLogger Component</div>;
};


const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleComponent = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleComponent}>
        {isVisible ? "Hide" : "Show"} Component
      </button>
      {isVisible && <LifecycleLogger />}
    </div>
  );
};

export default App;

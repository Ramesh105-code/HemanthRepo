import React, { useState, useEffect } from "react";

function WindowResizeTracker() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

   
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  const getDeviceType = () => {
    const w = size.width;
    if (w < 768) return "Mobile";
    if (w <= 1024) return "Tablet";
    return "Desktop";
  };

  return (
    <div>
      <h2>
        {size.width} x {size.height}
      </h2>
      <p>{getDeviceType()}</p>
    </div>
  );
}

export default WindowResizeTracker;
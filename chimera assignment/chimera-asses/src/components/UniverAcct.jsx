import React from "react";

export default function UniverseActivityPulse({ active }) {
  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: active ? "limegreen" : "gray",
        transition: "all 0.3s",
        display: "inline-block",
        marginLeft: "10px"
      }}
    />
  );
}
import React from "react";
import RefOnlyFormattedDigitsInput from "./RefOnlyFormattedDigitsInput.jsx";

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 12 }}>Ref-Only Formatted Digits Input</h1>
      <p style={{ margin: "8px 0" }}>
        Type digits; they will auto-format in groups of 4.
      </p>
      <RefOnlyFormattedDigitsInput
        initialValue="12345678"
        onChange={(digits) => console.log("rawDigits:", digits)}
      />
    </div>
  );
}

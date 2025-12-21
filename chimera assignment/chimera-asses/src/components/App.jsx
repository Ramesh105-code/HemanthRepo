import React, { useState } from "react";
import UniverseTab from "./UniverseTab";

const universes = ["Artifacts", "Creatures", "Lep-ath"];

export default function App() {
  const [activeTab, setActiveTab] = useState(universes[0]);
  const [freezeMode, setFreezeMode] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nebula Vault </h1>
      <div>
        {universes.map((u) => (
          <button
            key={u}
            onClick={() => setActiveTab(u)}
            style={{
              fontWeight: activeTab === u ? "bold" : "normal",
              marginRight: "5px"
            }}
          >
            {u}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={freezeMode}
            onChange={(e) => setFreezeMode(e.target.checked)}
          />
          Temporal Freeze
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <UniverseTab universe={activeTab} freezeMode={freezeMode} />
      </div>
    </div>
  );
}
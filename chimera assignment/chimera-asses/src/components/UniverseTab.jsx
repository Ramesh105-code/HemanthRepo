import React, { useState, useEffect } from "react";
import NewItemForm from "./NewItemForm";
import UniverseActivityPulse from "./UniverAcct";
import { saveTabState, loadTabState } from "../utils/localStorage";

export default function UniverseTab({ universe, freezeMode }) {
  const [items, setItems] = useState([]);
  const [buffer, setBuffer] = useState([]);
  const [activity, setActivity] = useState(false);

  // Restore state from localStorage
  useEffect(() => {
    const saved = loadTabState(universe);
    if (saved) setItems(saved.items || []);
  }, [universe]);

  // Save state on items change
  useEffect(() => {
    saveTabState(universe, { items });
  }, [items, universe]);

  const addItem = (item) => {
    if (freezeMode) {
      setBuffer((b) => [...b, item]);
    } else {
      setItems((prev) => [...prev, item]);
    }
    setActivity(true);
    setTimeout(() => setActivity(false), 500);
  };

  const flushBuffer = () => {
    setItems((prev) => [...prev, ...buffer]);
    setBuffer([]);
  };

  return (
    <div>
      <h3>{universe}</h3>
      <UniverseActivityPulse active={activity} />
      {freezeMode && buffer.length > 0 && (
        <button onClick={flushBuffer}>Flush {buffer.length} Updates</button>
      )}
      <NewItemForm addItem={addItem} />
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
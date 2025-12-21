import React, { useState } from "react";

export default function NewItemForm({ addItem }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name) return;
    addItem({ name, timestamp: Date.now() });
    setName("");
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        value={name}
        placeholder="New Item Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
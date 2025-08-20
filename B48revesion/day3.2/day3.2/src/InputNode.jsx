import React from "react";

export default function InputNode({ node, onAddSubInput, onValueChange }) {
  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <input
        type="text"
        value={node.value}
        placeholder="Enter text"
        onChange={(e) => onValueChange(node.id, e.target.value)}
      />
      <button onClick={() => onAddSubInput(node.id)}>Add Sub Input</button>

    
      <div style={{ marginLeft: "20px" }}>
        {node.children.map((child) => (
          <InputNode
            key={child.id}
            node={child}
            onAddSubInput={onAddSubInput}
            onValueChange={onValueChange}
          />
        ))}
      </div>
    </div>
  );
}

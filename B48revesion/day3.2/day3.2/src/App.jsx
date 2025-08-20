import React, { useState } from "react";
import InputNode from "./InputNode";

export default function App() {
  const [inputs, setInputs] = useState([]);

  
  const addInput = () => {
    setInputs((prev) => [
      ...prev,
      { id: Date.now(), value: "", children: [] }
    ]);
  };

  const updateTree = (tree, id, newNode) => {
    return tree.map((node) => {
      if (node.id === id) {
        return { ...node, children: [...node.children, newNode] };
      }
      return { ...node, children: updateTree(node.children, id, newNode) };
    });
  };

  const handleAddSubInput = (parentId) => {
    const newNode = { id: Date.now(), value: "", children: [] };
    setInputs((prev) => updateTree(prev, parentId, newNode));
  };

  const handleValueChange = (id, newValue) => {
    const updateValue = (tree) =>
      tree.map((node) =>
        node.id === id
          ? { ...node, value: newValue }
          : { ...node, children: updateValue(node.children) }
      );

    setInputs((prev) => updateValue(prev));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nested Input Builder</h1>
      <button onClick={addInput}>Add Input</button>

      <div style={{ marginTop: "20px" }}>
        {inputs.map((node) => (
          <InputNode
            key={node.id}
            node={node}
            onAddSubInput={handleAddSubInput}
            onValueChange={handleValueChange}
          />
        ))}
      </div>

      <h3>Tree Data:</h3>
      <pre>{JSON.stringify(inputs, null, 2)}</pre>
    </div>
  );
}

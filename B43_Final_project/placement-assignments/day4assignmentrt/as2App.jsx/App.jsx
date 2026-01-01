import { useState } from "react";

const initialTasks = [
  { id: "1", text: "Design UI" },
  { id: "2", text: "Build components" },
  { id: "3", text: "Write tests" },
  { id: "4", text: "Deploy app" }
];

export default function ReorderList() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveUp = (index) => {
    if (index === 0) return;

    setTasks(prev => {
      const newTasks = [...prev];
      [newTasks[index - 1], newTasks[index]] = [
        newTasks[index],
        newTasks[index - 1]
      ];
      return newTasks;
    });
  };

  const moveDown = (index) => {
    if (index === tasks.length - 1) return;

    setTasks(prev => {
      const newTasks = [...prev];
      [newTasks[index], newTasks[index + 1]] = [
        newTasks[index + 1],
        newTasks[index]
      ];
      return newTasks;
    });
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h3>Reorder Tasks</h3>

      <ul>
        {tasks.map((task, index) => (
          <li key={task.id} style={{ marginBottom: "8px" }}>
            <strong>{index + 1}.</strong> {task.text}

            <button
              onClick={() => moveUp(index)}
              disabled={index === 0}
              style={{ marginLeft: "10px" }}
            >
              ↑
            </button>

            <button
              onClick={() => moveDown(index)}
              disabled={index === tasks.length - 1}
              style={{ marginLeft: "5px" }}
            >
              ↓
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

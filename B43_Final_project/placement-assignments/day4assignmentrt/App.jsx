import { useState } from "react";

const initialTodos = [
  { id: "1", text: "Complete React project", priority: "High", completed: false },
  { id: "2", text: "Review PRs", priority: "Medium", completed: true },
  { id: "3", text: "Update documentation", priority: "Low", completed: false }
];

const priorityColors = {
  High: "red",
  Medium: "orange",
  Low: "green"
};

export default function TodoApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now().toString(), // stable unique key
        text,
        priority,
        completed: false
      }
    ]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Todo List</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginLeft: "8px"
              }}
            >
              {todo.text}
            </span>

            <span
              style={{
                backgroundColor: priorityColors[todo.priority],
                color: "white",
                padding: "2px 6px",
                marginLeft: "10px",
                borderRadius: "4px",
                fontSize: "12px"
              }}
            >
              {todo.priority}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

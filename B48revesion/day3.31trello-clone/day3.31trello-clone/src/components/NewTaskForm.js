import React, { useState } from "react";

export default function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), desc.trim());
    setTitle("");
    setDesc("");
  };

  return (
    <form className="newTaskForm" onSubmit={submit}>
      <input
        className="input"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="textarea"
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="row">
        <button className="btn btnPrimary" type="submit">Add Task</button>
        <span className="badge">Added to To-Do</span>
      </div>
    </form>
  );
}

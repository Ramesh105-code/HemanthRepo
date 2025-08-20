import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ id, task, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task ${isDragging ? "dragging" : ""}`}
      {...attributes}
      {...listeners}
    >
      <h4 className="taskTitle">{task.title}</h4>
      {task.description ? (
        <p className="taskDesc">{task.description}</p>
      ) : null}
      <div className="taskFooter">
        <span className="badge">#{id.slice(0, 6)}</span>
        <button className="btn btnDanger" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

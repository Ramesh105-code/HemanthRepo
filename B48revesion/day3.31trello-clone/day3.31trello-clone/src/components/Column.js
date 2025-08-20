import React from "react";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function Column({
  columnId,
  title,
  tasksOrder,
  tasks,
  sensors,
  onDragStart,
  onDragEnd,
  onDragCancel,
  onDelete
}) {
  return (
    <div className="column" id={columnId}>
      <div className="columnHead">
        <div className="row" style={{ gap: 10 }}>
          <span className="columnTitle">{title}</span>
          <span className="badge">{tasksOrder.length}</span>
        </div>
      </div>

      <DndContext
        id={`ctx-${columnId}`}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div id={columnId} style={{ padding: 12 }}>
          <SortableContext
            items={tasksOrder}
            strategy={verticalListSortingStrategy}
          >
            <div className="columnBody">
              {tasksOrder.map(id => (
                <TaskCard key={id} id={id} task={tasks[id]} onDelete={onDelete} />
              ))}
              {tasksOrder.length === 0 && (<div className="placeholder" />)}
            </div>
          </SortableContext>
        </div>
        <DragOverlay />
      </DndContext>
    </div>
  );
}

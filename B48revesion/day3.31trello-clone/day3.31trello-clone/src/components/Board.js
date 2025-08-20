import React, { useEffect, useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, TouchSensor, KeyboardSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import Column from "./Column";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";
import { loadBoard, saveBoard } from "../utils/storage";



const DEFAULT_STATE = {
  columns: {
    todo: [],
    inprogress: [],
    done: []
  },
  tasks: {}
};


function withSeed(state) {
  if (state.columns.todo.length + state.columns.inprogress.length + state.columns.done.length > 0) return state;

  const t1 = nanoid();
  const t2 = nanoid();
  const t3 = nanoid();

  return {
    columns: {
      todo: [t1, t2],
      inprogress: [t3],
      done: []
    },
    tasks: {
      [t1]: { id: t1, title: "Set up project", description: "Init Vite/CRA, install deps" },
      [t2]: { id: t2, title: "Design columns", description: "To-Do / In Progress / Done" },
      [t3]: { id: t3, title: "Implement DnD", description: "Use @dnd-kit for drag & drop" }
    }
  };
}

export default function Board() {
  const [board, setBoard] = useState(() => withSeed(loadBoard() ?? DEFAULT_STATE));
  const [activeTaskId, setActiveTaskId] = useState(null);

  
  useEffect(() => { saveBoard(board); }, [board]);

  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const columnIds = useMemo(() => ["todo", "inprogress", "done"], []);

  const getContainerOfTask = (taskId) => {
    const { columns } = board;
    if (columns.todo.includes(taskId)) return "todo";
    if (columns.inprogress.includes(taskId)) return "inprogress";
    if (columns.done.includes(taskId)) return "done";
    return null;
  };

  const addTaskToTodo = (title, description = "") => {
    const id = nanoid();
    setBoard(prev => ({
      columns: {
        ...prev.columns,
        todo: [id, ...prev.columns.todo]
      },
      tasks: {
        ...prev.tasks,
        [id]: { id, title, description }
      }
    }));
  };

  const deleteTask = (taskId) => {
    const container = getContainerOfTask(taskId);
    if (!container) return;
    setBoard(prev => {
      const { [taskId]: _, ...restTasks } = prev.tasks;
      return {
        columns: {
          ...prev.columns,
          [container]: prev.columns[container].filter(id => id !== taskId)
        },
        tasks: restTasks
      };
    });
  };

  
  const handleDragStart = (event) => {
    setActiveTaskId(event.active.id); 
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTaskId(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    
    if (activeId === overId) return;

    const fromCol = getContainerOfTask(activeId);

    const isOverColumn = ["todo", "inprogress", "done"].includes(String(overId));
    const toCol = isOverColumn ? overId : getContainerOfTask(overId);

    if (!fromCol || !toCol) return;

    setBoard(prev => {
      
      if (fromCol === toCol) {
        const oldIndex = prev.columns[fromCol].indexOf(activeId);
        const newIndex = isOverColumn
          ? prev.columns[toCol].length
          : prev.columns[toCol].indexOf(overId);

        const newIds = arrayMove(prev.columns[fromCol], oldIndex, newIndex);
        return {
          ...prev,
          columns: { ...prev.columns, [fromCol]: newIds }
        };
      }

      const fromIds = prev.columns[fromCol].filter(id => id !== activeId);
      const toIds = [...prev.columns[toCol]];
      const insertIndex = isOverColumn ? toIds.length : toIds.indexOf(overId);
      toIds.splice(insertIndex, 0, activeId);

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [fromCol]: fromIds,
          [toCol]: toIds
        }
      };
    });
  };

  const handleDragCancel = () => setActiveTaskId(null);

  return (
    <div className="board">
    
      <div className="column" id="todo">
        <div className="columnHead">
          <div className="row" style={{ gap: 10 }}>
            <span className="columnTitle">To-Do</span>
            <span className="badge">{board.columns.todo.length}</span>
          </div>
        </div>

        <NewTaskForm onAdd={addTaskToTodo} />

        <DndContext
          id="ctx-todo"
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div id="todo" style={{ padding: 12 }}>
            <SortableContext
              items={board.columns.todo}
              strategy={verticalListSortingStrategy}
            >
              <div className="columnBody">
                {board.columns.todo.map(taskId => (
                  <TaskCard
                    key={taskId}
                    id={taskId}
                    task={board.tasks[taskId]}
                    onDelete={deleteTask}
                  />
                ))}
                {board.columns.todo.length === 0 && (
                  <div className="placeholder" />
                )}
              </div>
            </SortableContext>
          </div>

          <DragOverlay adjustScale={false}>
            {activeTaskId ? (
              <div className="task dragging">
                <h4 className="taskTitle">{board.tasks[activeTaskId]?.title}</h4>
                {board.tasks[activeTaskId]?.description && (
                  <p className="taskDesc">{board.tasks[activeTaskId]?.description}</p>
                )}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <Column
        columnId="inprogress"
        title="In Progress"
        tasksOrder={board.columns.inprogress}
        tasks={board.tasks}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        onDelete={deleteTask}
      />

      <Column
        columnId="done"
        title="Done"
        tasksOrder={board.columns.done}
        tasks={board.tasks}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        onDelete={deleteTask}
      />
    </div>
  );
}

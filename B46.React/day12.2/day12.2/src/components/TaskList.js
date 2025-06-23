// src/components/TaskList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTask, removeTask } from '../features/tasks/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                onClick={() => dispatch(toggleTask(task.id))}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {task.text}
              </span>
              <button onClick={() => dispatch(removeTask(task.id))} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

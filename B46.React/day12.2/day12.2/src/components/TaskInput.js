// src/components/TaskInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';

const TaskInput = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTask(text));
      setText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default TaskInput;

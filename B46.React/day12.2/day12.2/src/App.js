// src/App.js
import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Task List App</h2>
      <TaskInput />
      <hr />
      <TaskList />
    </div>
  );
}

export default App;

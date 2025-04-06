import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [statusCounts, setStatusCounts] = useState({ completed: 0, ongoing: 0, notStarted: 0 });

  useEffect(() => {
    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);

      // Update counts
      const counts = { completed: 0, ongoing: 0, notStarted: 0 };
      taskList.forEach(task => {
        if (task.status === 'completed') counts.completed++;
        else if (task.status === 'ongoing') counts.ongoing++;
        else counts.notStarted++;
      });
      setStatusCounts(counts);
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrEdit = async () => {
    if (!taskInput.trim()) return;
    if (editId) {
      await firestore.collection('tasks').doc(editId).update({ name: taskInput });
      setEditId(null);
    } else {
      await firestore.collection('tasks').add({
        name: taskInput,
        status: 'notStarted'
      });
    }
    setTaskInput('');
  };

  const handleDelete = async id => {
    await firestore.collection('tasks').doc(id).delete();
  };

  const handleEdit = task => {
    setTaskInput(task.name);
    setEditId(task.id);
  };

  const handleStatusChange = async (id, newStatus) => {
    await firestore.collection('tasks').doc(id).update({ status: newStatus });
  };

  const renderTaskList = (filter) =>
    tasks.filter(task => task.status === filter).map(task => (
      <li key={task.id}>{task.name}</li>
    ));

  return (
    <div style={{ padding: '20px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        {['completed', 'ongoing', 'notStarted'].map(status => (
          <div
            key={status}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '8px',
              position: 'relative'
            }}
          >
            <strong>{status.toUpperCase()}: {statusCounts[status]}</strong>
            <div style={{ display: 'none', position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ccc', padding: '10px', zIndex: 10 }}
              className="tooltip"
            >
              <ul>{renderTaskList(status)}</ul>
            </div>
          </div>
        ))}
      </nav>

      <div style={{ marginBottom: '20px' }}>
        <input
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={handleAddOrEdit}>{editId ? 'Update' : 'Add'}</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} - {task.status}
            <select value={task.status} onChange={e => handleStatusChange(task.id, e.target.value)}>
              <option value="notStarted">Not Started</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <style>{`
        nav div:hover .tooltip {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default TaskApp;
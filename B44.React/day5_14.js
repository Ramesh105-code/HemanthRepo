import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const unsubscribe = firestore.collection('tasks').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []); 

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
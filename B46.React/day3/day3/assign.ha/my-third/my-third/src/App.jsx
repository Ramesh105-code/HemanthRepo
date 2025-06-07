import React, { useState, useEffect } from 'react';

export function LifecycleComponent({ name, addLog }) {

  useEffect(() => {
    addLog(`Component mounted`, 'mount');
    return () => {
      addLog(`Component unmounted`, 'unmount');
    };
  }, [addLog]);

  useEffect(() => {
    addLog(`Updated: name changed to \"${name}\"`, 'update');
  }, [name, addLog]);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold">Hello, {name}!</h2>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('World');
  const [logs, setLogs] = useState([]);


  const addLog = (message, type) => {
    setLogs(prev => [{ message, type, timestamp: Date.now() }, ...prev]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Lifecycle Visualizer</h1>

      <div className="mb-4 flex items-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShow(!show)}
        >
          {show ? 'Unmount Component' : 'Mount Component'}
        </button>

        <input
          type="text"
          className="border px-2 py-1 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name..."
        />
      </div>

      {show && <LifecycleComponent name={name} addLog={addLog} />}

      <div className="mt-6">
        <h2 className="text-lg">Log:</h2>
        <ul className="mt-2 space-y-1">
          {logs.map((log, idx) => {
            let color = '';
            if (log.type === 'mount') color = 'text-green-600';
            if (log.type === 'update') color = 'text-yellow-600';
            if (log.type === 'unmount') color = 'text-red-600';
            const time = new Date(log.timestamp).toLocaleTimeString();
            return (
              <li key={idx} className={color}>
                [{time}] {log.message}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// App.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Counter Application (Redux)</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>Decrement</button>

      <h3 style={{ marginTop: '2rem' }}>Redux State:</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;

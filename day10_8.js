import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/actions';

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Redux Counter App</h2>
      <p>Current State:</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => dispatch(increment())}>Increment</button>{' '}
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default App;

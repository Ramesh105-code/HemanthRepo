// src/components/Counter.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../features/counter/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Redux Toolkit Counter</h2>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())} style={{ marginRight: '10px' }}>
        ➕ Increment
      </button>
      <button onClick={() => dispatch(decrement())}>➖ Decrement</button>
    </div>
  );
};

export default Counter;

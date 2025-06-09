import { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || isNaN(amount)) return;
    onAdd(name, amount);
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default ExpenseForm;

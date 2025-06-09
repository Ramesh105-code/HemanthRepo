import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import PersonCard from './components/PersonCard';
import PersonFilter from './components/PersonFilter';
import SortToggle from './components/SortToggle';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  const addExpense = (name, amount) => {
    setExpenses(prev => [...prev, { id: uuid(), name, amount: +amount }]);
  };

  const handleFilterChange = (name) => {
    setFilter(name);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredExpenses = filter === 'All' ? expenses : expenses.filter(e => e.name === filter);

  const personTotals = expenses.reduce((acc, { name, amount }) => {
    acc[name] = (acc[name] || 0) + amount;
    return acc;
  }, {});

  const sortedPersons = Object.entries(personTotals).sort((a, b) => {
    return sortOrder === 'asc' ? a[1] - b[1] : b[1] - a[1];
  });

  const highestAmount = Math.max(...Object.values(personTotals), 0);

  const people = [...new Set(expenses.map(e => e.name))];

  return (
    <div className="app">
      <h1>💰 Expense Splitter</h1>
      <ExpenseForm onAdd={addExpense} />

      <PersonFilter people={people} selected={filter} onChange={handleFilterChange} />
      <SortToggle order={sortOrder} onToggle={toggleSortOrder} />

      <h2>Totals</h2>
      {sortedPersons.length > 0 ? (
        sortedPersons.map(([name, total]) => (
          <PersonCard key={name} name={name} total={total} isHighest={total === highestAmount} />
        ))
      ) : (
        <p>No expenses yet.</p>
      )}

      <h2>Expense List</h2>
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
}

export default App;

  )
}

export default App;

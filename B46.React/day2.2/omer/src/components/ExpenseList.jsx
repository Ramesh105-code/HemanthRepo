function ExpenseList({ expenses }) {
  if (expenses.length === 0) return <p>No expenses to show.</p>;

  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          {exp.name} spent ₹{exp.amount}
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;

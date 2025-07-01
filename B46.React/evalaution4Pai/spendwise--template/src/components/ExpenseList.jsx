import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../redux/expensesSlice";

function ExpenseList() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const { category, search } = useSelector((state) => state.filters);

  const filtered = expenses.filter((exp) => {
    const matchesCategory = category === "All" || exp.category === category;
    const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStyle = (amount) => {
    if (amount > 1000) return { color: "red" };
    if (amount >= 500) return { color: "orange" };
    return { color: "green" };
  };

  return (
    <div>
      <h3>Expense List</h3>
      {filtered.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {filtered.map((exp) => (
            <li key={exp.id}>
              <span>{exp.date} - </span>
              <strong>{exp.title}</strong> (₹{exp.amount}) -{" "}
              <em>{exp.category}</em>
              <span style={getStyle(exp.amount)}> ←</span>
              <button onClick={() => dispatch(deleteExpense(exp.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
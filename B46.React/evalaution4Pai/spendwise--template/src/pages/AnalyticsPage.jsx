import { useSelector } from "react-redux";

function AnalyticsPage() {
  const expenses = useSelector(state => state.expenses);

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const high = Math.max(...expenses.map(e => e.amount), 0);
  const average = expenses.length ? (total / expenses.length).toFixed(2) : 0;
  const countAbove1000 = expenses.filter(e => e.amount > 1000).length;

  const totalPerCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Analytics</h2>
      <p>Total: ₹{total}</p>
      <p>Highest: ₹{high}</p>
      <p>Average: ₹{average}</p>
      <p>Count  ₹1000: {countAbove1000}</p>
      <h4>Total per category:</h4>
      <ul>
        {Object.entries(totalPerCategory).map(([cat, val]) => (
          <li key={cat}>{cat}: ₹{val}</li>
        ))}
      </ul>
    </div>
  );
}

export default AnalyticsPage;
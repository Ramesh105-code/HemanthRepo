import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";

function Dashboard() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>
      <ExpenseForm />
      <Filters />
      <ExpenseList />
    </div>
  );
}

export default Dashboard;
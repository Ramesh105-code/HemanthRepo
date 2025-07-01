import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expensesSlice";


function ExpenseForm() {
  const titleRef = useRef();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;
    setLoading(true);

    const newExpense = {
      ...form,
      id: date.now().toString(),
      amount: Number(form.amount),
    };

    setTimeout(() => {
      dispatch(addExpense(newExpense));
      setForm({ title: "", amount: "", category: "Food", date: "" });
      setLoading(false);
      titleRef.current.focus();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        ref={titleRef}
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Misc</option>
      </select>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
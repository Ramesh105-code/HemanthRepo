const IdeaForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [urgency, setUrgency] = useState("Low");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length < 5) return setError("Title must be at least 5 characters");
    
    const idea = {
      title,
      category,
      urgency,
      createdAt: Date.now()
    };

    await push(ref(db, "ideas"), idea);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Idea Title" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Tech</option><option>Art</option><option>Philosophy</option><option>Random</option>
      </select>
      <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <button type="submit">Add Idea</button>
      {error && <p>{error}</p>}
    </form>
  );
};
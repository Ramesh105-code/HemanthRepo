const App = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const ideasRef = ref(db, "ideas");
    onValue(ideasRef, (snapshot) => {
      const data = snapshot.val() || {};
      const parsed = Object.entries(data).map(([id, idea]) => ({ id, ...idea }));
      setIdeas(parsed);
    });
  }, []);

  return (
    <div>
      <h1>IdeaBoard</h1>
      <IdeaForm />
      <FilterSortControls />
      <IdeaTable ideas={ideas} />
    </div>
  );
};
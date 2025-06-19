const ITEMS_PER_PAGE = 5;

const IdeaTable = ({ ideas }) => {
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = ideas.slice(start, start + ITEMS_PER_PAGE);

  return (
    <>
      <table>
        <thead><tr><th>Title</th><th>Category</th><th>Urgency</th></tr></thead>
        <tbody>
          {paginated.map((idea) => (
            <tr key={idea.id} className={getUrgencyClass(idea.urgency)}>
              <td>{idea.title}</td>
              <td>{idea.category}</td>
              <td>{idea.urgency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalItems={ideas.length} onPageChange={setPage} />
    </>
  );
};
function SortToggle({ order, onToggle }) {
  return (
    <button onClick={onToggle}>
      Sort: {order === 'asc' ? '↑ Ascending' : '↓ Descending'}
    </button>
  );
}

export default SortToggle;

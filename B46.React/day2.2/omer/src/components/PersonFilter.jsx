function PersonFilter({ people, selected, onChange }) {
  return (
    <select value={selected} onChange={e => onChange(e.target.value)}>
      <option value="All">All</option>
      {people.map(person => (
        <option key={person} value={person}>
          {person}
        </option>
      ))}
    </select>
  );
}

export default PersonFilter;

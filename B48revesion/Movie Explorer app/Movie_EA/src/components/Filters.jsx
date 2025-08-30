export default function Filters({ year, setYear }) {
  const years = [];
  for (let y = new Date().getFullYear(); y >= 1980; y--) years.push(y);

  return (
    <div className="flex gap-3 flex-wrap mb-4">
      <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 border rounded-lg">
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

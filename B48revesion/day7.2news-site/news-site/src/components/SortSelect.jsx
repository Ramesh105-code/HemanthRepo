export default function SortSelect({ value, onChange, disabled }) {
  return (
    <select
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      disabled={disabled}
      className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-50"
      title="Sort By (applies to Search only)"
    >
      <option value="publishedAt">Published date</option>
      <option value="relevancy">Relevancy</option>
      <option value="popularity">Popularity</option>
    </select>
  )
}

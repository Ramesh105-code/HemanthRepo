export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search news (e.g., AI, Olympics, markets)..."
        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
      />
    </div>
  )
}

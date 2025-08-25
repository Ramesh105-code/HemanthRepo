export default function CountrySelect({ countries, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
      title="Country/Region"
    >
      {countries.map(c => (
        <option key={c} value={c}>{c.toUpperCase()}</option>
      ))}
    </select>
  )
}


import CountrySelect from './CountrySelect.jsx'
import SearchBar from './Searchbar.jsx'
import SortSelect from './SortSelect.jsx'
import clsx from 'clsx'

export default function Navbar({
  categories, countries,
  category, onCategoryChange,
  country, onCountryChange,
  query, onQueryChange,
  sortBy, onSortChange,
  isSearchMode
}) {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-3 py-3 flex flex-col gap-3">
        {/* Row 1: Search + Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <SearchBar value={query} onChange={onQueryChange} />
          <div className="flex items-center gap-2">
            <CountrySelect countries={countries} value={country} onChange={onCountryChange} />
            <SortSelect value={sortBy} onChange={onSortChange} disabled={!isSearchMode} />
          </div>
        </div>

        {/* Row 2: Categories */}
        <nav className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={clsx(
                'px-3 py-1.5 rounded-full border text-sm capitalize',
                category === cat
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100'
                  : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              {cat}
            </button>
          ))}
        </nav>

        {isSearchMode ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing results for <span className="font-medium">“{query}”</span> sorted by <span className="font-medium">{sortBy}</span>.
          </p>
        ) : (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Top headlines in <span className="font-medium capitalize">{category}</span> ({country.toUpperCase()}).
          </p>
        )}
      </div>
    </div>
  )
}

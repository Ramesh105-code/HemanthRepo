import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ArticleList from './components/ArticleList.jsx'
import { fetchTopHeadlines, fetchEverything } from './services/newsApi.js'
import ThemeToggle from './components/ThemeToggle.jsx'
import BookmarksDrawer from './components/BookmarksDrawer.jsx'

import useTheme from './hooks/useTheme.js'
import clsx from 'clsx'

const CATEGORIES = ['business','sports','technology','health','entertainment','science']
const COUNTRIES = ['us','in','gb','au','ca','za']

export default function App() {
  const { theme } = useTheme()
  const [country, setCountry] = useState('us')
  const [category, setCategory] = useState('business')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('publishedAt') // relevancy | popularity | publishedAt (NewsAPI)
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookmarksOpen, setBookmarksOpen] = useState(false)

  // when filters change, reset the list
  useEffect(() => {
    setArticles([])
    setPage(1)
    setHasMore(true)
  }, [country, category, query, sortBy])

  const isSearchMode = useMemo(() => query.trim().length > 0, [query])

  useEffect(() => {
    loadMore() // initial fetch on mount & when dependencies reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, category, query, sortBy])

  async function loadMore() {
    if (loading) return
    setLoading(true)
    setError('')

    try {
      let data
      if (isSearchMode) {
        data = await fetchEverything({
          q: query.trim(),
          sortBy,
          page,
          pageSize: 20,
        })
      } else {
        data = await fetchTopHeadlines({
          country,
          category,
          page,
          pageSize: 20,
        })
      }
      const newItems = data?.articles ?? []
      setArticles(prev => [...prev, ...newItems])
      const totalResults = data?.totalResults ?? 0
      const reachedEnd = (page * 20) >= totalResults || newItems.length === 0
      setHasMore(!reachedEnd)
      setPage(p => p + 1)
    } catch (e) {
      setError(e?.message || 'Failed to fetch news.')
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={clsx(theme === 'dark' ? 'dark' : '', 'min-h-screen')}>
      <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 min-h-screen transition-colors">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-3">
            <div className="flex items-center justify-between py-3 gap-3">
              <h1 className="text-xl sm:text-2xl font-bold">DailyFeed</h1>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => setBookmarksOpen(true)}
                  aria-label="Open bookmarks"
                >
                  ★ Bookmarks
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <Navbar
            categories={CATEGORIES}
            countries={COUNTRIES}
            category={category}
            onCategoryChange={setCategory}
            country={country}
            onCountryChange={setCountry}
            query={query}
            onQueryChange={setQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            isSearchMode={isSearchMode}
          />
        </header>

        <main className="max-w-6xl mx-auto px-3 py-4">
          {error && (
            <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <ArticleList
            articles={articles}
            hasMore={hasMore}
            loading={loading}
            onLoadMore={loadMore}
          />
        </main>

        <BookmarksDrawer open={bookmarksOpen} onClose={() => setBookmarksOpen(false)} />
      </div>
    </div>
  )
}

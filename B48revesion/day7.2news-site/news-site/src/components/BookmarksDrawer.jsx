import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const BookmarksContext = createContext(null)

export default function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])

  function addBookmark(article) {
    setBookmarks(prev => {
      if (prev.find(a => a.url === article.url)) return prev
      return [article, ...prev]
    })
  }

  function removeBookmark(url) {
    setBookmarks(prev => prev.filter(a => a.url !== url))
  }

  const isBookmarked = (url) => bookmarks.some(a => a.url === url)

  const value = useMemo(() => ({ bookmarks, addBookmark, removeBookmark, isBookmarked }), [bookmarks])

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
}

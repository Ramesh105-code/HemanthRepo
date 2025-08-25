import dayjs from 'dayjs'
import { PLACEHOLDER_IMG } from '../utils/placeholders.js'
import  useBookmarks from '../context/BookmarkContext.jsx'



export default function ArticleCard({ article }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const {
    url, urlToImage, title, description, author, publishedAt, source
  } = article

  const bookmarked = isBookmarked(url)

  function toggleBookmark() {
    if (bookmarked) removeBookmark(url)
    else addBookmark(article)
  }

  return (
    <article className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] bg-zinc-100 dark:bg-zinc-800">
        <img
          src={urlToImage || PLACEHOLDER_IMG}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e)=>{ e.currentTarget.src = PLACEHOLDER_IMG }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{description || 'No description available.'}</p>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          <span>{author ? author : 'Unknown author'}</span>
          {' • '}
          <span>{dayjs(publishedAt).format('MMM D, YYYY h:mm A')}</span>
          {' • '}
          <span className="font-medium">{source?.name}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm"
          >
            Read full article ↗
          </a>
          <button
            onClick={toggleBookmark}
            className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {bookmarked ? '★ Saved' : '☆ Save for later'}
          </button>
        </div>
      </div>
    </article>
  )
}

import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from './ArticleCard.jsx'

export default function ArticleList({ articles, hasMore, loading, onLoadMore }) {
  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={
        loading ? <div className="py-6 text-center text-zinc-500">Loading…</div> : null
      }
      endMessage={
        !loading && !hasMore ? <p className="py-6 text-center text-zinc-500">No more articles.</p> : null
      }
    >
      {articles.length === 0 && !loading ? (
        <div className="py-12 text-center text-zinc-500">No articles found.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(a => (
            <ArticleCard key={a.url} article={a} />
          ))}
        </div>
      )}
    </InfiniteScroll>
  )
}

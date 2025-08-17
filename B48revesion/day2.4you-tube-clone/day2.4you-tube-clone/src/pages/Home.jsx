import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos } from "../features/videos/videosSlice";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((s) => s.videos);

  
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    if (status === "idle") dispatch(getPopularVideos());
  }, [status, dispatch]);

  const totalPages = Math.ceil(list.length / perPage) || 1;
  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return list.slice(start, start + perPage);
  }, [list, page]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Popular Videos</h1>
      {status === "loading" && <div>Loading…</div>}
      {status === "failed" && <div className="text-red-600">Error: {error}</div>}
      {status === "succeeded" && (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {current.map((v) => (
              <VideoCard key={v.id?.videoId || v.id} v={v} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span>Page {page} / {totalPages}</span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

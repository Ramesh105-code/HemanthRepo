import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoDetail } from "../features/videos/videosSlice";
import { getSuggestions } from "../features/suggestions/suggestionsSlice";
import VideoCard from "../components/VideoCard";

export default function VideoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { current, status } = useSelector((s) => s.videos);
  const { list: suggestions } = useSelector((s) => s.suggestions);

  useEffect(() => {
    dispatch(getVideoDetail(id));
    dispatch(getSuggestions(id));
  }, [id, dispatch]);

  const title = current?.snippet?.title || "";
  const desc = current?.snippet?.description || "";
  const views = current?.statistics?.viewCount || 0;
  const likes = current?.statistics?.likeCount || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <div>
        <div className="aspect-video w-full bg-black rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {status === "loading" && <div className="mt-3">Loading…</div>}
        {current && (
          <div className="mt-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="text-sm text-gray-600 mt-1">
              {Intl.NumberFormat().format(views)} views · {Intl.NumberFormat().format(likes)} likes
            </div>
            <p className="mt-3 whitespace-pre-line text-sm">{desc}</p>
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <h3 className="font-medium">Suggested</h3>
        {suggestions.map((sug) => {
          const vid = { ...sug, id: sug.id.videoId };
          return (
            <div key={sug.id.videoId} onClick={() => nav(`/watch/${sug.id.videoId}`)} className="cursor-pointer">
              <VideoCard v={vid} />
            </div>
          );
        })}
      </aside>
    </div>
  );
}

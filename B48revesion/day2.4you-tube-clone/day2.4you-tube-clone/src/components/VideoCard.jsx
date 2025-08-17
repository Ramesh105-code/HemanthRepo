import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ v }) {
  const id = v.id?.videoId || v.id; 
  const { title, thumbnails, channelTitle, publishedAt } = v.snippet;
  const views = v.statistics?.viewCount;

  return (
    <Link to={`/watch/${id}`} className="block">
      <img
        className="rounded w-full aspect-video object-cover"
        src={thumbnails?.medium?.url}
        alt={title}
      />
      <div className="mt-2">
        <div className="font-medium line-clamp-2">{title}</div>
        <div className="text-sm text-gray-500">{channelTitle}</div>
        <div className="text-xs text-gray-500">
          {views ? Intl.NumberFormat().format(views) + " views · " : ""}
          {new Date(publishedAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}

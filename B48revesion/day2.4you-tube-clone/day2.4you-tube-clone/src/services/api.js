const API_KEY = import.meta.env.VITE_YT_API_KEY;
const BASE = "https://www.googleapis.com/youtube/v3";

export async function fetchPopularVideos() {
  const url = `${BASE}/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

export async function fetchVideoById(id) {
  const url = `${BASE}/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch video");
  return res.json();
}

export async function fetchSuggestions(id) {
  // Related videos via search
  const url = `${BASE}/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=25&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
}

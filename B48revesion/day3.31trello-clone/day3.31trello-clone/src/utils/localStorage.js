const KEY = "taskboard:v1";

export function loadBoard() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBoard(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

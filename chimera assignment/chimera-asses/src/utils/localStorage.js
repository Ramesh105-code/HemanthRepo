export function saveTabState(tabName, state) {
  localStorage.setItem(`${tabName}-state`, JSON.stringify(state));
}

export function loadTabState(tabName) {
  const state = localStorage.getItem(`${tabName}-state`);
  return state ? JSON.parse(state) : null;
}
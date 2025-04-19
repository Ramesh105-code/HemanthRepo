// api/firebase.js
const BASE = 'https://<project-id>.firebaseio.com/courses';

export const fetchCourses = async () => {
  const res = await fetch(`${BASE}.json`);
  const data = await res.json();
  return data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
};

export const createCourse = async (course) =>
  fetch(`${BASE}.json`, {
    method: 'POST',
    body: JSON.stringify(course),
  });

export const updateCourse = async (id, updates) =>
  fetch(`${BASE}/${id}.json`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });

export const deleteCourse = async (id) =>
  fetch(`${BASE}/${id}.json`, {
    method: 'DELETE',
  });
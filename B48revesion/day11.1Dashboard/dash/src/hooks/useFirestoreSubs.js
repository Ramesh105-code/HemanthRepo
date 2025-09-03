import { useEffect, useState } from 'react';
export function useTasksSubscription() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
const unsub = onSnapshot(q, (snap) => {
const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
setTasks(list);
setLoading(false);
}, (err) => {
setError(err);
setLoading(false);
});
return () => unsub();
}, []);


return { tasks, loading, error };
}


export function useUserProfile(docId = 'defaultUser') {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
const fetch = async () => {
const ref = doc(db, 'users', docId);
const snap = await getDoc(ref);
setUser(snap.exists() ? snap.data() : { name: 'Guest', photoURL: '' });
setLoading(false);
};
fetch();
}, [docId]);


return { user, loading };
}
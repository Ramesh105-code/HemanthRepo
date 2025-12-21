import { useEffect, useState } from "react";
import { ref, onChildAdded } from "../utils/firebase";

export function useRealtimeListener(universe, freezeMode) {
  const [items, setItems] = useState([]);
  const [buffer, setBuffer] = useState([]);
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    const dbRef = ref(universe);

    const unsubscribe = onChildAdded(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (freezeMode) {
        setBuffer((b) => [...b, data]);
      } else {
        setItems((prev) => [...prev, data]);
      }
      setActivity(true);
      setTimeout(() => setActivity(false), 800);
    });

    return () => unsubscribe();
  }, [universe, freezeMode]);

  const flushBuffer = () => {
    setItems((prev) => [...prev, ...buffer]);
    setBuffer([]);
  };

  return { items, flushBuffer, buffer, activity };
}
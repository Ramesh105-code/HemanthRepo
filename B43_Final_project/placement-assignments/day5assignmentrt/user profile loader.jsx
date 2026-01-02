import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
          { signal }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort(); // cleanup
  }, [retryCount]);

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setRetryCount((c) => c + 1)}>Retry</button>
      </div>
    );

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.company.name}</p>
      </div>
    )
  );
}

export default UserProfile;

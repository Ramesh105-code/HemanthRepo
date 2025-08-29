import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/polls").then((res) => setPolls(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">All Polls</h1>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id} className="mb-2">
            <Link to={`/poll/${poll.id}`} className="text-blue-600 underline">
              {poll.question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
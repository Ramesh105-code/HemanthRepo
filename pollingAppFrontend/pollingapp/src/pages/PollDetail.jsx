import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/polls/${id}`).then((res) => setPoll(res.data));
  }, [id]);

  const totalVotes = useMemo(() => {
    if (!poll) return 0;
    return poll.options.reduce((sum, o) => sum + o.votes, 0);
  }, [poll]);

  const handleVote = async (optionText) => {
    const res = await axios.post(`http://localhost:5000/api/polls/${id}/vote`, {
      optionText,
    });
    setPoll(res.data);
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">{poll.question}</h1>
      {poll.options.map((opt) => (
        <div key={opt.text} className="mb-2">
          <button
            onClick={() => handleVote(opt.text)}
            className="px-2 py-1 border rounded"
          >
            {opt.text}
          </button>
          <span className="ml-2">
            {opt.votes} votes (
            {totalVotes ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0}%)
          </span>
        </div>
      ))}
    </div>
  );
}
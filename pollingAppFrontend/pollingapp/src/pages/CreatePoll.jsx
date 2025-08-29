import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
  const questionRef = useRef(null);
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (i, value) => {
    const newOptions = [...options];
    newOptions[i] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = questionRef.current.value;
    await axios.post(
      "http://localhost:5000/api/polls",
      { question, options },
      { headers: { Authorization: "Bearer MY_SECRET_TOKEN" } }
    );
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Create New Poll</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={questionRef}
          type="text"
          placeholder="Poll question"
          className="border p-2 w-full mb-2"
          autoFocus
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            className="border p-2 w-full mb-2"
          />
        ))}
        <button type="button" onClick={addOption} className="bg-gray-300 px-2 py-1 mr-2">
          Add Option
        </button>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1">
          Create Poll
        </button>
      </form>
    </div>
  );
}
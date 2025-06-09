// src/EmojiButton.jsx
import { useState } from 'react';

export default function EmojiButton({ emoji, label, onVote }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
    onVote(label);
  };

  return (
    <button onClick={handleClick} className="emoji-button">
      <span style={{ fontSize: '2rem' }}>{emoji}</span> {label} ({count})
    </button>
  );
}

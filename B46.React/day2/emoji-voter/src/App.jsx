import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return 


const EMOJIS = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😱', label: 'Surprised' },
  { emoji: '😎', label: 'Cool' },
];

function App() {
  const [votes, setVotes] = useState({});

  const handleVote = (label) => {
    setVotes(prev => ({
      ...prev,
      [label]: (prev[label] || 0) + 1,
    }));
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const winnerLabel =
    totalVotes > 0
      ? Object.keys(votes).reduce((a, b) =>
          votes[a] >= votes[b] ? a : b
        )
      : null;

  return (
    <div className="App">
      <h1>🗳️ Total Votes: {totalVotes}</h1>
      {totalVotes === 0 ? (
        <p>No votes yet, start clicking!</p>
      ) : (
        <h2>🏆 Current Winner: <span style={{ color: 'green' }}>{EMOJIS.find(e => e.label === winnerLabel)?.emoji} {winnerLabel}</span></h2>
      )}

      <div className="emoji-grid">
        {EMOJIS.map(({ emoji, label }) => (
          <div key={label} className={label === winnerLabel ? 'highlight' : ''}>
            <EmojiButton
              emoji={emoji}
              label={label}
              onVote={handleVote}
            />
            <div>{votes[label] || 0} ✅</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


}

export default App

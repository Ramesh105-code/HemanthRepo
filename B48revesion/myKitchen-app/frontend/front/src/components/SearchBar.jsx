
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [q, setQ] = useState('');

  const submit = () => {
    if (q.trim()) onSearch(q.trim());
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <input
        type="text"
        placeholder="Search meals..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <button onClick={submit}>Search</button>
    </div>
  );
};

export default SearchBar;
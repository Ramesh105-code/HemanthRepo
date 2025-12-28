import React, { useState, useEffect } from "react";

function AutoSaveNotes() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Saved ✔");

  useEffect(() => {
    
    if (text !== "") {
      setStatus("Saving...");
    }

    const timeoutId = setTimeout(() => {
      if (text !== "") {
        console.log("Saved note:", text); 
        setStatus("Saved ✔");
      }
    }, 2000);

    
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes..."
      />
      <p>{status}</p>
    </div>
  );
}

export default AutoSaveNotes;
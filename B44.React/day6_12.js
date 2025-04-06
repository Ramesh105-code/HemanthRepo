import React, { useRef } from "react";

const InputFocusManager = () => {
  const inputRef = useRef(null); 

  const handleFocus = () => {
    inputRef.current.focus(); 
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Click the button to focus" />
      <button onClick={handleFocus}>Focus the Input</button>
    </div>
  );
};

export default InputFocusManager;

import React, { useRef } from "react";

function OtpInput() {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value.slice(-1); 

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (e.target.value) {
        e.target.value = "";
      } else if (index > 0) {
        inputsRef.current[index - 1].focus(); 
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    pasteData
      .slice(0, inputsRef.current.length)
      .split("")
      .forEach((char, i) => {
        inputsRef.current[i].value = char;
      });
    const nextIndex = Math.min(pasteData.length, inputsRef.current.length - 1);
    inputsRef.current[nextIndex].focus();
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {[0, 1, 2, 3].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          ref={(el) => (inputsRef.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}

export default OtpInput;

import React, { useRef } from 'react';

const UncontrolledForm = () => {
  // Create a ref for the text input field
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const enteredText = inputRef.current.value; // Access the input value via the ref
    alert(`Entered Text: ${enteredText}`); // Alert the entered text
    inputRef.current.value = ''; // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="textInput">Enter Text:</label>
      <input
        id="textInput"
        type="text"
        ref={inputRef} // Attach the ref to the input field
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
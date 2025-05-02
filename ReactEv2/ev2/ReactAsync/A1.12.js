import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const topics = ["React", "JavaScript", "CSS"];

  return (
    <div>
      <h2>Topics to Learn:</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

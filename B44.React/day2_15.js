import React from "react";
import BlogList from "./components/BlogList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Dynamic Blog Page with Featured Highlight</h1>
      <BlogList />
    </div>
  );
};

export default App;

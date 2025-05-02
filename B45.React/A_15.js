import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "Contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="container">
      <Navbar setPage={setPage} />
      <div className="content">{renderPage()}</div>
    </div>
  );
};

export default App;

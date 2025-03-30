import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Layout />
      </main>
      <Footer />
    </div>
  );
};

export default App;

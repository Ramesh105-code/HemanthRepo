import React from "react";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Main />
      <Footer />
    </AuthProvider>
  );
};

export default App;

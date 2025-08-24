import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Login</Link> | 
      <Link to="/register">Register</Link> | 
      <Link to="/doctors">Doctors</Link> | 
      <Link to="/bookings">Bookings</Link>
    </nav>
  );
};

export default Navbar;

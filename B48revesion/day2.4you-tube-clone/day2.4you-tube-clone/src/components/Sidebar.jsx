import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkCls = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-100 ${isActive ? "bg-gray-100 font-medium" : ""}`;
  return (
    <aside className="w-56 border-r p-2 hidden md:block">
      <NavLink className={linkCls} to="/">Home</NavLink>
      <div className="mt-4 text-xs text-gray-500 px-4">Explore</div>
      <button className="block text-left w-full px-4 py-2 hover:bg-gray-100 rounded">Trending</button>
      <button className="block text-left w-full px-4 py-2 hover:bg-gray-100 rounded">Music</button>
    </aside>
  );
}

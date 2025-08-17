import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { initAuthListener } from "../features/auth/authSlice";

export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => { initAuthListener(dispatch); }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

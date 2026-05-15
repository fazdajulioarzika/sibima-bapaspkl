import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white/20 backdrop-blur-lg text-white py-4 text-center shadow-[0_-4px_10px_rgba(0,82,204,0.9)] border-t border-white/30 text-sm md:text-base">
        <p>
          © {new Date().getFullYear()} - Balai Pemasyarakatan Kelas II
          Pekalongan X Maganghub
        </p>
      </footer>
    </div>
  );
}

export default Layout;

import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "▦" },
  { label: "Orders", path: "/admin/orders", icon: "▤" },
  { label: "Menu", path: "/admin/manage-foods", icon: "⚒" },
  { label: "Staff", path: "/admin/staff", icon: "♙" },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const active = (path) =>
    path === "/admin/manage-foods"
      ? location.pathname.startsWith("/admin/manage-foods") || location.pathname.startsWith("/admin/add-food")
      : location.pathname === path || (path === "/admin/orders" && location.pathname === "/admin/review-now");

  return (
    <div className="min-h-screen bg-[#f4f5fc] pb-24 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-orange-800">Cafe.</span>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-extrabold text-orange-800">PORTAL</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 sm:inline-flex"><span className="mr-2 text-orange-700">●</span>Open</span>
            <Link to="/admin/review-now" aria-label="Notifications" className="relative rounded-full p-2 text-xl text-slate-600 hover:bg-orange-50">
              ♧<span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-700 px-1 text-[10px] font-bold text-white">3</span>
            </Link>
            <Link to="/admin/profile" aria-label="Admin profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-800 text-lg text-white shadow">♟</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur">
        {/* Changed max-w-3xl to max-w-md to keep items grouped closer to center, and grid-cols-5 to grid-cols-4 */}
        <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-2">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={() => `flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-semibold transition ${active(item.path) ? "text-orange-800" : "text-slate-500 hover:text-orange-700"}`}>
              <span className="text-xl leading-6">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
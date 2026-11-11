import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "▦" },
  { label: "Orders", path: "/admin/orders", icon: "▤" },
  { label: "Menu", path: "/admin/manage-foods", icon: "⚒" },
  { label: "Staff", path: "/admin/staff", icon: "♙" },
  { label: "Reviews", path: "/admin/reviews", icon: "★" },
];

export default function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const active = (path) =>
    path === "/admin/manage-foods"
      ? location.pathname.startsWith("/admin/manage-foods") ||
        location.pathname.startsWith("/admin/add-food")
      : location.pathname === path ||
        (path === "/admin/orders" && location.pathname === "/admin/review-now");
  const navClass = (path) =>
    `flex items-center gap-2 text-sm font-medium transition hover:text-orange-600 ${
      active(path) ? "text-orange-600" : "text-gray-600"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#fffdf8] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/admin/dashboard"
            className="flex shrink-0 items-center gap-2"
            onClick={closeMenu}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-300 text-xl text-white">
              🍽
            </span>
            <span className="text-2xl font-extrabold">
              Cafe<span className="text-orange-500">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={navClass(item.path)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="hidden rounded-full bg-orange-50 px-4 py-2 text-sm text-slate-600 xl:inline-flex">
              <span className="mr-2 text-orange-500">●</span> Open
            </span>
            <Link
              to="/admin/review-now"
              aria-label="Review pending orders"
              className="relative rounded-full p-2 text-xl text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
            >
              ♧
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                3
              </span>
            </Link>
            <Link
              to="/admin/profile"
              aria-label="Admin profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg text-white shadow-sm transition hover:bg-orange-600"
            >
              ♟
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-2xl text-slate-700 transition hover:text-orange-600 lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {menuOpen && (
          <div className="space-y-4 border-t border-orange-100 bg-white px-5 py-5 lg:hidden">
            <nav aria-label="Admin navigation" className="grid grid-cols-2 gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={navClass(item.path)}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex gap-3 border-t border-orange-100 pt-4">
              <Link
                to="/admin/review-now"
                onClick={closeMenu}
                className="flex-1 rounded-lg border border-orange-100 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-orange-50"
              >
                Review Orders
              </Link>
              <Link
                to="/admin/profile"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Admin Profile
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

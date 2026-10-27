import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = 2;

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
  ];

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition hover:text-orange-600 ${
      isActive ? "text-orange-600" : "text-gray-600"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-300 text-xl text-white">
            🍽
          </span>
          <span className="text-2xl font-extrabold">
            Cafe<span className="text-orange-500">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={navClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/menu" aria-label="Search menu" className="text-4xl hover:text-orange-600 ">
            ⌕
          </Link>

          <Link to="/cart" className="relative text-xl hover:text-orange-600">
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-orange-500 px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/customer/login" className="text-sm font-semibold hover:text-orange-600">
            Login
          </Link>

          <Link
            to="/customer/signup"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="text-2xl md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="space-y-4 border-t bg-white px-5 py-5 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block text-sm font-medium ${
                  isActive ? "text-orange-600" : "text-gray-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/cart"
            onClick={closeMenu}
            className="block text-sm text-gray-600"
          >
            Shopping Cart ({cartCount})
          </Link>

          <div className="flex gap-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register/customer"
              onClick={closeMenu}
              className="flex-1 rounded-lg bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
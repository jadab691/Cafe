import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/public/Home";
import Menu from "./pages/public/Menu";
import Cart from "./pages/public/Cart";
import FoodDetails from "./pages/public/FoodDetails";

import CustomerSignup from "./pages/customer/CustomerSignup";
import CustomerLogin from "./pages/customer/CustomerLogin";

function About() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">About Cafe</h1>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  const isAuthPage =
    location.pathname === "/customer/signup" ||
    location.pathname === "/customer/login";

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Original Home page — unchanged */}
        <Route path="/" element={<Home />} />

        {/* Full menu page */}
        <Route path="/menu" element={<Menu />} />

        {/* Shopping cart */}
        <Route path="/cart" element={<Cart />} />

        {/* About page */}
        <Route path="/about" element={<About />} />

        {/* Authentication pages */}
        <Route
          path="/customer/signup"
          element={<CustomerSignup />}
        />

        <Route
          path="/customer/login"
          element={<CustomerLogin />}
        />

        {/* Food details */}
        <Route
          path="/food/:id"
          element={<FoodDetails />}
        />

        {/* Page not found */}
        <Route
          path="*"
          element={
            <div className="min-h-[50vh] p-10 text-center">
              <h1 className="text-3xl font-bold">
                404 - Page Not Found
              </h1>

              <a
                href="/"
                className="mt-4 inline-block text-orange-600 underline"
              >
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
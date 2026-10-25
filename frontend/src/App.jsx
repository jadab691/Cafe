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
import FoodDetails from "./pages/public/FoodDetails";
import CustomerSignup from "./pages/customer/CustomerSignup";
import CustomerLogin from "./pages/customer/CustomerLogin";

function Menu() {
  return <div className="p-8">Our Menu</div>;
}

function About() {
  return <div className="p-8">About Cafe</div>;
}

function AppContent() {
  const location = useLocation();

  // Scroll to top whenever the route changes
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
      {/* Navbar will appear on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/customer/signup"
          element={<CustomerSignup />}
        />

        <Route
          path="/customer/login"
          element={<CustomerLogin />}
        />

        {/* Food Details Route */}
        <Route
          path="/food/:id"
          element={<FoodDetails />}
        />
      </Routes>

      {/* Footer remains hidden on Login and Signup */}
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
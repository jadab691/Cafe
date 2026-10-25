import { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/public/Home";
import Menu from "./pages/public/Menu";
import About from "./pages/public/About";
import Cart from "./pages/public/Cart";
import FoodDetails from "./pages/public/FoodDetails";

import CustomerSignup from "./pages/customer/CustomerSignup";
import CustomerLogin from "./pages/customer/CustomerLogin";

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

        <Route path="/food/:id" element={<FoodDetails />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
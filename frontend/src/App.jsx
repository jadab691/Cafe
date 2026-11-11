import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/public/Home";
import Menu from "./pages/public/Menu";
import Cart from "./pages/public/Cart";
import FoodDetails from "./pages/public/FoodDetails";

import CustomerSignup from "./pages/customer/CustomerSignup";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerProfile from "./pages/customer/CustomerProfile";

import Dashboard from "./pages/admin/Dashboard";
import ManageFoods from "./pages/admin/ManageFoods";
import AddFood from "./pages/admin/AddFood";
import ManageOrders from "./pages/admin/ManageOrders";
import ReviewNow from "./pages/admin/ReviewNow";
import Staff from "./pages/admin/Staff";
import Reviews from "./pages/admin/Reviews";
import Profile from "./pages/admin/Profile";

function About() {
  return <div className="p-8"><h1 className="text-3xl font-bold">About Cafe</h1></div>;
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const isAuthPage =
    location.pathname === "/customer/signup" ||
    location.pathname === "/customer/login";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && !isAdminPage && <Navbar />}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />

        {/* Customer pages */}
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/food/:id" element={<FoodDetails />} />

        {/* Admin pages - AdminLayout is included inside each page */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/review-now" element={<ReviewNow />} />
        <Route path="/admin/manage-foods" element={<ManageFoods />} />
        <Route path="/admin/add-food" element={<AddFood />} />
        <Route path="/admin/staff" element={<Staff />} />
        
        {/* NEW REVIEWS ROUTE ADDED HERE */}
        <Route path="/admin/reviews" element={<Reviews />} />
        
        <Route path="/admin/profile" element={<Profile />} />

        {/* Keep old route working */}
        <Route path="/admin/manage-orders" element={<ManageOrders />} />

        <Route path="*" element={
          <div className="min-h-[50vh] p-10 text-center">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <a href="/" className="mt-4 inline-block text-orange-600 underline">Back to Home</a>
          </div>
        } />
      </Routes>

      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
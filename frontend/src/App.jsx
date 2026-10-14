
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/public/Home";
import CustomerSignup from "./pages/customer/CustomerSignup";
import CustomerLogin from "./pages/customer/CustomerLogin";


function Menu() {
  return <div className="p-8">Our Menu</div>;
}

function About() {
  return <div className="p-8">About Cafe</div>;
}

function App() {

  const isSignup = window.location.pathname === "/customer/signup" || window.location.pathname === "/customer/login";

  return (
    <BrowserRouter>
      {!isSignup && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer/signup" element={<CustomerSignup />}/>
        <Route path="/customer/login" element={<CustomerLogin />}/>
      </Routes>


      {!isSignup && <Footer />}
    </BrowserRouter>
  );
}

export default App;

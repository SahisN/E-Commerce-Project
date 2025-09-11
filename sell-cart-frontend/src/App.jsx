import "./App.css";
import Product from "./components/products/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./page/Homepage";
import Navbar from "./components/shared/Navbar";
import About from "./page/About";
import Contact from "./page/Contact";
import Cart from "./page/Cart";
import { Toaster } from "react-hot-toast";
import Login from "./page/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import SignUp from "./page/Signup";
import Checkout from "./page/Checkout";

function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

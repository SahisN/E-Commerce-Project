import "./App.css";
import Product from "./components/products/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./page/Homepage";
import Navbar from "./components/shared/Navbar";
import About from "./page/About";
import Contact from "./page/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

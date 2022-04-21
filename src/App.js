import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Strony
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/errorpage";

// Komponenty
import Dropdown from "./components/Dropdown";
import Navbar from "./components/Navbar";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 890 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", hideMenu);

    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });

  return (
    <div className="App">
      <Router>
        <Navbar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

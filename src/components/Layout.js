import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Admin from "../pages/Admin/Admin";
import AllReports from "../pages/Admin/AllReports";
import AllUsers from "../pages/Admin/AllUsers";
import AllPosts from "../pages/Admin/AllPosts";
import Scoreboard from "../pages/Scoreboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Posts from "../pages/Posts";
import ErrorPage from "../pages/Errorpage";

import Dropdown from "./Dropdown";
import Navbar from "./Navbar";

function Layout() {
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
    <Router>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AllReports />} />
          <Route path="zgloszenia" element={<AllReports />} />
          <Route path="markery" element={<AllPosts />} />
          <Route path="uzytkownicy" element={<AllUsers />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posty" element={<Posts />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Layout;

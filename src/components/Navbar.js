import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.svg";

const Navbar = ({ toggle }) => {
  let navigate = useNavigate();

  const [cookieExist, setCookieExist] = useState(false);

  function checkIfCookieExists() {
    if (
      document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("userId="))
    ) {
      setCookieExist(true);
    } else {
      setCookieExist(false);
    }
  }

  const logout = () => {
    Axios.get("http://localhost:3001/logout");
  };

  useEffect(() => {
    checkIfCookieExists();
  });

  return (
    <div className="h-navbar font-montserrat text-lg">
      <nav
        className="fixed top-0 inset-x-0 flex justify-between items-center h-navbar shadow bg-white text-black z-10"
        role="navigation"
      >
        <div className="pl-6 sm:pl-10">
          <img
            src={logo}
            alt="logo"
            className="h-smlogo w-smlogo hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        <div className="px-4 cursor-pointer nvbar:hidden" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-lightblack" />
        </div>
        <div className="pr-8 nvbar:block hidden">
          <Link to="/" className="p-4">
            Strona Główna
          </Link>
          <Link to="/about" className="p-4">
            O Nas
          </Link>
          <Link to="/contact" className="p-4">
            Kontakt
          </Link>

          {cookieExist ? (
            <Link
              onClick={() => {
                logout();
                Navbar.forceUpdate(); // Force update po tym jak zaloguje (w teorii powinno się tego unikać)
              }}
              to="/"
              className="px-3 py-2 bg-lightgreen rounded-full text-lightblack"
            >
              Wyloguj
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 bg-lightgreen rounded-full text-lightblack"
            >
              Logowanie
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

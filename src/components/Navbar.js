import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import authService from "../services/auth.service";

import logo from "../images/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/antd.min.css";

const Navbar = ({ toggle }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const AuthVerify = () => {
    const user = authService.getCurrentUser();

    if (user) {
      const decodedJwt = authService.parseJwt(user.accessToken);
      if (decodedJwt.role === "admin") {
        setAuthorized(true);
      }
      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  };

  useEffect(() => {
    AuthVerify();
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [location.pathname]);

  const logOut = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
  };

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
          <Link to="/" className="p-4 text-lightblack hover:text-lightblack">
            Strona Główna
          </Link>
          <Link
            to="/scoreboard"
            className="p-4 text-lightblack hover:text-lightblack"
          >
            Ranking
          </Link>

          {currentUser ? (
            <>
              {authorized && (
                <Link
                  to="/admin"
                  className="p-4 text-lightblack hover:text-lightblack"
                >
                  Panel Admina
                </Link>
              )}
              <Link
                to="/posty"
                className="p-4 text-lightblack hover:text-lightblack"
              >
                Moje Znaczniki
              </Link>
              <Link
                onClick={logOut}
                to="/"
                className="px-3 py-2 ml-2 bg-lightgreen rounded-full text-lightblack hover:text-lightblack"
              >
                Wyloguj
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 ml-2 bg-lightgreen rounded-full text-lightblack hover:text-lightblack"
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

import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import authService from "../services/auth.service";

const Dropdown = ({ isOpen, toggle }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const AuthVerify = () => {
    //! to samo co w useffectcie (refaktor)
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
    <div
      className={
        isOpen
          ? "fixed w-full h-72 shadow grid grid-rows-4 text-center items-center bg-white z-10"
          : "hidden"
      }
      onClick={toggle}
    >
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
            Moje Posty
          </Link>
          <Link
            onClick={logOut}
            to="/"
            className="p-4 text-lightblack hover:text-lightblack"
          >
            Wyloguj
          </Link>
        </>
      ) : (
        <Link to="/login" className="p-4 text-lightblack hover:text-lightblack">
          Logowanie
        </Link>
      )}
    </div>
  );
};

export default Dropdown;

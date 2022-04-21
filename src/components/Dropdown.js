import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ isOpen, toggle }) => {
  return (
    <div
      className={
        isOpen
          ? "fixed w-full h-72 shadow grid grid-rows-4 text-center items-center bg-white z-10"
          : "hidden"
      }
      onClick={toggle}
    >
      <Link to="/" className="p-4">
        Strona Główna
      </Link>
      <Link to="/about" className="p-4">
        O Nas
      </Link>
      <Link to="/contact" className="p-4">
        Kontakt
      </Link>
      <Link to="/login" className="p-4">
        Logowanie
      </Link>
    </div>
  );
};

export default Dropdown;

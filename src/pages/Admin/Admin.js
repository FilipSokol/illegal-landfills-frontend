import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import authService from "../../services/auth.service";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authorized, setAuthorized] = useState(false);

  const user = authService.getCurrentUser();

  const AuthVerify = () => {
    if (user) {
      const decodedJwt = authService.parseJwt(user.accessToken);
      if (decodedJwt.role === "admin") {
        setAuthorized(true);
      } else {
        navigate("/errorpage");
      }
    } else {
      navigate("/errorpage");
    }
  };

  useEffect(() => {
    AuthVerify();
  }, []);

  return (
    <>
      {authorized && (
        <div className="w-100 mt-20 flex flex-col">
          <div className="flex gap-x-2 justify-center">
            <Link to="zgloszenia">
              <div
                className={
                  location.pathname === "/admin" ||
                  location.pathname === "/admin/zgloszenia"
                    ? "py-2 px-4 border-x-2 border-t-2 text-lg bg-lightgreen rounded-t-xl text-lightblack hover:text-lightblack"
                    : "py-2 px-4 border-x-2 border-t-2 text-lg bg-green-300 rounded-t-xl text-lightblack hover:text-lightblack"
                }
              >
                Zgłoszone Posty
              </div>
            </Link>
            <Link to="markery">
              <div
                className={
                  location.pathname === "/admin/markery"
                    ? "py-2 px-4 border-x-2 border-t-2 text-lg bg-lightgreen rounded-t-xl text-lightblack hover:text-lightblack"
                    : "py-2 px-4 border-x-2 border-t-2 text-lg bg-green-300 rounded-t-xl text-lightblack hover:text-lightblack"
                }
              >
                Wszystkie Posty
              </div>
            </Link>
            <Link to="uzytkownicy">
              <div
                className={
                  location.pathname === "/admin/uzytkownicy"
                    ? "py-2 px-4 border-x-2 border-t-2 text-lg bg-lightgreen rounded-t-xl text-lightblack hover:text-lightblack"
                    : "py-2 px-4 border-x-2 border-t-2 text-lg bg-green-300 rounded-t-xl text-lightblack hover:text-lightblack"
                }
              >
                Wszyscy użytkownicy
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;

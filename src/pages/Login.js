import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
      credentials: "include",
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="h-fullscreen flex justify-center items-center font-sora text-lightblack">
      <div className="bg-grey-lighter flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-10 py-8 rounded shadow-md w-full">
            <h1 className="mb-8 text-3xl text-center">Logowanie</h1>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Hasło"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-lightgreen text-white hover:bg-darkgreen focus:outline-none my-1"
              onClick={login}
            >
              Zaloguj
            </button>

            <div className="text-center text-sm text-grey-dark mt-4 mx-8 sm:mx-10">
              Nie posiadasz jeszcze konta?
              <a
                className="ml-1 no-underline border-b border-blue text-blue hover:cursor-pointer hover:bg-darkgreen hover:text-white"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Zarejestruj
              </a>
              .
            </div>
          </div>
          <div className="mt-6 h-1 text-xs text-rose-500">{loginStatus}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const Login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
      } else {
        setLoginStatus(response.data.message);
      }
    });
  };

  return (
    <div className="h-fullscreen flex justify-center items-center font-sora text-lightblack">
      <div className="bg-grey-lighter flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-10 py-8 rounded shadow-md w-full">
            <h1 className="mb-8 text-3xl text-center">Logowanie</h1>
            <form onSubmit={Login}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
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
              >
                Zaloguj
              </button>
            </form>
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

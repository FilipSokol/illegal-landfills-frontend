import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const [usernameVal, setUsernameVal] = useState();
  const [emailVal, setEmailVal] = useState();
  const [passwordVal, setPasswordVal] = useState();
  const [secPasswordVal, setSecPasswordVal] = useState();
  const [valStatus, setValStatus] = useState();

  const [usernameMes, setUsernameMes] = useState("");
  const [emailMes, setEmailMes] = useState("");
  const [passwordMes, setPasswordMes] = useState("");
  const [secPasswordMes, setSecPasswordMes] = useState("");

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [secPasswordReg, setSecPasswordReg] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const validation = () => {
    const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

    // USERNAME
    if (usernameRegex.test(usernameReg)) {
      setUsernameVal(true);
      setUsernameMes("");
    } else {
      setUsernameVal(false);
      setUsernameMes("Niepoprawna składnia nazwy użytkownika");
    }

    // EMAIL
    if (emailRegex.test(emailReg)) {
      setEmailVal(true);
      setEmailMes("");
    } else {
      setEmailVal(false);
      setEmailMes("Niepoprawna składnia e-maila");
    }

    // PASSWORD
    if (passwordRegex.test(passwordReg)) {
      setPasswordVal(true);
      setPasswordMes("");
    } else {
      setPasswordVal(false);
      setPasswordMes("Niepoprawna składnia hasła");
    }

    // SECOND PASSWORD
    if (passwordReg === secPasswordReg) {
      setSecPasswordVal(true);
      setSecPasswordMes("");
    } else {
      setSecPasswordVal(false);
      setSecPasswordMes("Podane hasła nie zgadzają się");
    }

    // ACTUAL REGISTER
    if (
      usernameVal === true &&
      emailVal === true &&
      passwordVal === true &&
      secPasswordVal === true
    ) {
      setValStatus(true);
    }
  };

  const register = () => {
    if (valStatus === true) {
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
        if (response.data.message) {
          setRegisterStatus(response.data.message);
        } else {
          console.log(response);
        }
      });
    } else {
      validation();
    }
  };

  useEffect(() => {
    if (usernameReg != "" || emailReg != "" || passwordReg != "") {
      validation();
    }
  });

  return (
    <div className="h-fullscreen flex justify-center items-center font-sora text-lightblack">
      <div className="bg-grey-lighter flex flex-col ">
        <div className="container  flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-10 py-8 rounded shadow-md w-full">
            <h1 className="mb-8 text-3xl text-center">Rejestracja</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              name="fullname"
              placeholder="Nazwa Użytkownika"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {usernameMes}
            </div>

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {emailMes}
            </div>

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded"
              name="password"
              placeholder="Hasło"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {passwordMes}
            </div>

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded"
              name="confirm_password"
              placeholder="Potwierdź hasło"
              onChange={(e) => {
                setSecPasswordReg(e.target.value);
              }}
            />

            <div className="text-xs text-rose-500 text-center h-4 mb-1">
              {secPasswordMes}
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-lightgreen text-white hover:bg-darkgreen focus:outline-none my-1"
              onClick={register}
            >
              Utwórz konto
            </button>

            <div className="text-center text-sm text-grey-dark mt-4 mx-8 sm:mx-10">
              Posiadasz już konto?
              <a
                className="ml-1 no-underline border-b border-blue text-blue hover:cursor-pointer hover:bg-darkgreen hover:text-white"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Zaloguj
              </a>
              .
            </div>
          </div>
          <div className="mt-6 h-1 text-xs text-rose-500">{registerStatus}</div>
        </div>
      </div>
    </div>
  );
}

export default Register;

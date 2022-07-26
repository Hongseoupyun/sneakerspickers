import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const successToast = () => {
    toast("Logged in successfully!", {
      className: "custom-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function logUser(e) {
    e.preventDefault();
    console.log("submit fire");
    return axios
      .post("/auth/login", { email: email, password: password })
      .then(() => {
        successToast();
        setLoginError(false);
        localStorage.setItem("isLoggedIn", true);
      })
      .then(() => {
        setTimeout(() => window.open("/", "_self"), 1500);
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  }

  return (
    <div className="login-body">
      <ToastContainer autoClose={1500} />
      <section className="login-form">
        <h1 className="login-heading">Sign in</h1>
        <form method="POST" onSubmit={logUser}>
          <div className="int-area">
            <input
              type="text"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
              required
            />
            <label>E-mail</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              required
            />
            <label>Password</label>
          </div>
          {loginError && (
            <div className="caption-err">
              Incorrect Email or password. Please try again.
            </div>
          )}
          <div className="btn-area">
            <button type="submit">Sign in</button>
          </div>
          <div className="caption">
            Don't have an account? Register <a href="/register">here</a>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;

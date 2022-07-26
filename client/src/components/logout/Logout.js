import axios from "axios";
import React, { useEffect } from "react";
import "./Logout.scss"

function Logout() {
  function logout() {
    return axios.get("/auth/logout")
    .then (()=>{
      localStorage.setItem("isLoggedIn", false);
      window.open('/', "_self")
    })
  }

  useEffect(() => {
    logout();
  });

  return <div className="logout-container">Signing out!</div>;
}

export default Logout;

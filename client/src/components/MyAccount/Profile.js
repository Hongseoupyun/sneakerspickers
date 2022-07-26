import React, { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";

export default function Profile() {

  const [currentPassword, setCurrentPassword] = useState("")
  const [user_name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [confirmedPassword, setconfirmedPassword] = useState("")

  //fetch data from api using axios
  const getUsersProfile = function () {
    return axios.get("api/profile")
      .then((result) => {
        setName(result.data.user_name)
        setEmail(result.data.email)
      });
  };
  //load usersProfile when rendering component
  useEffect(() => {
    getUsersProfile();
  }, []);

  //sending updated dato to api
  const saveChanges = function (e) {
    e.preventDefault();
    return axios.post("api/profile", { user_name, email, currentPassword, newPassword, confirmedPassword })
      .then((res) => {
        console.log(res.data)
        setnewPassword("")
        setCurrentPassword("")
        setconfirmedPassword("")
      })
      .then(() => {
        window.open('/', "_self")
      })
      .catch((err) => {
        console.log("Error Occured in ", err)
      })
  }

  return (
    <div className="profile-body">
      <section className="profile-form">
        <h1 className="profile-heading">Profile</h1>
        <form action="/api/profile" method="POST" onSubmit={saveChanges}>
          <div className="int-area">
            <input type="text" name="user-name" value={user_name} onChange={(e) => { setName(e.target.value) }} autoComplete="off" required />
            <label>Name</label>
          </div>
          <div className="int-area">
            <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete="off" required />
            <label>Email</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              name="password"
              value={currentPassword}
              onChange={(e) => { setCurrentPassword(e.target.value) }}
              autoComplete="off"
              required
            />
            <label>Current Password</label>
          </div>
          <div className="int-area">
            <input
              type="password"
              name="new-password"
              value={newPassword}
              onChange={(e) => { setnewPassword(e.target.value) }}
              autoComplete="off"
              required
            />
            <label>New Password </label>
          </div>
          <div className="int-area">
            <input
              type="password"
              name="new-password-confirm"
              value={confirmedPassword}
              onChange={(e) => { setconfirmedPassword(e.target.value) }}
              autoComplete="off"
              required
            />
            <label>Confirm New Password</label>
          </div>
          <div className="btn-area">
            <button type="submit" onClick={(e) => { saveChanges(e) }}>Save Changes</button>
          </div>
        </form>
      </section>
    </div>
  );
}
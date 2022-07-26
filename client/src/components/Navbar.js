import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";
import axios from "axios";
import { MdNotificationsActive } from "react-icons/md";

function NavBar() {
  //renders navbar based on localstoragestate
  const LoggedIn = localStorage.getItem("isLoggedIn");

  const [name, setName] = useState();
  const [notification, setNotification] = useState();

  //fetch data from api using axios
  const getUsersProfile = function () {
    return axios
      .get("api/profile")
      .then((result) => {
        console.log(result.data)
        setName(result.data.user_name);
      })
      .catch((err) => {
        console.log("Error Occured =>", err);
      });
  };

  const loadMyListings = function () {
    axios
      .get("api/offerlist")
      .then((result) => {
        if (result.data.length === 0) {
          setNotification(false);
        } else {
          setNotification(true);
        }
      })
      .catch((err) => {
        console.log("Error Occured =>", err);
      });
  };

  //load usersProfile when rendering component
  useEffect(() => {
    getUsersProfile();
    loadMyListings();
  }, []);
  console.log("userloggedin =>", name);
  return (
    <Navbar
      className="nav-bar"
      style={{ paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
      variant="dark"
      fixed="top"
    >
      <Navbar.Brand className="logoname" href="/">
        SNEAKERSPICKERS
        {LoggedIn === "true" && <div className="username">Welcome! {name}</div>}
        {LoggedIn === "false" && <div className="username">Welcome! Guest</div>}
      </Navbar.Brand>

      <Nav className="ms-auto align-text-bottom ">
        <div className="nav-elms">
          {notification && (
            <a href="/offers">
              <MdNotificationsActive className="notificationIcon" />
            </a>
          )}
          <Nav.Link href="/" className="nav-options" >
            Home
          </Nav.Link>
          <Nav.Link href="/#scroll-about-us" className="nav-options">
            About us
          </Nav.Link>
          <Nav.Link href="/#scroll-contact-us" className="nav-options">
            Contact
          </Nav.Link>
          <Nav.Link href="/browse" className="nav-options">
            Browse
          </Nav.Link>
          {LoggedIn === "true" ? (
            <NavDropdown className="nav-options" title="My Profile">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/offers">My offers</NavDropdown.Item>
              <NavDropdown.Item href="/mylistings">
                My listings
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="/mymessages">
                My messages
              </NavDropdown.Item> */}
              <NavDropdown.Item href="/addalisting">
                Add a listing
              </NavDropdown.Item>
              <NavDropdown.Item href="/history">History</NavDropdown.Item>
              <NavDropdown.Item href="/logout"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link className="nav-options" href="/register">
                Register
              </Nav.Link>
              <Nav.Link className="nav-options" href="/login">
                Login
              </Nav.Link>
            </>
          )}
        </div>
      </Nav>
    </Navbar>
  );
}

export default NavBar;

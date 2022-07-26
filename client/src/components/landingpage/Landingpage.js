import React from "react";
import "./Landingpage.scss";
import landingbackground from "../images/landingbackground.mp4";
import tradingaboutus from "../images/aboutus-img4.jpeg";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import contactUs from "../images/contact-us-img.png";
import { IoLocationSharp } from "react-icons/io5";
import { IoPhonePortrait } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

function Landingpage() {
  return (
    <div className="catchbackground">
      <video controls autoPlay loop muted>
        <source src={landingbackground} type="video/mp4"></source>
      </video>

      <header className="viewport-header">
        <h1>Stop reselling and buying sneakers</h1>
        <h2 className="landing-h2">Sign up for trading</h2>
        <div className="mb-2 pt-5">
          <Button
            className="home-button"
            variant="secondary"
            size="lg"
            href="/register"
          >
            Sign up
          </Button>{" "}
        </div>
      </header>

      <div className="scroll-us" id="scroll-about-us"></div>
      <main>
        <article>
          <div className="about-us-description ">
            <div className="about-us-text">
              <h3 className="landingpage-h3">MAKE OFFERS NOW</h3>
              <h2>Stop reselling shoes, Trade them instead</h2>
              <span className="about-us-explanation">
                We know you have been reselling your shoes and browsing new
                pairs to buy. It is often tiresome to deal with the process. We
                will find you some other sneakerheads and let you simply trade
                with them.
              </span>
            </div>
            <span className="about-image">
              <img src={tradingaboutus} alt="about-img" className="about-image" />
            </span>
          </div>
        </article>

        <div
          className="contact-us-description scroll-contact"
          id="scroll-contact-us"
        >
          <img className="contact-us-img" src={contactUs} />
          <div className="contact-us-container">
            <div>
              <h1>CONTACT US</h1>
            </div>
            <div>
              <h2>
                <IoLocationSharp className="contact-us-icon" />
                Location
              </h2>
            </div>
            <div id="contact-us-text">12 Yonge Street</div>
            <div>
              <h2>
                <IoPhonePortrait className="contact-us-icon" />
                Phone
              </h2>
            </div>
            <div id="contact-us-text">+1647-686-1487</div>
            <div>
              <h2>
                <IoMail className="contact-us-icon" />
                E-mail
              </h2>
            </div>
            <div id="contact-us-text">simonhongseoupyun02156@gmail.com</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landingpage;

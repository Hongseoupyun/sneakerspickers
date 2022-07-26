import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Placeoffer.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import MyItems from "./MyItems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiBarefoot } from "react-icons/gi";
import tradeImg from "../images/trade.png";

function Placeoffer() {
  const { id } = useParams();
  const [offeredID, setOfferedID] = useState(null);
  const [listing, setListing] = useState([]);
  const [myListings, setMyListings] = useState([]);

  //Gets the listing from the selected listing
  function loadListing() {
    return axios.get(`/api/listeditem/${id}`).then((result) => {
      setListing(result.data[0]);
    });
  }

  //Gets all of user's listing to offer
  const loadMyListings = function () {
    return axios.get("/api/mylistings").then((result) => {
      setMyListings(result.data);
    });
  };

  const myListed = myListings.map((e) => {
    return (
      <MyItems
        key={e.id}
        name={e.name}
        brand={e.brand}
        size={e.size}
        description={e.description}
        preference={e.preference}
        image_url={e.image_url}
        id={e.id}
        setOfferedID={setOfferedID}
        offeredID={offeredID}
      />
    );
  });
  //success toast message
  const successToast = () => {
    toast("Offer placed successfully!", {
      className: "custom-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //error toast message
  const errorToast = () => {
    toast.error("Please select shoes", {
      className: "custom-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //loadlisting when rendering this component
  useEffect(() => {
    loadMyListings();
    loadListing();
  }, []);

  //sends axios post request using id from param, and offeredID from selected on myListed component
  const handleOffer = () => {
    if (offeredID === null) {
      errorToast();
    } else {
      return axios
        .post("/api/makeoffer", { listingID: Number(id), offeredID: offeredID })
        .then(() => {
          successToast();
        })
        .then(() => {
          setTimeout(() => window.open("/browse", "_self"), 1300);
        })
        .catch(() => {
          console.log("error");
        });
    }
  };

  return (
    <div className="placeoffer-body">
      {listing && myListings ? (
        <>
          <article className="placeoffers-cards">
            <ToastContainer autoClose={1300} />
            <div className="placeoffer-other-card">
              <img
                className="placeoffer-img"
                src={listing.image_url}
                alt="shoe-img"
              />
              <div className="placeoffer-name">{listing.name}</div>
              <div className="placeoffer-texts">
                <div className="placeoffer-pref">
                  <BsFillBookmarkHeartFill />
                  <span>Preference: {listing.preference}</span>
                </div>
                <div className="placeoffer-desc">
                  <MdDescription />
                  <span>{listing.description}</span>
                </div>
                <div className="placeoffer-brand-size">
                  <GiBarefoot /> {listing.brand}/Size: {listing.size}
                </div>
              </div>
            </div>

            <div className="placeoffer-tradeimg">
              <button
                className="placeoffer-button"
                id="button-offer"
                onClick={handleOffer}
              >
                Offer
              </button>
              <img className="tradeimg" src={tradeImg} alt="shoe-img" />
              <a href="/browse">
                <button className="placeoffer-button" id="button-cancel">
                  Cancel
                </button>
              </a>
            </div>

            <div className="myItem-container">{myListed}</div>
          </article>
        </>
      ) : (
        <div>No Data!</div>
      )}
    </div>
  );
}
export default Placeoffer;

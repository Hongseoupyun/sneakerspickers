import React, { useState, useEffect } from "react";
import "./Offers.scss";
import axios from "axios";
import MyOffers from "./MyOffers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Component path: Offer > MyOffers > OfferedItem
export default function Offers() {
  const [allMyOffers, setAllMyOffers] = useState([]);
  const [warning, setWarning] = useState();

  //Axios GET the user's listings that has an offer
  const loadMyOffers = function () {
    return axios.get("/api/offerlist").then((result) => {
      if (result.data.length === 0) {
        setWarning(true);
        setAllMyOffers(result.data);
      } else {
        setWarning(false);
        setAllMyOffers(result.data);
      }
    });
  };

  //Pass props to Myoffers component which will do another axios call to render the offered listing
  const showMyOffers = allMyOffers.map((e) => {
    return (
      <MyOffers
        key={e.id}
        name={e.name}
        brand={e.brand}
        size={e.size}
        description={e.description}
        image_url={e.image_url}
        offerid={e.offerid}
        preference={e.preference}
        wanted_item_id={e.listing_offer_made_to_id}
        offered_item_id={e.listing_being_offered_id}
      />
    );
  });

  useEffect(() => {
    loadMyOffers();
  }, []);

  const noOfferToast = () => {
    toast.error("You have no offers currently :(", {
      className: "custom-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="myoffers-body">
      {warning && noOfferToast()}
      <ToastContainer autoClose={4000} />
      {showMyOffers}
    </div>
  );
}

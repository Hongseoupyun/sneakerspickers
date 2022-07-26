import React, { useState, useEffect } from "react";
import "./AcceptedOffers.scss";
import axios from "axios";
import ForOffers from "./ForOffer";

//Component path: acceptedOffers > forOffer > byOffer
export default function Offers() {
  const [allMyOffers, setAllMyOffers] = useState([]);

  //Axios GET the user's listings that has an offer
  const loadMyOffers = function () {
    axios.get("/api/myacceptedoffers").then((result) => {
      setAllMyOffers(result.data);
      console.log("accepted offer",result.data)
    });
  };

  //Pass props to Myoffers component which will do another axios call to render the offered listing
  const showMyOffers = allMyOffers.map((e) => {
    return (
      <ForOffers
        key={e.id}
        name={e.name}
        brand={e.brand}
        size={e.size}
        description={e.description}
        image_url={e.image_url}
        id={e.id}
        wanted_item_id={e.listing_offer_made_to_id}
        offered_item_id={e.listing_being_offered_id}
      />
    );
  });

  useEffect(() => {
    loadMyOffers();
  }, []);

  return <body className="mylisting-body">{showMyOffers}</body>;
}

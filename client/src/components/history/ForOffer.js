import React, { useState, useEffect } from "react";

import tradeImg from "../images/trade.png";
import axios from "axios";
import ByOffer from "./ByOffer";
import { MdDescription } from "react-icons/md";
import { GiBarefoot } from "react-icons/gi";

//Component path: acceptedOffers > forOffer > byOffer
export default function ForOffers(props) {
  const [eachOffer, setEachOffer] = useState([]);

  //Axios post request to get the offered listing details using the listingID from props from Offer
  const loadEachOffer = function () {
    return axios
      .post("/api/myofferedproducts", {
        offeredid: props.offered_item_id,
        wantedID: props.wanted_item_id,
      })
      .then((result) => {
        setEachOffer(result.data);
      });
  };

  const showIndividual = eachOffer.map((e) => {
    return (
      <ByOffer
        key={e.id}
        name={e.name}
        brand={e.brand}
        size={e.size}
        description={e.description}
        image_url={e.image_url}
        id={e.id}
        user_name={e.user_name}
        email={e.email}
      />
    );
  });

  useEffect(() => {
    loadEachOffer();
  }, []);

  return (
    <section className="mylisting-container-history-left">
      <div className="myoffers-cards" id="left">
        <img className="history-img" src={props.image_url} alt="shoe-img" />
        <div className="listing-text-history">
          <h1>{props.name}</h1>
          <div className="myoffers-text">
            <MdDescription />
            {props.description}
          </div>
          <div className="myoffers-text">
            <GiBarefoot />
            {props.brand}/Size {props.size}
          </div>
        </div>
      </div>
      <div className="tradepic" id="history_trade_icon">
        <img src={tradeImg} alt="shoe-img" />
      </div>
      {showIndividual}
    </section>
  );
}

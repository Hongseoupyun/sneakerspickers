import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MyListings.scss";
import MyListingItem from "./MyListingItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [warning, setWarning] = useState();

  //fetch data from api
  const loadMyListings = function () {
    axios
      .get("api/mylistingsoffers")
      .then((result) => {
        if (result.data.length === 0) {
          setWarning(true);
          setListings(result.data);
        } else {
          setWarning(false);
          setListings(result.data);
        }
      })
      .catch((err) => {
        console.log("Error Occured in", err);
      });
  };

  //load my listings when rendering this component
  useEffect(() => {
    loadMyListings();
  }, []);

  //pass the data to MyListingsitem
  const eachListing = listings.map((e) => {
    return (
      <MyListingItem
        key={e.id}
        name={e.name}
        brand={e.brand}
        size={e.size}
        img={e.image_url}
        description={e.description}
        preference={e.preference}
        total_offers={e.total_offers}
      />
    );
  });

  const noListingToast = () => {
    toast.error("You have no listings currently :(", {
      className: "custom-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="mylisting-body">
      {warning && noListingToast()}
      <ToastContainer autoClose={4000} />
      {eachListing}
    </div>
  );
}

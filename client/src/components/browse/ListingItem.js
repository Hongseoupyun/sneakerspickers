import React from "react";
import "./ListingItem.scss";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListingItem(props) {
  const navigate = useNavigate();
  const { name, size, brand, description, preference, id, picture, setError } =
    props;

  //checks if the shoes belong to users logged in
  function verifyShoes(array) {
    if (array.find((e) => e.id === id)) {
      return true;
    }
  }

  function handleOffer() {
    axios
      .get("api/mylistings")
      .then((result) => {
        console.log(result.data);
        console.log(verifyShoes(result.data));
        if (verifyShoes(result.data)) {
          return setError("toast1")
        }
        if (result.data.length === 0) {
          return setError("toast2");
        } else {
          return navigate(`/placeoffer/${id}`);
        }
      })
      .catch((err) => {
        console.log(err.message, ",You should login probably");
        navigate("/login");
      });
  }

  return (
    <section className="browse-container">
      <img className="mylisting-img" src={picture} />
      <div className="mylisting-card-contents">
        <div className="listing-text" id="browse-name">
          <h1>{name}</h1>
        </div>
        <div className="listing-text" id="browse-pref">
          <BsFillBookmarkHeartFill className="" />
          <span>Preference: {preference}</span>
        </div>
        <div className="listing-text" id="brand-size-br">
          <div className="my-brand">{brand}</div>
          <div className="my-size">Size {size}</div>
        </div>
        <div className="listing-text" id="browse-desc">
          <MdDescription />
          <span>{description}</span>
        </div>
        <div className="make-offers">
          <button type="submit" onClick={handleOffer}>
            Make a Offer
          </button>
        </div>
      </div>
    </section>
  );
}

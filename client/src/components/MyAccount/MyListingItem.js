import React from "react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";

export default function MyListingItem(props) {
  const { name, description, brand, size, img, preference } = props;

  console.log("total offers:", props.total_offers);
  return (
    <section className="mylisting-container">
      <img className="mylisting-img" src={img} alt="shoe-img" />

      <div className="mylisting-card-contents">
        <div className="listing-text" id="name">
          <h1>{name}</h1>
        </div>
        <div className="listing-text" id="brand-size">
          <div className="my-brand">{brand}</div>
          <div className="my-size">Size {size}</div>
        </div>
        <div className="listing-text" id="pref">
          <BsFillBookmarkHeartFill />
          <span>Preference: {preference}</span>
        </div>
        <div className="listing-text" id="description">
          <MdDescription />
          <span>{description}</span>
        </div>
        <div className="view-offers">
          <a href="/offers">
            {" "}
            <button type="submit">View Offers</button>
          </a>
        </div>
        <div className="listing-text" id="offers">
          <button type="button" className="btn btn-primary">
            <span className="badge badge-light">{props.total_offers}</span>{" "}
            OFFERS
          </button>
        </div>
      </div>
    </section>
  );
}

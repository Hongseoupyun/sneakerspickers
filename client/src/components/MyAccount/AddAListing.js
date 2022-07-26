import React from "react";
import "./AddAListing.scss";
import addSneakers from "../images/sneakers2.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAListing() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    size: "",
    brand: "",
    description: "",
    img: "",
    preference: "",
  });

  //send data to api
  const uploadListing = function (e) {
    e.preventDefault();
    axios
      .post("api/listings", state )
      .then(() => {
        successToast();
      })
      .then(() => {
        setTimeout(() => navigate("/browse"), 1500);
      })
      .catch((err) => {
        console.log("Error occured in ", err);
      });
  };

  const successToast = () => {
    toast("Listing added successfully!", {
      className: "custom-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="add-body">
      <div className="master-container">
        <ToastContainer autoClose={1500} />
        <div>
          <img className="add-a-listing-img" name src={addSneakers} alt="shoe-img" />
        </div>
        <form className="form">
          <h3 className="form-heading">Upload your shoes to trade</h3>
          <div className="int-area">
            <input
              type="text"
              name="shoes-name"
              value={state.name}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
              autoComplete="off"
              required
            />
            <label>Name</label>
          </div>
          <div className="size-brand">
            <div>
              <select
                name="size"
                className="size"
                onChange={(e) => {
                  setState({ ...state, size: e.target.value });
                }}
              >
                <option value="4">Size 4</option>
                <option value="5">Size 5</option>
                <option value="6">Size 6</option>
                <option value="7">Size 7</option>
                <option value="8">Size 8</option>
                <option value="9">Size 9</option>
                <option value="10">Size 10</option>
                <option value="11">Size 11</option>
                <option value="12">Size 12</option>
              </select>
            </div>
            <div>
              <select
                name="brand"
                className="brand"
                onChange={(e) => {
                  setState({ ...state, brand: e.target.value });
                }}
              >
                <option value="Air Jordan">Air Jordan</option>
                <option value="Nike Dunks">Nike Dunks</option>
                <option value="Nike Air Force">Nike Air Force 1</option>
                <option value="Adidas Yeezy">Adidas Yeezy</option>
                <option value="New Balances">New balances</option>
                <option value="Vans/Converse">Vans/Converse</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div className="int-area">
            <input
              type="text"
              name="description"
              value={state.description}
              onChange={(e) => {
                setState({ ...state, description: e.target.value });
              }}
              autoComplete="off"
              required
            />
            <label>Description</label>
          </div>
          <div className="int-area">
            <input
              type="text"
              name="img-url"
              value={state.img}
              onChange={(e) => {
                setState({ ...state, img: e.target.value });
              }}
              autoComplete="off"
              required
            />
            <label>Image Url</label>
          </div>
          <div className="int-area">
            <input
              type="text"
              name="pref"
              value={state.preference}
              onChange={(e) => {
                setState({ ...state, preference: e.target.value });
              }}
              autoComplete="off"
              required
            />
            <label>Preference(eg.Nike Dunks Varisty red etc.)</label>
          </div>
          <div className="btn-area">
            <button
              type="submit"
              onClick={(e) => {
                uploadListing(e);
              }}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAListing;

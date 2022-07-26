import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Placeoffer.scss";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { GiBarefoot } from "react-icons/gi";
import classNames from "classnames";

function MyItems(props) {
  const handleClick = () => {
    props.setOfferedID(props.id);
  };

  const handleClass = classNames("my-shoes-card", {
    "shoes-selected": props.offeredID === props.id,
  });

  return (
    <div className={handleClass} onClick={handleClick} value={props.id}>
      <input
        type="image"
        id="css"
        className="my-shoes-img"
        src={props.image_url}
      />
      <div className="placeoffer-mylisting">
        <div className="my-shoes-name">{props.name}</div>
        <div className="my-shoes-pref">
          <BsFillBookmarkHeartFill /> {props.preference}
        </div>
        <div className="my-shoes-desc">
          <MdDescription /> {props.description}
        </div>
        <div className="my-shoes-size">
          <GiBarefoot />
          {props.brand}/Size: {props.size}
        </div>
      </div>
    </div>
  );
}

export default MyItems;

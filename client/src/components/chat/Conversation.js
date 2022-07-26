import React, { useEffect, useState } from "react";
import "./Conversation.scss";
import axios from "axios";

export default function Conversation(props) {
  const { offerId, setSelectedId, wanted_item_id, offered_item_id } = props;
  const [eachConversation, setEachConversation] = useState([]);

 //loads sellers'shoes info from accepted offers
  const loadEachConversation = function () {
    return axios
      .post("/api/myofferedproducts", {
        offeredid: offered_item_id,
        wantedID: wanted_item_id,
      })
      .then((result) => {
        setEachConversation(result.data);
      });
  };
  
  useEffect(() => {
    loadEachConversation();
  }, []);

  const conversation = eachConversation.map((e) => {
    return (
      <div
        className="conversation"
        onClick={() => {
          setSelectedId(offerId);
        }}
        key={e.id}
      >
        <img
          className="conversation-img"
          src={e.image_url}
          alt="conversation-img"
        />
        <div className="conversation-online-badge"></div>
        <span className="conversation-name">{e.name}</span>
      </div>
    );
  });

  return <>{conversation}</>;
}

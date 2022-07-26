import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Chatbar() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div id="chatbar-container" >
      <div id="conversation" >
        conversation

      </div>
      <div id="conversation" >
        conversation

      </div>
      <div id="conversation" >
        conversation

      </div>
    </div>
  )
}
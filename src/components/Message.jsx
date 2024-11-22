/* eslint-disable react/prop-types */

import "../css/Message.css";
import React from "react";


function Message({ selectedChat, text, sender, usuario, indice }) {
  function getAscii(letra){ 
    let ascii = `${letra.charCodeAt(0)}`
    if(ascii>100){
      ascii = ascii[1]+ascii[2]
      return ascii
    }
    return ascii    
  }
  return (
    <div className={`message ${sender === usuario ? "enviado" : "recibido"}`} >
      <p className="usuario-message" style={{color: `#${getAscii(selectedChat.messages.at(indice).at(0).at(0))}${getAscii(selectedChat.messages.at(indice).at(0).at(1))}${getAscii(selectedChat.messages.at(indice).at(0).at(2))}`}}>
        {selectedChat.participants.length>2?`${selectedChat.messages.at(indice).at(0)===usuario?"":selectedChat.messages.at(indice).at(0)} `:""}
      </p>
      <p>{text}</p>
    </div>
  );
}

export default Message;

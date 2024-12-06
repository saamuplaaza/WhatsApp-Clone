/* eslint-disable react/prop-types */

import "../css/Message.css";
import React from "react";


function Message({ selectedChatMessages, text, file, sender, usuario, indice, time }) {
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
      <div>
      <p className="usuario-message" style={{color: `#${getAscii(JSON.parse(selectedChatMessages.messages.at(indice)).sender.at(0))}${getAscii(JSON.parse(selectedChatMessages.messages.at(indice)).sender.at(1))}${getAscii(JSON.parse(selectedChatMessages.messages.at(indice)).sender.at(2))}`}}>
        {selectedChatMessages.participants.length>2?`${JSON.parse(selectedChatMessages.messages.at(indice)).sender===usuario?"":JSON.parse(selectedChatMessages.messages.at(indice)).sender} `:""}
      </p>
      {file?file.type.includes("image")?<img src={file.url} className="img-message"/>:<a href={file.url}>{file.url}</a>:""}
      
      <p>{text}</p>
      </div>
      <p className="time">{time}</p>
    </div>
  );
}

export default Message;

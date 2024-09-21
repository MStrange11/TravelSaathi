import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { ImFolderDownload } from "react-icons/im";
import { assets } from "../../assets/assets";

function Chats({ groups }) {

  return (
    // Chats main container
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">


      {/* Chats */}
      {groups.map((group, i) => {
        return (
          <Chat
            pp={assets.i2}
            contact={group.group_name}
          />
        );
      })}
    </div>
  );
}

export default Chats;

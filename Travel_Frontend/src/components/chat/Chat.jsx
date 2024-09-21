import React from "react";
import { useNavigate } from "react-router-dom";

function Chat({ pp, contact }) {
  const navigate = useNavigate()
  return (
    // Chat container
    <div
      className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 bg-gray-100`}
      onClick={() => { navigate(`/services/YourGroups/${contact}`) }}>
      {/* Profile picture */}
      <img
        src={pp}
        alt="profile_picture"
        className="rounded-full w-[50px] mr-5"
      />

      {/* Info container */}
      <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
        {/* Contact name*/}
        <div className="flex flex-col justify-between text-black">
          <h1 className="font-medium mb-1">{contact}</h1>
        </div>



      </div>
    </div>
  );
}

export default Chat;

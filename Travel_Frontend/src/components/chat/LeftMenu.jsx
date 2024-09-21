import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";
import RoundedBtn from "./Common/RoundedBtn";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../../assets/whatsapp";

function LeftMenu({ groups }) {

  const navigate = useNavigate()

  return (
    // LeftMenu container
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      {/* Profile nav */}
      <div className="flex justify-between items-center bg-[#00B4CC] h-[60px] p-3">
        {/* Profile picture */}
        <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" onClick={() => { navigate("/") }} />

        {/* Profile nav buttons */}
        <div className="flex justify-end w-[175px]">
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>




      {/* Chats */}
      <Chats groups={groups} />
    </div>
  );
}

export default LeftMenu;

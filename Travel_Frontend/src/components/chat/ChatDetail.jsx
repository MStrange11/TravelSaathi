import React, { useState, useEffect} from "react";
import Message from "./Message";
import RoundedBtn from "./Common/RoundedBtn";
// import { messagesData } from "../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { cs1, cs2 } from "../../assets/whatsapp";
import { getTime } from "../logic/whatsapp";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import axiosInstance from "../axiosInstance";


function ChatDetail() {
  const [currentUser, setCurrentUser] = useState(null)
  const [socket, setSocket] = useState(null)
  const { group_name } = useParams()
  const [inputValue, setInputValue] = useState('');

  function handleSendMessage() {
    if (socket && inputValue.trim()) {
      socket.send(JSON.stringify({
        message: inputValue,
        author: currentUser.username,
        group: group_name, // Optional: Include group name if needed
      }));
      setInputValue(''); // Clear the input field after sending the message
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior of adding a newline
      handleSendMessage();
    }
  }


  useEffect(() => {
    // Fetch the current user
    axiosInstance.get('currentuser/')
      .then(res => setCurrentUser(res.data))
      .catch(err => console.error("Failed to fetch current user:", err));
  }, []);
  useEffect(() => {
    // Set up WebSocket connection
    // const ws = new WebSocket(`ws://192.168.45.110:8000/ws/chatroom/${group_name}/`);
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${group_name}/`);

    ws.onopen = () => console.log('WebSocket connection established');
    ws.onclose = () => console.log('WebSocket connection closed');
    ws.onerror = (error) => console.error('WebSocket error', error);

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [group_name]); // Only depend on group_name


  return (
    // ChatDetail main container
    <div className="flex flex-col h-screen">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#00B4CC] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <img
            src={assets.i2}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-black-700 font-medium">{group_name}</h1>
          </div>
        </div>

      </div>

      {/* Messages section */}
      <div
        className="bg-[#ffffff] bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" }}
      >
          <Message
            group_name={group_name}
            currentUser={currentUser}
            socket={socket}
          />
        <div />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#00B4CC] w-100 h-[70px] p-2">

        {/* Input bar */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Type a message"
          className="bg-[#ffffff] rounded-lg outline-none text-sm w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
        />

        {/* Mic/Send btn */}
        <span>
          <RoundedBtn icon={<MdSend />} onClick={handleSendMessage} />

        </span>
      </div>
    </div>
  );
}

export default ChatDetail;

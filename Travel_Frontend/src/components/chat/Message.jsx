import React, { useEffect, useState } from "react";
import axiosInstance from '../axiosInstance'


function Message({ group_name, currentUser, socket }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages for the group
    axiosInstance.get(`/chat/${group_name}/`)
      .then(res => setMessages(res.data))
      .catch(err => console.error("Failed to fetch messages:", err));
    if (socket) {
      // Set up WebSocket message handling
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages(prevMessages => [...prevMessages, {
          author_username: data.author,
          body: data.message,
          author: data.author === currentUser?.username ? currentUser?.id : null
        }]);
      };
    }

    return () => {
      if (socket) {
        socket.onmessage = null; // Clean up WebSocket message handler
      }
    };
  }, [group_name, currentUser, socket]);
  return (
    // Message container
    <>
      {messages.slice().reverse().map((message, index) => {
        const sent = message.author === currentUser?.id;

        return (
          <div
            key={index}
            className={`items-center rounded-md w-fit my-1 ${sent ? "bg-[#00B4CC] flex justify-end ml-auto" : "bg-gray-200 flex justify-start"}`}
          >
            {/* Text (link/normal) message */}
            <div
              className="flex justify-between items-end max-w-[410px] p-2"
              style={{ wordBreak: "break-word" }}
            >
              {/* Normal text */}
              <p className={`${sent ? "text-white ml-auto" : "text-black mr-auto"} text-sm mr-2`}>
                {message.author_username} : {message.body}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Message;

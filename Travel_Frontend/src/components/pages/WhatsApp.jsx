import React, { useState, useEffect } from "react";
import LeftMenu from "../chat/LeftMenu";
import ChatDetail from "../chat/ChatDetail";
import axiosInstance from "../axiosInstance";


function WhatsApp() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([])
  useEffect(() => {
    axiosInstance.get('getgroups/').then(res => {
      setGroups(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    <>

      {/* // main app container */}
      <div className="ml-[45px] w-full h-screen overflow-hidden">
        {/* 2 components cointainer */}
        <div className="flex justify-start whatsapp-bp:justify-center items-center bg-white h-screen">
          {/* LeftMenu */}
          <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
            <LeftMenu
              groups={groups} />
          </div>

          {/* ChatDetail */}
          {/* <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
             <ChatDetail /> 
          </div> */}
        </div>
      </div>

    </>
  );
}

export default WhatsApp;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './axiosInstance';


const AccountPage = () => {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    // Fetch the current user
    axiosInstance.get('currentuser/')
      .then(res => setCurrentUser(res.data.username))
      .catch(err => console.error("Failed to fetch current user:", err));
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-6 mb-20 bg-white shadow-lg rounded-lg mt-40">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover border-2 border-gray-300"
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <p className="text-center font-semibold text-lg md:text-xl">{currentUser}</p>
      </div>





      {/* Links */}
      <div className="flex flex-col md:flex-row justify-center gap-4">

        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto text-center"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;

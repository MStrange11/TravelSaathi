import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/GoSolo.css"


const ProfileCard = ({ name, title, dates, description, verified, icon, src, onView, onAddFriend }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="relative">
        <img
          src={src} // Replace with your image source
          alt={title}
          className="rounded-t-lg object-cover h-48 w-full"
        />

        
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-500 mb-2">
          <i className={`fas fa-${icon} mr-2`}></i>
          <span>{name}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{dates}</p>
        <div className="flex flex-col items-center mt-4">
        <button
          onClick={onView}
          className="block mx-3 py-2 px-4 bg-[#00B4CC] text-white rounded-lg hover:bg-black hover:text-white focus:ring focus:ring-blue-200"
        >
          View
        </button>
      
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{profile.title}</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p><strong>Dates:</strong> {profile.dates}</p>
        <p><strong>Description:</strong> {profile.description}</p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:ring focus:ring-red-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const SearchProfiles = () => {
  const profiles = [
    {
      name: "John Doe",
      location: "Kohima",
      title: "Let's explore Nagaland",
      dates: "Aug 28, 2024 - Sep 4, 2024",
      description: "Want to explore Nagaland. Looking for a travel companion who can sponsor this trip.",
      verified: false,
      icon: "truck",
      src: "https://via.placeholder.com/300x200",
    },
    {
      name: "Jane Smith",
      location: "Sylhet",
      title: "Sylhet trip",
      dates: "Aug 30, 2024 - Aug 31, 2024",
      description: "Join me on an epic adventure exploring the captivating city of Sylhet in Bangladesh.",
      verified: true,
      icon: "baby-carriage",
      src: "https://via.placeholder.com/300x200",

    },
    {
      name: "Alex Johnson",
      location: "Bali",
      title: "10 days in Bali",
      dates: "Sep 1, 2024 - Sep 15, 2024",
      description: "Who would like to be my partner for 5 days in Bali and 5 days in Phuket?",
      verified: false,
      icon: "umbrella-beach",
      src: "https://via.placeholder.com/300x200",

    },
    {
      name: "Emma Lee",
      location: "Tajikistan",
      title: "Tajikistan visit",
      dates: "Sep 10, 2024 - Sep 15, 2024",
      description: "Find someone to explore Tajikistan.",
      verified: false,
      icon: "mountain",
      src: "https://via.placeholder.com/300x200",

    },
  ];
  const [incomingData, setIncomingData] = useState(profiles)
  const [filterData, setFilterData] = useState(incomingData)
  const [searchTag, setSearchTag] = useState("")
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function changeHandler(e) {
    setSearchTag(e.target.value)
  }
  function search() {
    const filteredData = incomingData.filter(item => item.name.toLowerCase().includes(searchTag.toLowerCase()))
    setFilterData(filteredData)
  }

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  
  return (
    <section className=" px-24 bg-white max-md:px-5 h-screen pt-36">
      <div className="wrap">
        <div className="search">
          <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={changeHandler} />
          <button type="submit" className="searchButton" onClick={search}>
            <i className="fa fa-search search-icon"></i>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-4 pt-8">
        {filterData.map((profile, index) => (
          <ProfileCard
            key={index}
            {...profile}
            onView={() => handleViewProfile(profile)}
            onAddFriend={() => handleAddFriend(profile)}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} profile={selectedProfile} />
    </section>
  );
};

export default SearchProfiles;

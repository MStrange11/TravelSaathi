import React, { useState } from "react";
import "../components/css/GoSolo.css";
import { assets } from '../assets/assets'
import axiosInstance from "../components/axiosInstance";

function GoGroup() {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ group_name: '', location: '' });
  const [location, setLocation] = useState('');

  // Search for groups based on location
  const handleSearch = async () => {
    setLoading(true); // Start loading state
    try {
      const search = await axiosInstance.post('searchgroups/', { location });
      setGroups(search.data); // Set groups data from backend response
    } catch (error) {
      console.error('Error searching for groups:', error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Open the modal for creating a group
  const handleCreateGroup = () => {
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle form changes for the new group
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the new group to the backend
  const handleSubmitNewGroup = async () => {

    newGroup.group_name = newGroup.group_name.replace(' ', '_')
    console.log(newGroup);

    try {
      // Create the group via API call
      const response = await axiosInstance.post('addgroup/', newGroup);
      console.log('New group created:', response.data);

      // Add the new group to the list in the frontend
      setGroups((prevGroups) => [...prevGroups, response.data]);

      // Close the modal after successful creation
      setShowModal(false);
    } catch (error) {
      console.error('Error creating new group:', error);
    }
  };

  // Handle joining a group
  const handleJoinGroup = async (groupId) => {
    try {
      const response = await axiosInstance.post('joingroup/', { group_id: groupId });
      console.log('Joined group:', response.data);
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <section className="bg-white max-md:pl-5 max-h-192 pt-36 h-screen">
      <div className="wrap">
        <div className="search">
          <div className="searchbar">
            <input
              type="search"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={(e) => setLocation(e.target.value)} // Update location state
            />
            <button type="submit" className="searchButton" onClick={handleSearch}>
              <i className="fa fa-search search-icon"></i>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCreateGroup}
              className="ml-10 w-28 py-2 bg-[#00B4CC] text-white rounded-lg hover:bg-black hover:text-white"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>

      {/* Display Groups */}
      {loading ? (
        <div className="text-center mt-6">Loading...</div>
      ) : (
        <div className="overflow-scroll w-full h-3/4 px-10 pt-[91px] pb-[76px] justify-center items-center">
          {groups.length > 0 ? (
            <ul className="space-y-4">
              {groups.map((group) => (
                <li key={group.group_name} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                  <div className="flex items-center">
                    <img
                      src={assets.i2}
                      alt={`${group.group_name} profile`}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{group.group_name}</h3>
                    </div>
                    <div>
                      <h3 className="text-lg ml-10">{group.location}</h3>
                    </div>
                  </div>
                  <button
                    className="flex py-2 px-4 bg-[#00B4CC] text-white rounded-lg hover:bg-black hover:text-white"
                    onClick={() => handleJoinGroup(group.id)} // Pass group id to the join function
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">No groups found for this location.</div>
          )}
        </div>
      )}

      {/* Modal for Creating New Group */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
            <input
              type="text"
              name="group_name"
              value={newGroup.group_name}
              onChange={handleFormChange}
              placeholder="Group Name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              name="location"
              value={newGroup.location}
              onChange={handleFormChange}
              placeholder="Location"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="flex justify-between">
              <button
                className="py-2 px-4 bg-[#00B4CC] text-white rounded-lg hover:bg-black hover:text-white"
                onClick={handleSubmitNewGroup}
              >
                Create Group
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-black hover:text-white"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GoGroup;

import React from 'react';
import Navbar from './Navbar';

const UpdateProfile = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 mb-20 bg-white shadow-lg rounded-lg mt-40">
      <form className="bg-gray-100 p-6 rounded-lg shadow-md">
        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Profile Picture:</label>
          <input type="file" className="border p-2 rounded w-full" />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Bio:</label>
          <textarea
            className="border p-2 rounded w-full"
            placeholder="Enter your bio..."
            rows="4"
          ></textarea>
        </div>

        {/* Travel Preferences */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Travel Preferences:</label>
          <select className="border p-2 rounded w-full">
            <option value="location">Location</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city">City</option>
          </select>
        </div>

        {/* People Preferences */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">People Preferences:</label>
          <select className="border p-2 rounded w-full">
            <option value="solo">Solo</option>
            <option value="group">Group</option>
          </select>
        </div>

        {/* Username, First Name, Last Name */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username:</label>
            <input type="text" className="border p-2 rounded w-full" placeholder="Username" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">First Name:</label>
            <input type="text" className="border p-2 rounded w-full" placeholder="First Name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name:</label>
            <input type="text" className="border p-2 rounded w-full" placeholder="Last Name" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;

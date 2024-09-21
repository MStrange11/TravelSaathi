import React, { useState } from 'react';

const ViewFriends = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ]);

  const [pendingFriends, setPendingFriends] = useState([
    { id: 3, name: 'Chris Evans' },
  ]);

  const [blockedFriends, setBlockedFriends] = useState([
    { id: 4, name: 'Tom Hardy' },
  ]);

  const handleAcceptFriend = (friend) => {
    setPendingFriends((prev) => prev.filter((f) => f.id !== friend.id));
    setAcceptedFriends((prev) => [...prev, friend]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20 bg-white mt-36 shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Friends</h2>
      <table className="table-auto w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 py-2">Accepted</th>
            <th className="border-b-2 py-2">Pending</th>
            <th className="border-b-2 py-2">Blocked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Accepted Friends */}
            <td className="border-b py-2">
              {acceptedFriends.length > 0 ? (
                acceptedFriends.map((friend) => (
                  <div key={friend.id} className="py-2">
                    {friend.name}
                  </div>
                ))
              ) : (
                <div className="py-2">No accepted friends.</div>
              )}
            </td>

            {/* Pending Friends */}
            <td className="border-b py-2">
              {pendingFriends.length > 0 ? (
                pendingFriends.map((friend) => (
                  <div key={friend.id} className="py-2 flex items-center justify-center space-x-4">
                    <span>{friend.name}</span>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleAcceptFriend(friend)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-2">No pending friends.</div>
              )}
            </td>

            {/* Blocked Friends */}
            <td className="border-b py-2">
              {blockedFriends.length > 0 ? (
                blockedFriends.map((friend) => (
                  <div key={friend.id} className="py-2">
                    {friend.name}
                  </div>
                ))
              ) : (
                <div className="py-2">No blocked friends.</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewFriends;

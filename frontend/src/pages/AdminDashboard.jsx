import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import useApi from "../hooks/useApi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  // Fetch data for each tab
  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
    refetch: refetchUsers,
  } = useFetch("http://localhost:8000/api/v1/admin/users");

  const {
    data: hotels,
    loading: loadingHotels,
    error: errorHotels,
    refetch: refetchHotels,
  } = useFetch("http://localhost:8000/api/v1/admin/hotels");

  const {
    data: rooms,
    loading: loadingRooms,
    error: errorRooms,
    refetch: refetchRooms,
  } = useFetch("http://localhost:8000/api/v1/admin/rooms");

  const { deleteData } = useApi();

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteData(`http://localhost:8000/api/v1/admin/users/${id}`);
      refetchUsers();
    }
  };

  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      await deleteData(`http://localhost:8000/api/v1/admin/hotels/${id}`);
      refetchHotels();
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await deleteData(`http://localhost:8000/api/v1/admin/rooms/${id}`);
      refetchRooms();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "hotels" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("hotels")}
        >
          Hotels
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "rooms" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("rooms")}
        >
          Rooms
        </button>
      </div>

      {activeTab === "users" && (
        <div>
          {loadingUsers && <p>Loading users...</p>}
          {errorUsers && <p className="text-red-600">{errorUsers.message}</p>}
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Admin</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{user.username}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {user.isAdmin ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "hotels" && (
        <div>
          {loadingHotels && <p>Loading hotels...</p>}
          {errorHotels && <p className="text-red-600">{errorHotels.message}</p>}
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels &&
                hotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td className="border px-4 py-2">{hotel.name}</td>
                    <td className="border px-4 py-2">{hotel.city}</td>
                    <td className="border px-4 py-2">{hotel.type}</td>
                    <td className="border px-4 py-2">${hotel.cheapestPrice}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteHotel(hotel._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "rooms" && (
        <div>
          {loadingRooms && <p>Loading rooms...</p>}
          {errorRooms && <p className="text-red-600">{errorRooms.message}</p>}
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Max People</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms.map((room) => (
                  <tr key={room._id}>
                    <td className="border px-4 py-2">{room.title}</td>
                    <td className="border px-4 py-2">${room.price}</td>
                    <td className="border px-4 py-2">{room.maxPeople}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteRoom(room._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

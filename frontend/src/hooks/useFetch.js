
import React, { useState, useEffect, useCallback } from 'react';

// // This is a minimal React component structure to demonstrate the custom hooks.
// // In a real application, you would separate concerns into multiple components.
// export default function App() {
//   const [newHotelData, setNewHotelData] = useState({
//     name: '',
//     type: '',
//     city: '',
//     address: '',
//     distance: '',
//     title: '',
//     desc: '',
//     cheapestPrice: 0,
//     featured: false,
//     rating: 0,
//     photos: []
//   });

//   const { hotels, loading: fetchLoading, error: fetchError, refetch } = useFetch('http://localhost:8800/api/v1/hotels');
//   const { data, loading: apiLoading, error: apiError, postData } = useApi('http://localhost:8800/api/v1/hotels');

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewHotelData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Handle form submission to create a new hotel
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await postData(newHotelData);
//       // After successful creation, refetch the list of hotels
//       refetch();
//       // Clear the form
//       setNewHotelData({
//         name: '',
//         type: '',
//         city: '',
//         address: '',
//         distance: '',
//         title: '',
//         desc: '',
//         cheapestPrice: 0,
//         featured: false,
//         rating: 0,
//         photos: []
//       });
//     } catch (err) {
//       console.error('Failed to create hotel:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Hotel Management Dashboard</h1>

//         {/* Create Hotel Form */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create New Hotel</h2>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input
//               type="text"
//               name="name"
//               placeholder="Hotel Name"
//               value={newHotelData.name}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={newHotelData.city}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <input
//               type="text"
//               name="type"
//               placeholder="Type (e.g., hotel, apartment)"
//               value={newHotelData.type}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={newHotelData.address}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <input
//               type="text"
//               name="distance"
//               placeholder="Distance (e.g., 1.5km)"
//               value={newHotelData.distance}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={newHotelData.title}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <textarea
//               name="desc"
//               placeholder="Description"
//               value={newHotelData.desc}
//               onChange={handleChange}
//               rows="3"
//               className="col-span-1 md:col-span-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             ></textarea>
//             <input
//               type="number"
//               name="cheapestPrice"
//               placeholder="Cheapest Price"
//               value={newHotelData.cheapestPrice}
//               onChange={handleChange}
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               required
//             />
//             <input
//               type="number"
//               name="rating"
//               placeholder="Rating (0-5)"
//               value={newHotelData.rating}
//               onChange={handleChange}
//               min="0"
//               max="5"
//               step="0.1"
//               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//             />
//             <div className="col-span-1 md:col-span-2 flex items-center">
//               <input
//                 type="checkbox"
//                 name="featured"
//                 checked={newHotelData.featured}
//                 onChange={handleChange}
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="featured" className="ml-2 text-gray-700">Featured Hotel</label>
//             </div>
//             <button
//               type="submit"
//               disabled={apiLoading}
//               className="col-span-1 md:col-span-2 w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
//             >
//               {apiLoading ? 'Creating...' : 'Create Hotel'}
//             </button>
//           </form>
//           {data && (
//             <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
//               <p>Hotel created successfully! ID: {data._id}</p>
//             </div>
//           )}
//           {apiError && (
//             <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
//               <p>Error creating hotel: {apiError.message}</p>
//             </div>
//           )}
//         </div>

//         {/* Display Hotels Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hotel List</h2>
//           {fetchLoading && <p className="text-gray-500">Loading hotels...</p>}
//           {fetchError && <p className="text-red-500">Error fetching hotels: {fetchError.message}</p>}
//           {hotels.length > 0 ? (
//             <ul className="space-y-4">
//               {hotels.map(hotel => (
//                 <li key={hotel._id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                   <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
//                   <p className="text-gray-600"><strong>City:</strong> {hotel.city}</p>
//                   <p className="text-gray-600"><strong>Type:</strong> {hotel.type}</p>
//                   <p className="text-gray-600"><strong>Price:</strong> ${hotel.cheapestPrice}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             !fetchLoading && <p className="text-gray-500">No hotels found. Create one above!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/**
 * Custom hook for making GET requests.
 * @param {string} url The API endpoint URL.
 * @returns {{data: any[], loading: boolean, error: Error | null, refetch: () => void}}
 */
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch
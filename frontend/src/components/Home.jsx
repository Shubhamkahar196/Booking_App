import React from 'react';

import { useNavigate } from "react-router-dom";
import HotelCard from './HotelCard';
import { Loader2, AlertCircle } from 'lucide-react';

function Home({ loading, error, filteredHotels, searchTerm, setSearchTerm, dateRange, setDateRange, theme }) {
  const handleSearch = (e) => {
    e.preventDefault();
  };


  const navigate = useNavigate();

  const handleHotelClick = (hotel) => {
    navigate(`/hotel/${hotel._id}`, { state: { hotel } });
  };

  return (
    <>
      {/* Hero Section with Search Bar */}
      <header
        className={`relative text-center rounded-2xl shadow-xl mb-12 flex flex-col items-center justify-center p-4 transition-all duration-500 bg-indigo-600 md:h-96`}
      >
        <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>
        <div className="relative z-10 w-full max-w-2xl text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg md:text-xl mb-6 font-light">
            Search for hotels, resorts, and more.
          </p>
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by city, hotel name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:flex-2 p-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />

            {/* Check-in Date */}
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full md:flex-1 p-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />

            {/* Check-out Date */}
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full md:flex-1 p-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-1/5 px-6 py-3 rounded-xl font-bold bg-white text-indigo-600 shadow-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Search
            </button>
          </form>


        </div>
      </header>


      {/* Hotel Cards Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Hotels</h2>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="animate-spin text-indigo-500" />
            <p className="mt-4 text-lg text-gray-500">Loading hotels...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-red-500">
            <AlertCircle size={48} />
            <p className="mt-4 text-lg text-center">
              Oops! Something went wrong.
              <br />
              Please try again later.
            </p>
          </div>
        )}

        {!loading && !error && filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                onClick={() => handleHotelClick(hotel)}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-center text-gray-500">No hotels found. Try a different search term.</p>
        )}
      </section>
    </>
  );
}

export default Home;

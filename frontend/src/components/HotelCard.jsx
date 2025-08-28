import { Star, MapPin } from "lucide-react";

// Hotel Card Component
function HotelCard({ hotel, onClick, theme}) {
  // const theme = theme;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
    >
      <img
        src={hotel.photos[0] || "https://placehold.co/600x400"}
        alt={hotel.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold truncate">{hotel.name}</h3>
          <span className="text-sm font-semibold px-2 py-1 rounded-full bg-indigo-200 text-indigo-700">
            ${hotel.cheapestPrice}
          </span>
        </div>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4 truncate`}>
          <MapPin className="inline-block mr-2 w-4 h-4" />
          {hotel.city} - {hotel.distance} from center
        </p>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(hotel.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className={`text-sm font-semibold ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {hotel.rating} Rating
          </span>
        </div>
      </div>
    </div>
  );
}

export default HotelCard
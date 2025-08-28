import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { X, MapPin, Star, Bed } from "lucide-react";
import Modal from "../components/Modal";

function HotelDetail({ dateRange, theme, isLoggedIn }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(location.state?.hotel || null);
  const [selectedImage, setSelectedImage] = useState(null); // NEW
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [guests, setGuests] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (!hotel) {
      fetch(`http://localhost:8000/api/v1/hotels/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setHotel(data);
          setSelectedImage(data.photos?.[0]); // default to first photo
        })
        .catch((err) => console.error(err));
    } else {
      setSelectedImage(hotel.photos?.[0]); // also handle when coming from state
    }
  }, [id, hotel]);

  const requireLoginHandler = (actionName) => {
    setSnackbarMessage(`Please log in to ${actionName}.`);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleBookingClick = () => {
    if (!isLoggedIn) return requireLoginHandler("book a hotel");
    setShowBookingForm(true);
  };

  const handleContactClick = () => {
    if (!isLoggedIn) return requireLoginHandler("contact the hotel");
    setShowContactForm(true);
  };


  // ... booking & contact handlers ...
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', {
      hotel: hotel.name,
      dates: dateRange,
      guests: guests
    });
    setShowBookingForm(false);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000); // Hide snackbar after 3 seconds
  };

  // Handle form submission for contact
  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted');
    setShowContactForm(false);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000); // Hide snackbar after 3 seconds
  };

  if (!hotel) return <p>Loading hotel details...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`p-8 rounded-2xl shadow-xl transition-colors duration-500 ${theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
      >
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-extrabold">{hotel.name}</h1>
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full text-gray-500 hover:text-indigo-500 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Images Section */}
        <div className="mb-8">
          <div className="relative">
            {/* Main Image */}
            <img
              src={selectedImage || "https://placehold.co/1200x800"}
              alt={hotel.name}
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />

            {/* Thumbnails */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
              {hotel.photos?.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(photo)} // <-- CLICK HANDLER
                  className={`w-16 h-12 bg-cover bg-center rounded-lg border-2 cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedImage === photo ? "border-indigo-500" : "border-white"
                    }`}
                  style={{ backgroundImage: `url(${photo})` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{hotel.title}</h2>
            <p
              className={`text-gray-500 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                } mb-6`}
            >
              {hotel.desc}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="text-indigo-500 mr-2 w-4 h-4" />
                <span
                  className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {hotel.address}
                </span>
              </li>
              <li className="flex items-center">
                <Star className="text-yellow-400 fill-yellow-400 mr-2 w-4 h-4" />
                <span
                  className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {hotel.rating?.toFixed(1)}/5 rating
                </span>
              </li>
              <li className="flex items-center">
                <Bed className="text-indigo-500 mr-2 w-4 h-4" />
                <span
                  className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  Rooms available: {hotel.rooms?.length}
                </span>
              </li>
            </ul>
          </div>

          <div
            className={`p-6 rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
          >
            <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Check-in</label>
                <input
                  type="date"
                  value={dateRange.start}
                  className={`p-3 rounded-lg ${theme === "dark"
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-800"
                    }`}
                  readOnly
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Check-out</label>
                <input
                  type="date"
                  value={dateRange.end}
                  className={`p-3 rounded-lg ${theme === "dark"
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-800"
                    }`}
                  readOnly
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold">Guests</label>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className={`p-3 rounded-lg ${theme === "dark"
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-800"
                    }`}
                />
              </div>
              <div className="text-center font-bold text-lg">
                ${hotel.cheapestPrice} per night
              </div>
              <button
                onClick={handleBookingClick}
                className="w-full py-3 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200 shadow-md"
              >
                Check Availability
              </button>
              <button
                onClick={handleContactClick}
                className={`w-full py-3 rounded-full font-bold border-2 ${theme === "dark" ? "border-gray-500 text-gray-300" : "border-gray-300 text-gray-700"
                  } hover:bg-gray-200 transition-colors duration-200`}
              >
                Contact Hotel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <Modal title="Complete Your Booking" onClose={() => setShowBookingForm(false)}>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Full Name</label>
              <input type="text" className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Email</label>
              <input type="email" className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Dates</label>
              <div className="flex space-x-2">
                <input type="date" value={dateRange.start} readOnly className={`w-1/2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} />
                <input type="date" value={dateRange.end} readOnly className={`w-1/2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Number of Guests</label>
              <input type="number" value={guests} readOnly className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} />
            </div>
            <button type="submit" className="w-full py-3 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
              Confirm Booking
            </button>
          </form>
        </Modal>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <Modal title="Contact Hotel" onClose={() => setShowContactForm(false)}>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Your Name</label>
              <input type="text" className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Your Email</label>
              <input type="email" className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} required />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Message</label>
              <textarea rows="4" className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`} required></textarea>
            </div>
            <button type="submit" className="w-full py-3 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
              Send Message
            </button>
          </form>
        </Modal>
      )}
      {/* Snackbar/Notification */}
      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg transition-transform duration-300">
          {snackbarMessage}
        </div>
      )}

    </div>
  );
}

export default HotelDetail;
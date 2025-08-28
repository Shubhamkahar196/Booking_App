import React, { useState } from "react";

export default function ContactPage({ theme }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  return (
    <div className={`max-w-3xl mx-auto p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"} rounded-2xl shadow-lg`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="mb-6 text-center text-gray-500">
        Have questions or feedback? Fill out the form below and we’ll get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900"}`}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900"}`}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Message</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900"}`}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-full font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200"
        >
          Send Message
        </button>
      </form>

      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg">
          Message sent successfully!
        </div>
      )}
    </div>
  );
}

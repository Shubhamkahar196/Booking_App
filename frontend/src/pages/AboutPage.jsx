import React from "react";
import { Instagram } from "lucide-react";

function AboutPage({ theme }) {
  return (
    <div className={`min-h-screen py-12 px-4 md:px-8 transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6">About Hotelio</h1>
        <p className="text-lg mb-6">
          Welcome to <span className="font-semibold">Hotelio</span> – your go-to app for finding and booking the best hotels quickly and easily. We aim to make your travel planning seamless and enjoyable.
        </p>

        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-lg mb-4">
          Hi! I'm <span className="font-semibold">Shiva</span>. I'm the developer behind this app. I love creating user-friendly and modern web applications that solve real problems.
        </p>

        <p className="text-lg mb-6">
          Follow me on Instagram for updates, projects, and tips:{" "}
          <a
            href="https://instagram.com/shivamsinghamrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 font-semibold inline-flex items-center hover:underline"
          >
            <Instagram size={20} className="mr-1" /> @shivamsinghamrajput
          </a>
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-2">
            <li>Search hotels by name or city</li>
            <li>View detailed hotel information with images</li>
            <li>Book hotels securely</li>
            <li>Contact hotels directly through the app</li>
            <li>Supports dark and light themes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
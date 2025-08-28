import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function Modal({ title = 'Modal', onClose = () => {}, children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isDarkMode = document.body.classList.contains('bg-gray-900');
      setTheme(isDarkMode ? 'dark' : 'light');
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300">
      <div className={`relative p-6 rounded-2xl shadow-2xl max-w-lg w-full transition-transform duration-300 transform scale-95 md:scale-100 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

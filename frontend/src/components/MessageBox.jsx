import { useEffect } from "react";
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * @description Renders a modal message box for success or error feedback.
 * @param {{message: string, type: 'success'|'error', onClose: () => void}} props - Props for the component.
 */
export const MessageBox = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const icon = type === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-xl text-white font-medium flex items-center space-x-2 z-50 transition-all duration-300 ${bgColor}`}
      style={{ animation: 'slideIn 0.3s forwards' }}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

// src/components/Message.js
import React from 'react';

const Message = ({ isOpen, onClose, responseData, titleData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{titleData}</h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-gray-700 leading-relaxed">{responseData}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full w-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Message;
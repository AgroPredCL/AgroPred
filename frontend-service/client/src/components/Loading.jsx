// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ open, texto }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg w-80 h-24 flex justify-center items-center">
        <button
          type="button"
          className="flex items-center bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          disabled
        >
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          {texto}...
        </button>
      </div>
    </div>
  );
};

export default LoadingSpinner;

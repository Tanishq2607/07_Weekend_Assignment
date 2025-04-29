import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    className={`font-medium bg-green-800 hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-white py-2 px-6 rounded-md transition duration-200 ${className} ${disabled ? 'opacity-60 bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''
      }`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
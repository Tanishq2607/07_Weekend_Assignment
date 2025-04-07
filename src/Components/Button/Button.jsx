import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded ${className}`}
  >
    {children}
  </button>
);

export default Button;
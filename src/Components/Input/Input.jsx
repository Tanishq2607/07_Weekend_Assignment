import React from 'react';

const Input = ({ type = 'text', value, onChange, name, placeholder, error, id }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      id={id || name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-200"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;
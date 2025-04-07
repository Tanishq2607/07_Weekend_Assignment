import React from 'react';

const Input = ({ type = 'text', value, onChange, name, placeholder, error }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;
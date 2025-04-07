import React from 'react';

const Textarea = ({ label, value, onChange, name, placeholder, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor={name}>{label}</label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full p-2 border rounded"
    ></textarea>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Textarea;
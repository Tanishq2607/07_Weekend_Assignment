import React from 'react';

const Textarea = ({ label, value, onChange, name, placeholder, error }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor={name}>
        {label}
      </label>
    )}
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-200 resize-y min-h-[120px]"
    ></textarea>
    {error && (
      <p className="text-red-500 text-sm mt-1.5 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

export default Textarea;
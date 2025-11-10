
import React from 'react';

const Input = ({ 
  type = 'text', 
  name, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false 
}) => {
  const inputId = name ? `input-${name}` : `input-generic`;

  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
r
        aria-invalid={!!error} 
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <p id={`${inputId}-error`} className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
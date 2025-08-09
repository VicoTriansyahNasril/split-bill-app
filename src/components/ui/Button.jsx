// File: src/components/ui/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', ...props }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
// File: src/components/ui/ToggleSwitch.jsx
import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ options, selected, onSelect, size = 'normal' }) => (
  <div className={`toggle-switch ${size}`}>
    {options.map(opt => (
      <button
        key={opt.value}
        className={selected === opt.value ? 'active' : ''}
        onClick={() => onSelect(opt.value)}
        type="button"
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default ToggleSwitch;
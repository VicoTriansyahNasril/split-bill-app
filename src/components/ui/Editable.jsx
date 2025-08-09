// File: src/components/ui/Editable.jsx
import React, { useState, useEffect } from 'react';
import { useBill } from '../../context/BillContext';
import './Editable.css';

const Editable = ({ id, type, value, displayTransform, inputType = 'text', className = '' }) => {
  const { editingTarget, setEditingTarget, saveEdit } = useBill();
  const [currentValue, setCurrentValue] = useState(value);

  const isEditing = editingTarget?.id === id && editingTarget?.type === type;

  useEffect(() => {
    setCurrentValue(String(value));
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      saveEdit(id, type, currentValue);
      setEditingTarget(null);
    }
  };

  const handleBlur = () => {
    saveEdit(id, type, currentValue);
    setEditingTarget(null);
  };

  if (isEditing) {
    return (
      <input
        className="edit-input"
        type={inputType}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoFocus
        onFocus={(e) => e.target.select()}
      />
    );
  }

  return (
    <span
      className={`editable-wrapper ${className}`}
      onDoubleClick={() => setEditingTarget({ id, type })}
    >
      {displayTransform ? displayTransform(value) : value}
    </span>
  );
};

export default Editable;
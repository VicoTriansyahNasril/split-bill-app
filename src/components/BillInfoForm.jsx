// File: src/components/BillInfoForm.jsx
import React from 'react';
import { useBill } from '../context/BillContext';
import { formatNumberInput, parseFormattedNumber } from '../utils/formatter';
import Card from './ui/Card';
import Input from './ui/Input';
import '../components/ui/ToggleSwitch.css';
import './FormStyles.css';

const ToggleSwitch = ({ options, selected, onSelect }) => (
  <div className="toggle-switch">
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

const BillInfoForm = () => {
  const { tax, setTax, serviceCharge, setServiceCharge } = useBill();
  const options = [{ label: '%', value: 'percent' }, { label: 'Rp', value: 'amount' }];

  const handleValueChange = (setter, state, newValue) => {
    const parsedValue = parseFormattedNumber(newValue);
    setter({ ...state, value: parsedValue });
  };
  
  const handleTypeChange = (setter, state, newType) => {
    setter({ ...state, type: newType, value: 0 });
  };

  return (
    <Card>
      <h2>Info Biaya Tambahan</h2>
      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="tax">Pajak</label>
          <div className="input-with-button">
            <Input
              id="tax"
              type="text"
              inputMode="numeric"
              value={formatNumberInput(String(tax.value))}
              onChange={(e) => handleValueChange(setTax, tax, e.target.value)}
            />
            <ToggleSwitch
              options={options}
              selected={tax.type}
              onSelect={(type) => handleTypeChange(setTax, tax, type)}
            />
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="serviceCharge">Service</label>
          <div className="input-with-button">
            <Input
              id="serviceCharge"
              type="text"
              inputMode="numeric"
              value={formatNumberInput(String(serviceCharge.value))}
              onChange={(e) => handleValueChange(setServiceCharge, serviceCharge, e.target.value)}
            />
            <ToggleSwitch
              options={options}
              selected={serviceCharge.type}
              onSelect={(type) => handleTypeChange(setServiceCharge, serviceCharge, type)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BillInfoForm;
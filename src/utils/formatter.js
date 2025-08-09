// File: src/utils/formatter.js

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatNumberInput = (value) => {
  if (!value) return '';
  const numericValue = value.replace(/\D/g, '');
  return new Intl.NumberFormat('id-ID').format(numericValue);
};

export const parseFormattedNumber = (formattedValue) => {
  if (!formattedValue) return 0;
  return Number(formattedValue.replace(/\D/g, ''));
};
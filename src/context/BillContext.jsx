// File: src/context/BillContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { parseFormattedNumber } from '../utils/formatter';

const BillContext = createContext();

const defaultState = {
  people: [],
  items: [],
  tax: { type: 'percent', value: 11 },
  serviceCharge: { type: 'percent', value: 5 },
};

const loadState = () => {
  const savedState = localStorage.getItem('billState');
  if (!savedState) return defaultState;
  const parsedState = JSON.parse(savedState);
  const migratedItems = (parsedState.items || []).map(item => ({
    ...item,
    assignments: item.assignments || [],
    isShared: item.isShared || false,
    quantity: item.quantity || 1,
  }));
  return { ...defaultState, ...parsedState, items: migratedItems };
};

export const BillProvider = ({ children }) => {
  const [initialState] = useState(loadState);
  const [people, setPeople] = useState(initialState.people);
  const [items, setItems] = useState(initialState.items);
  const [tax, setTax] = useState(initialState.tax);
  const [serviceCharge, setServiceCharge] = useState(initialState.serviceCharge);

  const [editingTarget, setEditingTarget] = useState(null);
  const [hoveredPersonId, setHoveredPersonId] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, message: '', onConfirm: () => {} });

  useEffect(() => {
    const stateToSave = { people, items, tax, serviceCharge };
    localStorage.setItem('billState', JSON.stringify(stateToSave));
  }, [people, items, tax, serviceCharge]);

  const showConfirmationModal = (message, onConfirm) => setModalState({ isOpen: true, message, onConfirm });

  const addPerson = (name) => {
    if (name && !people.some(p => p.name.toLowerCase() === name.toLowerCase())) setPeople([...people, { id: Date.now(), name }]);
  };

  const removePerson = (personId) => {
    setPeople(people.filter((p) => p.id !== personId));
    setItems(currentItems => currentItems.map(item => ({ ...item, assignments: item.assignments.filter(a => a.personId !== personId) })).filter(item => item.isShared ? true : item.assignments.length > 0));
  };

  const addItem = (name, priceString, quantity) => {
    const price = parseFormattedNumber(priceString);
    if (name && price > 0 && quantity > 0) {
      const newItem = { id: Date.now(), name, price, quantity: Number(quantity), isShared: false, assignments: [] };
      setItems(currentItems => [newItem, ...currentItems]);
    }
  };

  const removeItem = (id) => setItems(items.filter((item) => item.id !== id));

  const updateAssignment = (itemId, personId, change) => {
    setItems(items.map(item => {
      if (item.id !== itemId) return item;

      let newAssignments = [...item.assignments];
      const existingIndex = newAssignments.findIndex(a => a.personId === personId);
      const totalAssigned = newAssignments.reduce((sum, a) => sum + a.quantity, 0);

      if (item.isShared) {
        if (existingIndex > -1) newAssignments.splice(existingIndex, 1);
        else newAssignments.push({ personId, quantity: 1 });
      } else {
        if (existingIndex > -1) {
          const newQuantity = Math.max(0, newAssignments[existingIndex].quantity + change.value);
          if (change.value > 0 && totalAssigned >= item.quantity) return item;
          if (newQuantity === 0) newAssignments.splice(existingIndex, 1);
          else newAssignments[existingIndex] = { ...newAssignments[existingIndex], quantity: newQuantity };
        } else {
          if (totalAssigned >= item.quantity) return item;
          newAssignments.push({ personId, quantity: 1 });
        }
      }
      return { ...item, assignments: newAssignments };
    }));
  };
  
  const toggleItemShare = (itemId) => {
    setItems(items.map(item => item.id === itemId ? { ...item, isShared: !item.isShared, assignments: [] } : item));
  };

  const saveEdit = (id, type, newValue) => {
    if (type === 'person') setPeople(people.map(p => p.id === id ? { ...p, name: newValue } : p));
    if (type === 'item.name') setItems(items.map(i => i.id === id ? { ...i, name: newValue } : i));
    if (type === 'item.price') setItems(items.map(i => i.id === id ? { ...i, price: parseFormattedNumber(newValue) } : i));
    if (type === 'item.quantity') setItems(items.map(i => i.id === id ? { ...i, quantity: Math.max(1, Number(newValue)), assignments: [] } : i));
    setEditingTarget(null);
  };
  
  const resetBill = () => {
    showConfirmationModal('Apakah Anda yakin ingin memulai tagihan baru?', () => {
      localStorage.removeItem('billState');
      setPeople(defaultState.people);
      setItems(defaultState.items);
      setTax(defaultState.tax);
      setServiceCharge(defaultState.serviceCharge);
    });
  };

  const value = {
    people, addPerson, removePerson,
    items, addItem, removeItem,
    updateAssignment, toggleItemShare,
    tax, setTax, serviceCharge, setServiceCharge,
    editingTarget, setEditingTarget, saveEdit,
    hoveredPersonId, setHoveredPersonId,
    resetBill, modalState, setModalState, showConfirmationModal,
  };

  return <BillContext.Provider value={value}>{children}</BillContext.Provider>;
};

export const useBill = () => useContext(BillContext);
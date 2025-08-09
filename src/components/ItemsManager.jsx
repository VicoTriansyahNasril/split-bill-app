// File: src/components/ItemsManager.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBill } from '../context/BillContext';
import { formatCurrency, formatNumberInput } from '../utils/formatter';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import Editable from './ui/Editable';
import ToggleSwitch from './ui/ToggleSwitch';
import './FormStyles.css';

const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;

const ItemsManager = () => {
  const { items, addItem, removeItem, people, updateAssignment, toggleItemShare, setEditingTarget, showConfirmationModal } = useBill();
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice || !quantity) return;
    addItem(itemName, itemPrice, quantity);
    setItemName('');
    setItemPrice('');
    setQuantity('1');
  };

  const handleRemoveItem = (id, itemName) => {
    showConfirmationModal(`Hapus pesanan "${itemName}" dari daftar?`, () => removeItem(id));
  };

  return (
    <Card>
      <h2>Daftar Pesanan ({items.length})</h2>
      <form onSubmit={handleSubmit} className="item-form-layout">
        <Input label="Nama Pesanan" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="e.g., Martabak Spesial"/>
        <Input label="Harga Satuan" id="itemPrice" type="text" inputMode="numeric" value={itemPrice} onChange={(e) => setItemPrice(formatNumberInput(e.target.value))} placeholder="e.g., 50.000"/>
        <div className="quantity-input-wrapper"><Input label="Jumlah" id="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></div>
        <Button type="submit">Tambah</Button>
      </form>
      <div style={{ marginTop: '1.5rem', minHeight: '60px' }}>
        <AnimatePresence>
          {items.map((item) => {
            const totalAssigned = item.isShared ? item.assignments.length : item.assignments.reduce((sum, a) => sum + a.quantity, 0);
            const remaining = item.quantity - totalAssigned;

            return (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }} className="list-item">
                <div className="list-item-header">
                  <div className="item-details">
                    <Editable id={item.id} type="item.name" value={item.name} />
                    <div className="item-sub-details">
                      <Editable id={item.id} type="item.quantity" value={item.quantity} inputType="number" className="quantity-editable"/> x <Editable id={item.id} type="item.price" value={item.price} displayTransform={formatCurrency} />
                      <span className="total-item-price">= {formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id, item.name)} style={{padding: '0.5rem'}}>Hapus</Button>
                    <Button variant="secondary" onClick={() => setEditingTarget({ id: item.id, type: 'item.name' })} style={{ padding: '0.5rem' }}><EditIcon/></Button>
                  </div>
                </div>

                <div className="item-assignment-section">
                  <div className="assignment-header">
                    <p className="assignment-title">{item.isShared ? 'Dibagi Rata Oleh:' : 'Dipesan Oleh:'}</p>
                    <ToggleSwitch size="small" options={[{label: 'Personal', value: false}, {label: 'Dibagi Rata', value: true}]} selected={item.isShared} onSelect={() => toggleItemShare(item.id)} />
                  </div>

                  {!item.isShared && (
                    <p className="assignment-status">
                      Ter-assign: {totalAssigned} dari {item.quantity}. <strong>Sisa: {remaining}</strong>
                    </p>
                  )}

                  {item.isShared ? (
                    <div className="add-person-to-item">
                      {people.map(person => (
                        <button key={person.id} className={`person-chip ${item.assignments.some(a => a.personId === person.id) ? 'assigned' : ''}`} onClick={() => updateAssignment(item.id, person.id, {type: 'toggle'})}>
                          {person.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <>
                      {item.assignments.map(assignment => {
                        const person = people.find(p => p.id === assignment.personId);
                        if (!person) return null;
                        return (
                          <div key={person.id} className="person-assignment-control">
                            <span>{person.name}</span>
                            <div className="quantity-control">
                              <button onClick={() => updateAssignment(item.id, person.id, { type: 'quantity', value: -1 })}>-</button>
                              <input type="number" value={assignment.quantity} readOnly />
                              <button onClick={() => updateAssignment(item.id, person.id, { type: 'quantity', value: 1 })} disabled={remaining <= 0}>+</button>
                            </div>
                          </div>
                        );
                      })}
                      <div className="add-person-to-item">
                        {people.filter(p => !item.assignments.some(a => a.personId === p.id)).map(person => (
                          <button key={person.id} className="person-chip" onClick={() => updateAssignment(item.id, person.id, {type: 'quantity', value: 1})} disabled={remaining <= 0}>
                            + {person.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default ItemsManager;
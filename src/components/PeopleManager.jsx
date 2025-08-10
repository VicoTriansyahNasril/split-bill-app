// File: src/components/PeopleManager.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBill } from '../context/BillContext';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import Editable from './ui/Editable';
import './FormStyles.css';

const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;

const PeopleManager = () => {
  const { people, addPerson, removePerson, setEditingTarget, showConfirmationModal } = useBill();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) addPerson(name);
    setName('');
  };

  const handleRemovePerson = (id, personName) => {
    showConfirmationModal(`Apakah Anda yakin ingin menghapus "${personName}"?`, () => removePerson(id));
  };

  return (
    <Card>
      <h2>Peserta ({people.length})</h2>
      <form onSubmit={handleSubmit} className="form-row" style={{ gridTemplateColumns: '1fr auto' }}>
        <Input
          label="Nama Peserta"
          id="personName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Andi"
        />
        <Button type="submit">Tambah</Button>
      </form>
      <div style={{ marginTop: '1.5rem', minHeight: '50px' }}>
        <AnimatePresence>
          {people.map((person) => (
            <motion.div
              key={person.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="list-item"
            >
              <div className="list-item-header">
                <Editable id={person.id} type="person" value={person.name} />
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Button variant="secondary" onClick={() => setEditingTarget({ id: person.id, type: 'person' })} style={{ padding: '0.5rem' }}><EditIcon /></Button>
                  <Button variant="danger" onClick={() => handleRemovePerson(person.id, person.name)}>Hapus</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default PeopleManager;
// File: src/pages/SplitBillPage.jsx
import React from 'react';
import { useBill } from '../context/BillContext';
import BillInfoForm from '../components/BillInfoForm';
import PeopleManager from '../components/PeopleManager';
import ItemsManager from '../components/ItemsManager';
import Summary from '../components/Summary';
import ThemeToggle from '../components/ui/ThemeToggle';
import Button from '../components/ui/Button';

const SplitBillPage = () => {
  const { resetBill } = useBill();

  return (
    <div>
      <header className="app-header">
        <h1>Split Bill 💸</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button onClick={resetBill} variant="secondary">Mulai Baru</Button>
          <ThemeToggle />
        </div>
      </header>
      <main className="app-container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <BillInfoForm />
          <PeopleManager />
          <ItemsManager />
        </div>
        <div style={{ position: 'sticky', top: '2rem' }}>
          <Summary />
        </div>
      </main>
    </div>
  );
};

export default SplitBillPage;
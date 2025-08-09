// File: src/components/Summary.jsx
import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useBillCalculator } from '../hooks/useBillCalculator';
import { useBill } from '../context/BillContext';
import { formatCurrency } from '../utils/formatter';
import Card from './ui/Card';
import Button from './ui/Button';
import './Summary.css';

const Summary = () => {
  const { summary, grandTotal, subtotal, totalTaxAmount, totalServiceAmount } = useBillCalculator();
  const { setHoveredPersonId } = useBill();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTriggered = useRef(false);

  useEffect(() => {
    if (grandTotal > 0 && !confettiTriggered.current) {
      setShowConfetti(true);
      confettiTriggered.current = true;
      setTimeout(() => setShowConfetti(false), 5000);
    }
    if (grandTotal === 0) confettiTriggered.current = false;
  }, [grandTotal]);

  const handleCopyToClipboard = () => {
    let textToCopy = "🧾 Ringkasan Tagihan Lengkap 🧾\n\n";
    
    summary.forEach(person => {
      textToCopy += `👤 *${person.name}*\n`;
      person.items.forEach(item => {
        if (item.isShared) {
          const numSharers = item.assignments.length;
          textToCopy += `  - ${item.name} (x${item.quantity}, dibagi ${numSharers}): ${formatCurrency(item.portionedPrice)}\n`;
        } else {
          textToCopy += `  - ${item.name} (pesan ${item.personQuantity}): ${formatCurrency(item.portionedPrice)}\n`;
        }
      });
      textToCopy += `  - Bagian Pajak & Service: ${formatCurrency(person.sharedCost)}\n`;
      textToCopy += `  💰 *Total Bayar: ${formatCurrency(person.total)}*\n\n`;
    });

    textToCopy += "--------------------------------\n";
    textToCopy += "📊 *Detail Keseluruhan*\n";
    textToCopy += `Subtotal Pesanan: ${formatCurrency(subtotal)}\n`;
    textToCopy += `Total Pajak: ${formatCurrency(totalTaxAmount)}\n`;
    textToCopy += `Total Service: ${formatCurrency(totalServiceAmount)}\n`;
    textToCopy += `GRAND TOTAL: *${formatCurrency(grandTotal)}*\n`;
    textToCopy += "--------------------------------";
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="summary-card">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <h2>Ringkasan</h2>
      {summary.length === 0 ? (
        <p className="placeholder-text">Tambahkan peserta dan pesanan untuk melihat ringkasan.</p>
      ) : (
        <>
          <div className="summary-list">
            {summary.map((person) => (
              <div key={person.id} className="summary-person-card" onMouseEnter={() => setHoveredPersonId(person.id)} onMouseLeave={() => setHoveredPersonId(null)}>
                <h3>{person.name}</h3>
                <ul>
                  {person.items.map(item => (
                    <li key={`${item.id}-${person.id}`}>
                      <span>{item.isShared ? `${item.name} (Dibagi)` : `${item.name} (x${item.personQuantity})`}</span>
                      <span>{formatCurrency(item.portionedPrice)}</span>
                    </li>
                  ))}
                  <li className="shared-cost"><span>Pajak & Service</span><span>{formatCurrency(person.sharedCost)}</span></li>
                </ul>
                <div className="person-total"><span>Total Bayar</span><span>{formatCurrency(person.total)}</span></div>
              </div>
            ))}
          </div>
          <div className="grand-total"><span>TOTAL KESELURUHAN</span><span>{formatCurrency(grandTotal)}</span></div>
          <Button onClick={handleCopyToClipboard} style={{ width: '100%', marginTop: '1.5rem' }}>{copied ? 'Tersalin!' : 'Salin Ringkasan Lengkap'}</Button>
        </>
      )}
    </Card>
  );
};

export default Summary;
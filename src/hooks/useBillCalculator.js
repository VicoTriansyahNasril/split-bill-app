// File: src/hooks/useBillCalculator.js
import { useMemo } from 'react';
import { useBill } from '../context/BillContext';

export const useBillCalculator = () => {
  const { people, items, tax, serviceCharge } = useBill();

  const calculationResult = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalTaxAmount = tax.type === 'percent' ? subtotal * (tax.value / 100) : tax.value;
    const totalServiceAmount = serviceCharge.type === 'percent' ? subtotal * (serviceCharge.value / 100) : serviceCharge.value;
    const totalSharedCost = totalTaxAmount + totalServiceAmount;
    const sharedCostPerPerson = people.length > 0 ? totalSharedCost / people.length : 0;

    const personTotals = people.map(person => {
      let itemTotal = 0;
      const personItems = [];
      items.forEach(item => {
        const assignment = item.assignments.find(a => a.personId === person.id);
        if (!assignment) return;

        if (item.isShared) {
          const totalItemCost = item.price * item.quantity;
          const costPerSharer = totalItemCost / item.assignments.length;
          itemTotal += costPerSharer;
          personItems.push({ ...item, isShared: true, portionedPrice: costPerSharer });
        } else {
          const cost = item.price * assignment.quantity;
          itemTotal += cost;
          personItems.push({ ...item, isShared: false, personQuantity: assignment.quantity, portionedPrice: cost });
        }
      });
      return { ...person, itemTotal, items: personItems, sharedCost: sharedCostPerPerson, total: itemTotal + sharedCostPerPerson };
    });

    const grandTotal = subtotal + totalSharedCost;
    return { summary: personTotals, grandTotal, subtotal, totalTaxAmount, totalServiceAmount };
  }, [people, items, tax, serviceCharge]);

  return calculationResult;
};
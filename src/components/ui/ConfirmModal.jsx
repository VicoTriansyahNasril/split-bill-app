// File: src/components/ui/ConfirmModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBill } from '../../context/BillContext';
import Button from './Button';
import './ConfirmModal.css';

const ConfirmModal = () => {
  const { modalState, setModalState } = useBill();
  const { isOpen, message, onConfirm } = modalState;

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <p>{message}</p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={handleClose}>Batal</Button>
              <Button variant="danger" onClick={handleConfirm}>Ya, Lanjutkan</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
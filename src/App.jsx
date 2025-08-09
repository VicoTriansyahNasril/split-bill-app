// File: src/App.jsx
import SplitBillPage from './pages/SplitBillPage';
import { BillProvider } from './context/BillContext';
import ConfirmModal from './components/ui/ConfirmModal';

function App() {
  return (
    <BillProvider>
      <SplitBillPage />
      <ConfirmModal />
    </BillProvider>
  );
}

export default App;
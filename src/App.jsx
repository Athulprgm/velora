import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useThemeStore } from './store/themeStore';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LoadingScreen from './components/LoadingScreen';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';

function AppContent() {
  const { theme } = useThemeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div className={`min-h-screen text-[var(--text)] transition-colors duration-300 ${theme === 'dark' ? 'grain' : ''} ${loading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

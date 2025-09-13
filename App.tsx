
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import ProductShowcase from './components/ProductShowcase';
import DeliveryBanner from './components/DeliveryBanner';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import Receipt from './components/Receipt';

declare const emailjs: any;

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '' });

  useEffect(() => {
    // Initialize EmailJS with the public key when the app loads.
    // This is the recommended approach for the EmailJS v4 SDK.
    if (typeof emailjs !== 'undefined') {
      emailjs.init({
        publicKey: 'GkZn_MpuwENFwMgOv',
      });
    }
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmCheckout = (details: { name: string; phone: string }) => {
    setCustomerDetails(details);
    setIsCheckoutOpen(false);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };
  
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-grow">
          <Hero />
          <WhyChooseUs />
          <ProductShowcase />
          <DeliveryBanner />
          <About />
          <Contact />
        </main>
        <Footer />

        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onCheckoutClick={handleCheckout}
        />
        
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={handleConfirmCheckout}
        />

        {showReceipt && (
          <Receipt 
            customerDetails={customerDetails}
            onClose={handleCloseReceipt}
          />
        )}
      </div>
    </CartProvider>
  );
};

export default App;
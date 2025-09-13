
import React from 'react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckoutClick: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckoutClick }) => {
  const { cartItems, updateQuantity, clearCart } = useCart();

  const handleSendToWhatsApp = () => {
    const phoneNumber = '9842271368'; // Replace with your father's business number
    const messageHeader = "Hello Butterscotch Sellers! I'd like to inquire about the following items:\n\n";
    
    const messageItems = cartItems.map(item => 
      `- ${item.product.name} (${item.product.weight}) x ${item.quantity}`
    ).join('\n');

    const fullMessage = `${messageHeader}${messageItems}\n\nThank you!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
    clearCart();
  };
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 id="cart-heading" className="text-2xl font-bold text-brand-dark">Your Shopping List</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <h3 className="text-xl font-semibold text-brand-dark">Your list is empty</h3>
              <p className="text-gray-500 mt-2">Add some fresh vegetables to get started!</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 sm:gap-4">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md bg-gray-100 flex-shrink-0" />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-brand-text text-sm sm:text-base">{product.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{product.weight}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-100">-</button>
                      <span className="w-8 text-center font-semibold text-sm sm:text-base">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-lg hover:bg-gray-100">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50 space-y-3">
                <p className="text-sm text-gray-600 text-center">Prices are subject to daily market rates. Send your list for a quote or generate a formal bill.</p>
                <button 
                    onClick={handleSendToWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-full text-base hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-4.664-2.42c-.24-.12-.84-.41-1.02-.46-.18-.05-1.12.38-1.3.45-.18-.07-.3.08-.54-.04-.24-.12-1-0.4-1.9-1.18-.7-.6-1.18-1.36-1.34-1.6-.16-.24-.01-.38.1-.5.11-.12.24-.3.36-.4.12-.1.16-.2.24-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.42c-.14,0-.38.06-.58.28-.2.22-.78.76-.78,1.86,0,1.1.8,2.16.92,2.32.12.16,1.58,2.5,3.82,3.36.56.22,1.02.34,1.38.44.6.16,1.04.14,1.4.08.4-.06,1.18-.48,1.34-.94.16-.46.16-.86.1-.94-.06-.08-.22-.14-.46-.26z" clipRule="evenodd" />
                  </svg>
                  Send List via WhatsApp
                </button>
                <button
                    onClick={onCheckoutClick}
                    className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-full text-base hover:bg-brand-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Generate Bill & Download PDF
                </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;

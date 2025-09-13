import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customerDetails: { name: string; phone: string }) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onConfirm({ name, phone });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all" role="dialog" aria-modal="true">
        <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-brand-dark">Customer Details</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close checkout">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="mb-5">
                <label htmlFor="checkout-name" className="block text-brand-dark font-semibold mb-2">Full Name</label>
                <input
                  type="text" id="checkout-name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-light-gray border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="checkout-phone" className="block text-brand-dark font-semibold mb-2">Phone Number</label>
                <input
                  type="tel" id="checkout-phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-brand-light-gray border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-brand-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Generate Bill
              </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;

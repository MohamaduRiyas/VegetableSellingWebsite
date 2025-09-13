import React, { useRef } from 'react';
import { useCart } from '../contexts/CartContext';

declare const jspdf: any;
declare const html2canvas: any;

interface ReceiptProps {
  customerDetails: { name: string; phone: string };
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ customerDetails, onClose }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const receiptRef = useRef<HTMLDivElement>(null);

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal > 200 || subtotal === 0 ? 0 : 30;
  const grandTotal = subtotal + deliveryCharge;
  
  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    if (input) {
      html2canvas(input).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('receipt-butterscotch-sellers.pdf');
      });
    }
  };

  const handleSendToWhatsApp = () => {
    const phoneNumber = '9842271368';

    // Construct a well-formatted text message that looks like a bill
    let message = `*--- BILL RECEIPT ---*\n`;
    message += `*Butterscotch Sellers*\n\n`;
    message += `*Billed To:*\n`;
    message += `Name: ${customerDetails.name}\n`;
    message += `Phone: ${customerDetails.phone}\n\n`;
    message += `*Date:* ${new Date().toLocaleDateString()}\n`;
    message += `-----------------------------\n`;
    message += `*Order Details:*\n`;

    cartItems.forEach(item => {
        const itemTotal = (item.product.price * item.quantity).toFixed(2);
        message += `- ${item.product.name} (Qty: ${item.quantity}) - ₹${itemTotal}\n`;
    });

    message += `-----------------------------\n`;
    message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    message += `Delivery Charges: ₹${deliveryCharge.toFixed(2)}\n`;
    message += `*GRAND TOTAL: ₹${grandTotal.toFixed(2)}*\n\n`;
    message += `Thank you for your order! We will contact you shortly to confirm.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clean up after sending
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
            <div ref={receiptRef} className="bg-white p-6 sm:p-8 md:p-10 shadow-lg rounded-lg text-sm">
                <div className="text-center border-b pb-6 mb-6">
                    <h1 className="text-3xl font-handwriting text-brand-primary">Butterscotch Sellers</h1>
                    <p className="text-gray-500">Sandhai Market, Pollachi, IN</p>
                </div>
                <div className="flex justify-between mb-6">
                    <div>
                        <p className="font-bold text-gray-800">Billed To:</p>
                        <p>{customerDetails.name}</p>
                        <p>{customerDetails.phone}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Date:</p>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="text-left font-semibold text-gray-600 p-2 sm:p-3">Item</th>
                            <th className="text-center font-semibold text-gray-600 p-2 sm:p-3">Qty</th>
                            <th className="text-right font-semibold text-gray-600 p-2 sm:p-3">Price</th>
                            <th className="text-right font-semibold text-gray-600 p-2 sm:p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(({product, quantity}) => (
                            <tr key={product.id} className="border-b">
                                <td className="p-2 sm:p-3">{product.name}</td>
                                <td className="text-center p-2 sm:p-3">{quantity}</td>
                                <td className="text-right p-2 sm:p-3">₹{product.price.toFixed(2)}</td>
                                <td className="text-right p-2 sm:p-3">₹{(product.price * quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <div className="w-full max-w-xs">
                        <div className="flex justify-between py-1">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-gray-600">Delivery Charges:</span>
                            <span className="font-medium">₹{deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t-2 mt-2">
                            <span className="font-bold text-base sm:text-lg text-brand-dark">Grand Total:</span>
                            <span className="font-bold text-base sm:text-lg text-brand-dark">₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={handleSendToWhatsApp} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-4.664-2.42c-.24-.12-.84-.41-1.02-.46-.18-.05-1.12.38-1.3.45-.18-.07-.3.08-.54-.04-.24-.12-1-0.4-1.9-1.18-.7-.6-1.18-1.36-1.34-1.6-.16-.24-.01-.38.1-.5.11-.12.24-.3.36-.4.12-.1.16-.2.24-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.42c-.14,0-.38.06-.58.28-.2.22-.78.76-.78,1.86,0,1.1.8,2.16.92,2.32.12.16,1.58,2.5,3.82,3.36.56.22,1.02.34,1.38.44.6.16,1.04.14,1.4.08.4-.06,1.18-.48,1.34-.94.16-.46.16-.86.1-.94-.06-.08-.22-.14-.46-.26z" clipRule="evenodd" />
                    </svg>
                    Send Bill on WhatsApp
                </button>
                <button 
                    onClick={handleDownloadPdf} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-dark font-bold py-3 px-8 rounded-full text-base hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200"
                >
                    Download as PDF
                </button>
            </div>
        </div>
    </div>
  );
};

export default Receipt;


import React, { useState } from 'react';

// Make emailjs globally available to TypeScript
declare const emailjs: any;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    // The publicKey is now set globally using emailjs.init() in App.tsx.
    // It should be removed from the send() call as per EmailJS v4 documentation.
    emailjs.send('service_i9wc13w', 'template_laq1612', formData)
      .then(
        () => {
          setStatus({ message: 'Thank you! Your message has been sent.', type: 'success' });
          setFormData({ name: '', email: '', phone: '', message: '' });
        },
        (error: any) => {
          // Improved error logging to show status and text for better debugging.
          console.error('FAILED...', error.status, error.text);
          setStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus({ message: '', type: '' }), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark tracking-tighter">Get in Touch</h2>
          <p className="text-lg text-brand-text/80 mt-4 max-w-3xl mx-auto">
            Have questions, need a quote for a bulk order, or want to arrange a special delivery? We'd love to hear from you.
          </p>
        </div>
        <div className="max-w-lg mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-gray-200/80 shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-brand-dark font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-light-gray border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-brand-dark font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-light-gray border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className="block text-brand-dark font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-light-gray border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-brand-dark font-semibold mb-2">Message / Order Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-light-gray border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
                  placeholder="For bulk orders, please mention the event and vegetable list. For deliveries outside Pollachi, please provide your location."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-brand-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status.message && (
              <p className={`text-center mt-4 font-semibold ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {status.message}
              </p>
            )}
            </form>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-bold text-brand-dark mb-4">For Quick Orders</h3>
             <a
                href="https://wa.me/9842271368"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-4.664-2.42c-.24-.12-.84-.41-1.02-.46-.18-.05-1.12.38-1.3.45-.18-.07-.3.08-.54-.04-.24-.12-1-0.4-1.9-1.18-.7-.6-1.18-1.36-1.34-1.6-.16-.24-.01-.38.1-.5.11-.12.24-.3.36-.4.12-.1.16-.2.24-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.42c-.14,0-.38.06-.58.28-.2.22-.78.76-.78,1.86,0,1.1.8,2.16.92,2.32.12.16,1.58,2.5,3.82,3.36.56.22,1.02.34,1.38.44.6.16,1.04.14,1.4.08.4-.06,1.18-.48,1.34-.94.16-.46.16-.86.1-.94-.06-.08-.22-.14-.46-.26z" clipRule="evenodd" />
                </svg>
                Order on WhatsApp
              </a>
          </div>
      </div>
    </section>
  );
};

export default Contact;
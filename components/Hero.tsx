import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="bg-brand-light-gray pt-28 pb-20 md:pt-40 md:pb-24 text-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-brand-dark tracking-tighter leading-tight mb-4">
              புதிய காய்கறிகள் உங்கள் வீட்டு வாசலில்
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-brand-primary tracking-tight mb-8">
              Fresh Vegetables at Your Doorstep.
            </h2>
            <p className="text-base md:text-lg text-brand-text/80 mb-10 max-w-2xl mx-auto">
              Your trusted source for the freshest vegetables. We deliver daily in Pollachi and to select areas across India. Planning an event? We also handle bulk orders for weddings and parties!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-base hover:bg-brand-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Order Now
              </a>
              <a
                href="https://wa.me/9842271368"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-dark font-bold py-3 px-8 rounded-full text-base hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-4.664-2.42c-.24-.12-.84-.41-1.02-.46-.18-.05-1.12.38-1.3.45-.18.07-.3.08-.54-.04-.24-.12-1-0.4-1.9-1.18-.7-.6-1.18-1.36-1.34-1.6-.16-.24-.01-.38.1-.5.11-.12.24-.3.36-.4.12-.1.16-.2.24-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.42c-.14,0-.38.06-.58.28-.2.22-.78.76-.78,1.86,0,1.1.8,2.16.92,2.32.12.16,1.58,2.5,3.82,3.36.56.22,1.02.34,1.38.44.6.16,1.04.14,1.4.08.4-.06,1.18-.48,1.34-.94.16-.46.16-.86.1-.94-.06-.08-.22-.14-.46-.26z" clipRule="evenodd" />
                </svg>
                WhatsApp Order
              </a>
            </div>
        </div>
         <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <img 
            src="https://images.unsplash.com/photo-1598256926485-52329103e352?q=80&w=1800"
            alt="An assortment of fresh vegetables on a clean surface"
            className="mx-auto rounded-2xl shadow-2xl max-w-4xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
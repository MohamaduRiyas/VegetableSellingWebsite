import React from 'react';

const DeliveryBanner: React.FC = () => {
  return (
    <section className="bg-brand-dark">
      <div className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          Delivering Freshness, Wherever You Are.
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Free local delivery in Pollachi for orders over ₹200. Contact us for nationwide shipping and bulk event supplies!
        </p>
      </div>
    </section>
  );
};

export default DeliveryBanner;
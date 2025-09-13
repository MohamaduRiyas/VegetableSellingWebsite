import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-white rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-2 h-full">
    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-brand-light-gray mx-auto mb-5 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
    <p className="text-brand-text/80">{description}</p>
  </div>
);

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <LeafIcon />,
      title: 'Daily Fresh Vegetables',
      description: 'Handpicked daily from the market to ensure the highest quality and freshness.',
    },
    {
      icon: <TrustIcon />,
      title: 'Trusted Since Childhood',
      description: 'Generations of local families have trusted us for their daily dose of health.',
    },
    {
      icon: <DeliveryIcon />,
      title: 'Flexible Delivery',
      description: 'Swift local delivery in Pollachi and special arrangements for orders across India.',
    },
    {
      icon: <PriceIcon />,
      title: 'Affordable Prices',
      description: 'Enjoy the freshest, healthiest food in town without breaking the bank.',
    },
    {
      icon: <BulkIcon />,
      title: 'Bulk & Event Supply',
      description: 'Catering to marriages, parties, and special occasions with wholesale supplies.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark tracking-tighter">Why Choose Us?</h2>
          <p className="text-lg text-brand-text/80 mt-4 max-w-2xl mx-auto">
            We're more than just a vegetable seller. We are your partners in healthy living.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div className={`animate-fade-in-up ${index === 4 ? 'lg:col-start-2' : ''}`} style={{ animationDelay: `${index * 0.1}s` }} key={index}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" />
    </svg>
);
const PriceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
    </svg>
);
const DeliveryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9a2.25 2.25 0 012.25-2.25h12.75a2.25 2.25 0 012.25 2.25v9" />
    </svg>
);
const TrustIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const BulkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);


export default WhyChooseUs;
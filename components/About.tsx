import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-light-gray">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="md:w-1/2 w-full animate-fade-in-up">
            <img
              src="https://iprep.in/wp-content/uploads/2024/11/from-market-to-home-class-4-EVS-chapter-15-1024x585.webp"
              alt="A vibrant vegetable market stall"
              className="h-full w-full object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="md:w-1/2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative inline-block mb-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tighter">Our Story.</h2>
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand-primary rounded-full"></span>
            </div>
            <div className="space-y-6 text-lg text-brand-text/90">
              <p>
                For my father, selling vegetables isn't just a business—it's a tradition. He started helping at his family's market stall as a child, learning the art of picking the freshest produce from the bustling wholesale markets long before sunrise.
              </p>
              <p>
                Today, he continues that legacy at the local Sandhai, where he's a trusted face for countless families. Butterscotch Sellers is our way of sharing that lifelong passion, bringing the freshest, hand-selected vegetables from the market directly to your home, whether you're in Pollachi or planning a large celebration elsewhere in India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
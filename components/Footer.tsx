
import React from 'react';
import { navLinks } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-gray-400">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          <div className="md:col-span-1 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2 font-handwriting">Butterscotch Sellers</h3>
            <p className="text-sm">Freshness Delivered Daily.</p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white tracking-wide mb-4">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                 <li><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-white tracking-wide mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li><a href="https://www.google.com/maps/search/?api=1&query=Pollachi+Market" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sandhai Market, Pollachi, IN</a></li>
              <li><a href="tel:+919842271368" className="hover:text-white transition-colors">+91 9842271368</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
             <h4 className="font-semibold text-white tracking-wide mb-4">Hours</h4>
              <ul className="space-y-2">
                <li><p>Mon - Sat: 9am - 6pm</p></li>
                <li><p>Sunday: Closed</p></li>
              </ul>
          </div>

        </div>
        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Butterscotch Sellers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

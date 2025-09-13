import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        // Adjust for header height (approx. 80px on desktop, 64px on mobile)
        const headerOffset = window.innerWidth < 768 ? 64 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Active link highlighting
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      let currentSectionId = '';
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 120) { // 120px offset for better accuracy
            currentSectionId = section.id;
          }
        }
      }
      const correspondingNavLink = navLinks.find(link => link.href === `#${currentSectionId}`);
      if (correspondingNavLink) {
        setActiveLink(correspondingNavLink.name);
      } else {
        setActiveLink('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled || isOpen ? 'bg-white/80 shadow-sm backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="text-xl sm:text-2xl font-bold text-brand-dark hover:text-brand-primary transition-colors">
              <span className="font-handwriting">Butterscotch Sellers</span>
            </a>
            <div className="flex items-center">
                <nav className="hidden md:flex items-center space-x-10">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                        activeLink === link.name ? 'text-brand-primary' : 'text-brand-text hover:text-brand-primary'
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
                <button onClick={onCartClick} className="relative ml-4 sm:ml-8 p-2 rounded-full hover:bg-gray-200/50 transition-colors" aria-label="Open cart">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-2 flex items-center justify-center h-5 w-5 bg-brand-pink text-white text-xs font-bold rounded-full">
                            {totalItems}
                        </span>
                    )}
                </button>
                <div className="md:hidden ml-2 sm:ml-4">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-brand-dark focus:outline-none z-50 relative"
                    aria-label="Toggle menu"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full pt-16 -mt-16">
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-2xl font-semibold transition-colors duration-300 ${
                  activeLink === link.name ? 'text-brand-primary' : 'text-brand-text hover:text-brand-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
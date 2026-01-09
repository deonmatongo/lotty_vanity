import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '@/api';

export default function Header({ onCartClick, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  // Pages that need a dark header from the start (light backgrounds)
  const lightBackgroundPages = ['Checkout', 'Shop', 'ProductDetail'];
  const needsDarkHeader = lightBackgroundPages.includes(currentPageName);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCartCount = async () => {
      const items = await CartItem.list();
      const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };
    loadCartCount();
    const interval = setInterval(loadCartCount, 2000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: 'Home' },
    { name: 'Shop', path: 'Shop' },
    { name: 'About', path: 'About' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || needsDarkHeader
            ? 'bg-black text-white' 
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 -ml-2 ${isScrolled ? 'text-white' : 'text-white'}`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.path)}
                  className={`text-sm tracking-widest uppercase font-light hover:text-rose-400 transition-colors duration-300 ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link 
              to={createPageUrl('Home')}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <h1 className={`text-2xl md:text-3xl font-serif tracking-wider transition-colors duration-500 ${
                isScrolled ? 'text-white' : 'text-white'
              }`}>
                <span className="font-light">LOTTY'S</span>
                <span className="italic text-rose-400 ml-2">Vanity</span>
              </h1>
            </Link>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className={`relative p-2 hover:text-rose-400 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif tracking-wider hover:text-rose-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
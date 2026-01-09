import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif mb-4">
              <span className="font-light">LOTTY'S</span>
              <span className="italic text-rose-300 ml-2">Vanity</span>
            </h3>
            <p className="text-white/60 font-light leading-relaxed max-w-sm">
              A New Era of Beauty Begins. Discover premium makeup essentials designed 
              to enhance your natural radiance.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-300 hover:text-rose-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-300 hover:text-rose-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-300 hover:text-rose-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link to={createPageUrl('Shop') + '?category=lips'} className="text-white/60 hover:text-rose-300 transition-colors">
                  Lips
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Shop') + '?category=face'} className="text-white/60 hover:text-rose-300 transition-colors">
                  Face
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Shop') + '?category=eyes'} className="text-white/60 hover:text-rose-300 transition-colors">
                  Eyes
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Shop') + '?category=kits'} className="text-white/60 hover:text-rose-300 transition-colors">
                  Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6">Info</h4>
            <ul className="space-y-4">
              <li>
                <Link to={createPageUrl('About')} className="text-white/60 hover:text-rose-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-rose-300 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-rose-300 transition-colors">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-rose-300 transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Lotty's Vanity. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/common/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { Toaster } from 'sonner';

export default function Layout({ children, currentPageName }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Inter', system-ui, sans-serif;
        }
        
        .font-serif {
          font-family: var(--font-serif);
        }
        
        .font-sans {
          font-family: var(--font-sans);
        }
        
        body {
          font-family: var(--font-sans);
        }
        
        ::selection {
          background-color: #F8BBD9;
          color: #1A1A1A;
        }
      `}</style>
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            borderRadius: '9999px',
            padding: '12px 24px',
          },
        }}
      />
      
      <Header onCartClick={() => setCartOpen(true)} currentPageName={currentPageName} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

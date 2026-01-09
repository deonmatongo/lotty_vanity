import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Gift } from 'lucide-react';
import { CartItem } from '@/api';
import { Button } from '@/components/ui/button';

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const loadCart = async () => {
    setLoading(true);
    const items = await CartItem.list();
    setCartItems(items);
    setLoading(false);
  };

  const updateQuantity = async (item, change) => {
    const newQuantity = (item.quantity || 1) + change;
    if (newQuantity <= 0) {
      await CartItem.delete(item.id);
    } else {
      await CartItem.update(item.id, { quantity: newQuantity });
    }
    loadCart();
  };

  const removeItem = async (id) => {
    await CartItem.delete(id);
    loadCart();
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 200 ? 0 : 19.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-serif tracking-wider">Your Bag</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-400 rounded-full animate-spin" />
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="text-gray-500 font-light">Your bag is empty</p>
                  <p className="text-sm text-gray-400 mt-2">Add something beautiful</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product_image ? (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ShoppingBag className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product_name}</h3>
                        <p className="text-rose-400 text-sm mt-1">{item.price?.toFixed(2)} zł</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item, -1)}
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item, 1)}
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                {/* Free Shipping Progress */}
                {subtotal < 200 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        Free shipping at 200 zł
                      </span>
                      <span className="font-medium">{(200 - subtotal).toFixed(2)} zł to go</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Pricing */}
                <div className="space-y-2 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{subtotal.toFixed(2)} zł</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} zł`}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-serif pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-rose-400">{total.toFixed(2)} zł</span>
                  </div>
                </div>

                <Link to={createPageUrl('Checkout')} onClick={onClose}>
                  <Button className="w-full bg-rose-400 hover:bg-rose-500 text-white py-6 text-sm tracking-widest uppercase rounded-full flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <p className="text-center text-xs text-gray-400">
                  Secure checkout • Free returns within 30 days
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
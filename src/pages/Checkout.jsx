import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { CartItem } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, CreditCard, ShoppingBag, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Poland',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    const items = await CartItem.list();
    setCartItems(items);
    setLoading(false);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 200 ? 0 : 19.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart
    await CartItem.clear();
    
    toast.success('Order placed successfully! 🎉');
    setProcessing(false);
    navigate(createPageUrl('Home'));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF9F7] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-rose-200 border-t-rose-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF9F7] pt-32 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
          <Link to={createPageUrl('Shop')}>
            <Button className="bg-rose-400 hover:bg-rose-500 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pt-24 sm:pt-32">
        {/* Back Link */}
        <Link
          to={createPageUrl('Shop')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light tracking-wider">Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <Lock className="w-5 h-5 text-rose-400" />
                <h1 className="text-2xl sm:text-3xl font-serif">Secure Checkout</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-lg font-serif mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm uppercase tracking-wider text-gray-600">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-lg font-serif mb-4">Shipping Address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm uppercase tracking-wider text-gray-600">First Name</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm uppercase tracking-wider text-gray-600">Last Name</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address" className="text-sm uppercase tracking-wider text-gray-600">Address</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="123 Beauty Street"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm uppercase tracking-wider text-gray-600">City</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-sm uppercase tracking-wider text-gray-600">Postal Code</Label>
                      <Input
                        id="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-lg font-serif mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-rose-400" />
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm uppercase tracking-wider text-gray-600">Card Number</Label>
                      <Input
                        id="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-sm uppercase tracking-wider text-gray-600">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm uppercase tracking-wider text-gray-600">CVV</Label>
                        <Input
                          id="cvv"
                          required
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="mt-2 h-12 rounded-xl border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white h-14 text-sm tracking-widest uppercase rounded-full"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay ${total.toFixed(2)} zł`
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-24"
            >
              <h2 className="text-xl font-serif mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product_image ? (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product_name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                      <p className="text-sm text-rose-400">{(item.price * (item.quantity || 1)).toFixed(2)} zł</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} zł`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{tax.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-lg font-serif pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-rose-400">{total.toFixed(2)} zł</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="mt-6 p-4 bg-rose-50 rounded-xl">
                  <p className="text-xs text-rose-600">
                    Add {(50 - subtotal).toFixed(2)} zł more for FREE shipping
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <Lock className="w-4 h-4" />
                  <p className="text-xs">Secure 256-bit SSL encryption</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
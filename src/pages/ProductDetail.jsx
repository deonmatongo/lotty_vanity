import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, ShoppingBag, Heart, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      const products = await base44.entities.Product.filter({ id: productId });
      if (products.length > 0) {
        setProduct(products[0]);
      }
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  const addToCart = async () => {
    setAddingToCart(true);
    await base44.entities.CartItem.create({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url,
      price: product.price,
      quantity: quantity
    });
    setAddingToCart(false);
    setAdded(true);
    toast.success('Added to bag');
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF9F7] pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FDF9F7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Product not found</h1>
          <Link
            to={createPageUrl('Shop')}
            className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF9F7]">
      {/* Breadcrumb */}
      <div className="pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <Link
            to={createPageUrl('Shop')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-rose-50 to-white rounded-3xl overflow-hidden shadow-lg">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-serif text-rose-200">{product.name[0]}</span>
                  </div>
                )}
              </div>
              
              {product.featured && (
                <div className="absolute top-6 left-6 bg-rose-400 text-white text-xs px-4 py-2 rounded-full tracking-wider uppercase">
                  Featured
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
              <p className="text-3xl font-light mb-8">£{product.price?.toFixed(2)}</p>

              {product.description && (
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm tracking-widest uppercase mb-3">Quantity</p>
                <div className="inline-flex items-center border border-gray-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-l-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-r-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={addToCart}
                  disabled={!product.in_stock || addingToCart}
                  className={`flex-1 h-14 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                    added 
                      ? 'bg-green-500 hover:bg-green-500' 
                      : 'bg-black hover:bg-gray-800'
                  }`}
                >
                  {addingToCart ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : added ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Added!
                    </>
                  ) : !product.in_stock ? (
                    'Out of Stock'
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Bag
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-14 h-14 rounded-full p-0 border-gray-200 hover:border-rose-300 hover:text-rose-400"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-100 pt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-rose-400" />
                  </div>
                  Free shipping on orders over £50
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-rose-400" />
                  </div>
                  30-day returns
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-rose-400" />
                  </div>
                  Cruelty-free & vegan
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
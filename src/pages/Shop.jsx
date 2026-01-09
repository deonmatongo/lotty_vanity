import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'lips', name: 'Lips' },
  { id: 'face', name: 'Face' },
  { id: 'eyes', name: 'Eyes' },
  { id: 'kits', name: 'Kits' },
  { id: 'tools', name: 'Tools' }
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [activeCategory]);

  const loadProducts = async () => {
    setLoading(true);
    let data;
    if (activeCategory === 'all') {
      data = await base44.entities.Product.list('-created_date');
    } else {
      data = await base44.entities.Product.filter({ category: activeCategory }, '-created_date');
    }
    setProducts(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FDF9F7]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Our Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif"
          >
            Shop <span className="italic text-rose-400">Beauty</span>
          </motion.h1>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-sm tracking-wider uppercase transition-colors ${
                    activeCategory === category.id
                      ? 'text-rose-400'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>

            {/* Product Count */}
            <p className="text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden pb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setShowFilters(false);
                  }}
                  className={`text-xs px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category.id
                      ? 'bg-rose-400 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg mb-4">No products found in this category</p>
              <Button
                onClick={() => setActiveCategory('all')}
                variant="outline"
                className="rounded-full"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
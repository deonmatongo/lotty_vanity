import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function ProductCard({ product, index = 0 }) {
  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await base44.entities.CartItem.create({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url,
      price: product.price,
      quantity: 1
    });
    toast.success('Added to bag');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link to={createPageUrl(`ProductDetail?id=${product.id}`)}>
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 shadow-sm">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100">
              <span className="text-5xl font-serif text-rose-200">{product.name[0]}</span>
            </div>
          )}
          
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-sm tracking-widest uppercase">Out of Stock</span>
            </div>
          )}
          
          {product.in_stock && (
            <button
              onClick={addToCart}
              className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          )}

          {product.featured && (
            <div className="absolute top-4 left-4 bg-rose-400 text-white text-xs px-3 py-1 rounded-full tracking-wider uppercase">
              Featured
            </div>
          )}
        </div>
      </Link>
      
      <p className="text-xs text-rose-400 tracking-widest uppercase mb-1">{product.category}</p>
      <h3 className="font-medium text-lg mb-1 group-hover:text-rose-400 transition-colors">{product.name}</h3>
      <p className="text-gray-600">£{product.price?.toFixed(2)}</p>
    </motion.div>
  );
}
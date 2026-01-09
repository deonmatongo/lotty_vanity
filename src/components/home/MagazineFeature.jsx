import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function MagazineFeature() {
  return (
    <section className="py-24 bg-[#1A1A1A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-rose-300 text-sm tracking-[0.3em] uppercase mb-4">
              As Seen In
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Lotty's
              <span className="italic text-rose-300 ml-2">Magazine</span>
            </h2>
            <p className="text-white/70 font-light leading-relaxed mb-8 max-w-md">
              Your daily dose of beauty inspiration. Discover makeup tips, trends, and the 
              latest from Lotty's Vanity in our exclusive magazine feature.
            </p>
            <Link
              to={createPageUrl('Shop')}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-rose-50 transition-colors duration-300 group"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Magazine Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="/images/photo_0013.jpg"
                alt="Lotty's Magazine"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl" />
            <div className="absolute -left-8 -bottom-8 w-64 h-64 bg-rose-300/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
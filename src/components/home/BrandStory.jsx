import React from 'react';
import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
                  alt="Lotty's Vanity"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
                  alt="Lotty's Vanity Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80"
                  alt="Lotty's Vanity Magazine"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              A New Era of
              <br />
              <span className="italic text-rose-400">Beauty Begins</span>
            </h2>
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                Get ready, beauty lovers – something extraordinary is on the horizon! Lotty's Vanity, 
                the highly anticipated beauty brand, is preparing for its grand debut, promising 
                a fusion of elegance and everyday glamour.
              </p>
              <p>
                Lotty's Vanity promises to cater to beauty enthusiasts of all styles, from those 
                who prefer classic, understated elegance to those who love bold, statement-making looks.
              </p>
              <p>
                From lush lipsticks to radiant foundations, each product is crafted to make every 
                person feel like a star in their own story.
              </p>
            </div>

            {/* Decorative Quote */}
            <div className="mt-12 pl-6 border-l-2 border-rose-200">
              <p className="text-2xl font-serif italic text-gray-800">
                "Beauty is not about perfection, it's about celebrating who you are."
              </p>
              <p className="text-rose-400 mt-4 text-sm tracking-widest uppercase">— Lotty</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
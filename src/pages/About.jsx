import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Heart, Sparkles, Leaf } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68a2f89bf8ba911443836d76/a9ea688a8_photo_0007.jpg"
            alt="Lotty's Vanity Founder"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-300 text-sm tracking-[0.3em] uppercase mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 max-w-2xl leading-tight"
          >
            Beauty That
            <br />
            <span className="italic text-rose-300">Empowers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg font-light max-w-xl leading-relaxed"
          >
            At Lotty's Vanity, we believe that makeup is more than just cosmetics—it's 
            a form of self-expression, confidence, and artistry.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#FDF9F7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-4">
                Our Mission
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                A New Era of
                <br />
                <span className="italic text-rose-400">Beauty Begins</span>
              </h2>
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p>
                  Get ready, beauty lovers – something extraordinary is on the horizon! 
                  Lotty's Vanity, the highly anticipated beauty brand, is preparing for 
                  its grand debut, promising a fusion of elegance and everyday glamour.
                </p>
                <p>
                  Our mission is simple: to create high-quality, accessible makeup that 
                  helps everyone feel confident and beautiful in their own skin. We believe 
                  beauty should be inclusive, empowering, and fun.
                </p>
                <p>
                  From lush lipsticks to radiant foundations, each product is crafted with 
                  care to make every person feel like a star in their own story.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68a2f89bf8ba911443836d76/2375cdb2f_photo_0011.jpg"
                alt="Lotty's Vanity Products"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-4"
            >
              What We Stand For
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif"
            >
              Our <span className="italic text-rose-400">Values</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: "Inclusivity",
                description: "Beauty products designed for everyone, celebrating all skin tones, types, and styles."
              },
              {
                icon: Sparkles,
                title: "Quality",
                description: "Premium ingredients and formulas that deliver stunning results you can trust."
              },
              {
                icon: Leaf,
                title: "Sustainability",
                description: "Cruelty-free and vegan products with eco-conscious packaging."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-rose-400" />
                </div>
                <h3 className="text-xl font-serif mb-4">{value.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Feature */}
      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68a2f89bf8ba911443836d76/505b1e8c6_photo_0012.jpg"
                alt="Lotty's Magazine"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-rose-300 text-sm tracking-[0.3em] uppercase mb-4">
                Featured In
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                Lotty's
                <span className="italic text-rose-300 ml-2">Magazine</span>
              </h2>
              <p className="text-white/70 font-light leading-relaxed mb-8">
                Our debut collection has been featured in Lotty's Magazine, showcasing our 
                commitment to bringing luxury beauty to everyone. Discover the products that 
                are making waves in the beauty industry.
              </p>
              <Link
                to={createPageUrl('Shop')}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-rose-50 transition-colors duration-300 group"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif italic text-gray-800 mb-8"
          >
            "Beauty is not about perfection, it's about celebrating who you are 
            and expressing your unique story through color, texture, and artistry."
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-rose-400 text-sm tracking-[0.3em] uppercase"
          >
            — Lotty, Founder
          </motion.p>
        </div>
      </section>
    </main>
  );
}
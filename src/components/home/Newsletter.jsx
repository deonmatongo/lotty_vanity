import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Welcome to Lotty\'s Vanity!');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-rose-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Stay Beautiful
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Join the <span className="italic text-rose-400">Vanity</span> List
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-light mb-10"
          >
            Be the first to know about new launches, exclusive offers, and beauty tips straight to your inbox.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-6 rounded-full border-gray-200 focus:border-rose-300 focus:ring-rose-300"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-14 px-8 rounded-full bg-black hover:bg-gray-800 text-sm tracking-widest uppercase"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
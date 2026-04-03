
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12 text-center">
            What People Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-card p-8 rounded-2xl border border-white/5 relative"
              >
                <Quote className="absolute top-8 right-8 text-accent/20 w-10 h-10" />
                <p className="text-gray-300 italic mb-6 relative z-10 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-accent/50" />
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

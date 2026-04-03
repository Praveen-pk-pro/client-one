
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-primary relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-white">
            <span className="text-accent">/</span> Technical Arsenal
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-card px-6 py-4 rounded-xl border border-white/5 hover:border-accent/20 hover:-translate-y-1 transition-all group"
              >
                <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

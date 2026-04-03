
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle, Loader2, Phone } from 'lucide-react';
import { USER_EMAIL, USER_PHONE, USER_LINKEDIN, USER_GITHUB } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current || !spotlightRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 80%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formspreeId = (import.meta as any).env.VITE_FORMSPREE_ID;
    if (!formspreeId) {
      alert('Form configuration error. Please check environment variables.');
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-primary relative overflow-hidden"
    >
      {/* Interactive Grid & Spotlight */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div ref={spotlightRef} className="absolute inset-0 pointer-events-none transition-opacity duration-300" />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Let’s Build Something <span className="text-gradient">Exceptional</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I’m currently available for freelance work and full-time opportunities. 
              Whether you have a question, a project idea, or just want to say hi, feel free to drop me a message!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent group hover:bg-white/10 transition-colors">
                  <Mail size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email Me</p>
                  <a href={`mailto:${USER_EMAIL}`} className="text-white font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{USER_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent group hover:bg-white/10 transition-colors">
                  <Phone size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Call Me</p>
                  <a href={`tel:${USER_PHONE.replace(/\s+/g, '')}`} className="text-white font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{USER_PHONE}</a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href={USER_GITHUB} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transform duration-300">
                <Github size={20} />
              </a>
              <a href={USER_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transform duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card/40 p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl relative backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:border-white/20 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:border-white/20 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary/30 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 hover:border-white/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg
                  ${status === 'success' 
                    ? 'bg-green-500/20 text-green-400 cursor-default border border-green-500/30' 
                    : 'bg-accent text-primary hover:bg-white'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending Message...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

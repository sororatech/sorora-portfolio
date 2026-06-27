'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mykabbgb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'EMAIL US',
      value: 'sororatech@gmail.com'
    },
    {
      icon: Phone,
      label: 'CALL US',
      value: '+254 712 345 678'
    },
    {
      icon: MapPin,
      label: 'OUR LOCATION',
      value: 'Addis Ababa • Nairobi • Remote'
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-start">

          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Get in touch
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-md mx-auto lg:mx-0">
              Have questions or ready to transform your business with AI automation?
              Our collective of engineers is ready to build your digital future.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 border border-purple-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 border border-white/10 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-black/40 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 px-6 rounded-lg bg-white text-black text-sm sm:text-base font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : submitStatus === 'success' ? (
                    <span>✓ Message Sent!</span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-xs sm:text-sm text-center bg-white/10 py-3 px-4 rounded-lg border border-white/20"
                  >
                    Thank you! Your message has been sent to Sorora Tech. We'll get back to you soon.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs sm:text-sm text-center bg-red-400/10 py-3 px-4 rounded-lg border border-red-400/20"
                  >
                    Something went wrong. Please try again or email us directly at sororatech@gmail.com
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
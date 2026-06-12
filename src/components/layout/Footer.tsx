import Link from 'next/link';
import { Send, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sorora: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Services', href: '#services' },
      { name: 'Contact Us', href: '#contact' },
    ],
    information: [
      { name: 'About Us', href: '#about' },
      { name: 'Contact Us', href: '#contact' },
    ],
    investments: [
      { name: 'About Us', href: '#about' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex justify-end space-x-4 mb-12">
          {/* Telegram */}
          <Link
            href="https://t.me/yourtelegram"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-pink-500/30 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
          >
            <Send className="w-4 h-4 text-pink-500 group-hover:text-white transition-colors" />
          </Link>
          
          {/* WhatsApp */}
          <Link
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-pink-500/30 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
          >
            <Phone className="w-4 h-4 text-pink-500 group-hover:text-white transition-colors" />
          </Link>
          
          {/* Email */}
          <Link
            href="mailto:your@email.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-pink-500/30 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 text-pink-500 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* SORORA Links */}
          <div>
            <h3 className="text-pink-500 font-bold text-sm tracking-widest mb-4">
              SORORA
            </h3>
            <ul className="space-y-3">
              {footerLinks.sorora.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INFORMATION Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest mb-4">
              INFORMATION
            </h3>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INVESTMENTS Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest mb-4">
              INVESTMENTS
            </h3>
            <ul className="space-y-3">
              {footerLinks.investments.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest mb-4">
              LEGAL
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="lg:col-span-1 lg:border-l lg:border-pink-500/30 lg:pl-8">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-white">HELLO THERE</span>
              <br />
              <span className="text-pink-400">LET&apos;S TALK?</span>
            </h2>
            <Link
              href="#contact"
              className="inline-block mt-6 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              CONTACT US
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-pink-500 font-bold text-lg">
                SORORA TECH
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              © {currentYear} SORORA TECH
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
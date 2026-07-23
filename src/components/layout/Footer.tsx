import Link from 'next/link';
import { Send, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sorora: [
      { name: 'Home', href: '/#home' },
      { name: 'About Us', href: '/#about' },
      { name: 'Projects', href: '/#projects' },
      { name: 'Services', href: '/#services' },
      { name: 'Contact Us', href: '/#contact' },
    ],
    information: [
      { name: 'About Us', href: '/#about' },
      { name: 'Contact Us', href: '/#contact' },
    ],
    investments: [
      { name: 'About Us', href: '/#about' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Social Icons - Centered on mobile, right-aligned on desktop */}
        <div className="flex justify-center sm:justify-end space-x-3 sm:space-x-4 mb-10 sm:mb-12">
          {/* Telegram */}
          <Link
            href="https://t.me/sororatech"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-pink-500/30 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 group-hover:text-white transition-colors" />
          </Link>
          
          {/* WhatsApp */}
          <Link
            href="https://wa.me/251994941164"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-pink-500/30 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 group-hover:text-white transition-colors" />
          </Link>
          
          {/* Email */}
          <Link
            href="mailto:sororatech@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-pink-500/30 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 group"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Main Footer Content - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          
          {/* SORORA Links */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-pink-500 font-bold text-xs sm:text-sm tracking-widest mb-3 sm:mb-4">
              SORORA
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.sorora.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INFORMATION Links */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm tracking-widest mb-3 sm:mb-4">
              INFORMATION
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INVESTMENTS Links */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm tracking-widest mb-3 sm:mb-4">
              INVESTMENTS
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.investments.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL Links */}
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm tracking-widest mb-3 sm:mb-4">
              LEGAL
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA - Full width on mobile, normal on desktop */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 lg:border-l lg:border-pink-500/30 lg:pl-8 pt-6 sm:pt-0 border-t border-gray-800 lg:border-t-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center lg:text-left">
              <span className="text-white">HELLO THERE</span>
              <br />
              <span className="text-pink-400">LET&apos;S TALK?</span>
            </h2>
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/#contact"
                className="inline-block mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-pink-500 hover:bg-pink-600 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="order-2 sm:order-1">
              <span className="text-pink-500 font-bold text-base sm:text-lg">
                SORORA TECH
              </span>
            </div>
            <div className="text-gray-500 text-xs sm:text-sm order-1 sm:order-2">
              © {currentYear} SORORA TECH
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
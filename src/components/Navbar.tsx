import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'PROBLEM', href: '#problem' },
  { name: 'SOLUTION', href: '#solution' },
  { name: 'TECHNOLOGY', href: '#technology' },
  { name: 'PROTOTYPE', href: '#prototype' },
  { name: 'LIVE DEMO', href: '#live-demo' },
  { name: 'BUSINESS', href: '#business' },
  { name: 'ROADMAP', href: '#roadmap' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section.toUpperCase().replace('-', ' '));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12',
        isScrolled ? 'py-4 bg-[#0B0D0F]/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img 
            src="https://intellectual-peach-o5okbiyz.edgeone.dev/file.png" 
            alt="GripSync Logo" 
            className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-xs font-bold tracking-widest transition-colors hover:text-[#C6FF00]',
                activeSection === link.name ? 'text-[#C6FF00]' : 'text-[#9AA4AC]'
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href="#live-demo"
            className="px-6 py-2 bg-[#C6FF00] text-[#0B0D0F] text-xs font-bold tracking-widest hover:bg-[#C6FF00]/90 transition-colors rounded-sm"
          >
            TRY LIVE DEMO
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0B0D0F] border-b border-white/10 p-6 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold tracking-widest text-[#9AA4AC] hover:text-[#00E5FF]"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#live-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 bg-[#00E5FF] text-[#0B0D0F] text-center text-xs font-bold tracking-widest rounded-sm"
            >
              TRY LIVE DEMO
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

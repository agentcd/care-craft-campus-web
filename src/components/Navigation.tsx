import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Increased threshold for better mobile behavior
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
          {/* School Name */}
          <div className={`text-base md:text-2xl font-bold flex-1 md:flex-none transition-colors duration-300 ${
            isScrolled ? 'text-foreground' : 'text-white'
          }`}>
            <span className="text-accent">Sunshine Valley</span> School
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`hover:text-accent transition-all duration-300 font-medium relative group hover:scale-105 transform ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`hover:text-accent hover:scale-105 transition-all duration-300 ${
                isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => window.open('tel:+918123456789')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
            <Button
              variant="default"
              size="sm"
              className="btn-accent hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection('#admissions')}
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden hover:text-accent hover:scale-110 transition-all duration-300 p-2 z-50 relative ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-border shadow-lg">
            <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-3 text-foreground hover:text-accent transition-all duration-300 font-medium hover:bg-accent/10 rounded-lg px-3"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    window.open('tel:+918123456789');
                    setIsOpen(false);
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
                <Button
                  variant="default"
                  className="w-full btn-accent hover:scale-105 transition-all duration-300"
                  onClick={() => scrollToSection('#admissions')}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
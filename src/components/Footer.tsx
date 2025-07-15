import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: '+91 8123456789',
      action: () => window.open('tel:+918123456789'),
    },
    {
      icon: Mail,
      text: 'info@sunshinevalley.edu',
      action: () => window.open('mailto:info@sunshinevalley.edu'),
    },
    {
      icon: MapPin,
      text: 'Sunshine Valley, Bangalore, Karnataka',
      action: () => window.open('https://maps.google.com/?q=Bangalore+Karnataka'),
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook',
      color: 'hover:text-blue-600',
    },
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram',
      color: 'hover:text-pink-600',
    },
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter',
      color: 'hover:text-blue-400',
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-max px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-accent">Sunshine Valley</span> School
              </h3>
              <p className="text-white/80 leading-relaxed">
                Where learning begins with care. We are committed to providing 
                holistic education that nurtures every child's potential in a 
                safe and supportive environment.
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <button
                    key={index}
                    onClick={info.action}
                    className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-300 text-left"
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span>{info.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-white hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Programs</h4>
            <ul className="space-y-3 text-white/80">
              <li>Nursery & Pre-Primary</li>
              <li>Primary Education</li>
              <li>Secondary Education</li>
              <li>Sports & Activities</li>
              <li>Arts & Music</li>
              <li>STEM Programs</li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      className="border-white/50 text-white bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300"
                      onClick={() => window.open(social.href)}
                    >
                      <Icon className="w-5 h-5" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-white/80 mb-4">Get latest news and updates</p>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white"
                onClick={() => scrollToSection('#contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-light border-t border-white/10">
        <div className="container-max px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/80">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span>© {currentYear} Sunshine Valley School. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span>Powered by</span>
              <span className="text-accent font-medium">InnovateIT Labs</span>
              <Heart className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
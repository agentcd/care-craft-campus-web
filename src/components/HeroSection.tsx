import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroImage from '@/assets/hero-school.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <img
          src={heroImage}
          alt="Students learning together"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            A Place Where Learning{' '}
            <span className="text-gradient bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Begins with Care
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            We believe in holistic education and personal growth for every child in our nurturing community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="btn-accent text-lg px-10 py-6 hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection('#admissions')}
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 border-white text-white bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection('#about')}
            >
              Explore School
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => scrollToSection('#about')}
            className="text-white/70 hover:text-white transition-all duration-300 flex flex-col items-center space-y-2 hover:scale-110 transform"
          >
            <span className="text-sm font-medium">Discover More</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
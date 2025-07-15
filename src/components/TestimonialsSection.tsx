import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Parent of Class 5 Student',
      content: 'The teachers are incredibly supportive and my child is thriving in this nurturing environment. The holistic approach to education here is truly remarkable.',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'Parent of Class 3 Student',
      content: 'Sunshine Valley School provides a beautiful and value-focused environment. My daughter looks forward to going to school every day!',
      rating: 5,
    },
    {
      name: 'Anjali Patel',
      role: 'Parent of Class 7 Student',
      content: 'The innovative teaching methods and experienced faculty have helped my son develop confidence and a genuine love for learning.',
      rating: 5,
    },
    {
      name: 'Vikram Reddy',
      role: 'Parent of LKG Student',
      content: 'As new parents, we were worried about our child\'s first school experience. The caring staff made the transition smooth and joyful.',
      rating: 5,
    },
    {
      name: 'Meera Nair',
      role: 'Parent of Class 9 Student',
      content: 'The school\'s focus on both academic excellence and character development has prepared my daughter well for her future challenges.',
      rating: 5,
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000); // Resume after 10 seconds

      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  return (
    <section 
      id="testimonials" 
      className="section-padding bg-gradient-to-br from-primary/5 to-accent/5"
      ref={sectionRef}
    >
      <div className="container-max">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            What <span className="text-accent">Parents Say</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our school community about their experiences with Sunshine Valley School
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`}>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="w-16 h-16 text-accent" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10 text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 min-h-[120px] flex items-center justify-center">
                <p className="italic">"{testimonials[currentIndex].content}"</p>
              </blockquote>

              {/* Author */}
              <div>
                <h4 className="text-xl font-semibold text-primary mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-accent font-medium">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-110 border-primary/20 hover:border-primary/40 transition-all duration-300"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-110 border-primary/20 hover:border-primary/40 transition-all duration-300"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentIndex
                      ? 'bg-accent scale-125'
                      : 'bg-accent/30 hover:bg-accent/50'
                  }`}
                />
              ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-accent/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-100 ease-linear"
                style={{
                  width: isAutoPlaying 
                    ? `${((Date.now() % 4000) / 4000) * 100}%`
                    : '0%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <p className="text-lg text-muted-foreground mb-6">
            Ready to join our school community?
          </p>
          <Button
            size="lg"
            className="btn-accent text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
            onClick={() => {
              const element = document.querySelector('#admissions');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start Your Admission Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
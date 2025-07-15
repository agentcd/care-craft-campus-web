import { useEffect, useState, useRef } from 'react';
import { Heart, Lightbulb, Users, Award, BookOpen, Shield } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Heart,
      title: 'Child-First Education',
      description: 'Every decision we make prioritizes the well-being and development of each child.',
    },
    {
      icon: Lightbulb,
      title: 'Innovative Teaching',
      description: 'Modern pedagogical approaches that make learning engaging and effective.',
    },
    {
      icon: Users,
      title: 'Experienced Staff',
      description: 'Dedicated educators with years of experience in nurturing young minds.',
    },
    {
      icon: Award,
      title: 'Excellence in Academics',
      description: 'Consistent track record of academic achievements and student success.',
    },
    {
      icon: BookOpen,
      title: 'Holistic Development',
      description: 'Focus on academic, social, emotional, and physical growth of students.',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'Secure and supportive atmosphere where children can learn and grow confidently.',
    },
  ];

  return (
    <section 
      id="about" 
      className="section-padding bg-secondary/50"
      ref={sectionRef}
    >
      <div className="container-max">
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About <span className="text-accent">Our School</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Sunshine Valley School, we are committed to creating an environment where every child 
            can discover their potential, build confidence, and develop a lifelong love for learning.
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`bg-white rounded-2xl p-6 md:p-12 shadow-lg mb-8 md:mb-16 transition-all duration-1000 delay-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
          isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`}>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              To provide quality education that nurtures the intellectual, emotional, and social 
              development of each student, preparing them to become confident, creative, and 
              responsible global citizens.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className={`bg-white p-6 md:p-8 rounded-xl card-hover transition-all duration-1000 group cursor-pointer hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-primary mb-4 group-hover:scale-105 transition-transform duration-300">
                    {highlight.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className={`mt-8 md:mt-16 text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <h3 className="text-3xl font-semibold text-primary mb-8">
            Our Core Values
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['Respect', 'Integrity', 'Excellence', 'Compassion', 'Innovation', 'Responsibility'].map((value) => (
              <span
                key={value}
                className="bg-accent/10 text-accent px-6 py-3 rounded-full font-medium hover:bg-accent/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
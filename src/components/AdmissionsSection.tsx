import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, MessageCircle, CheckCircle, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdmissionsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    contactNumber: '',
    classApplying: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.contactNumber || !formData.classApplying) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required for admission inquiry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Request Submitted Successfully!",
      description: "We will contact you within 24 hours for further details.",
    });

    setFormData({ parentName: '', contactNumber: '', classApplying: '' });
    setIsSubmitting(false);
  };

  const classes = [
    'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 
    'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ];

  return (
    <section 
      id="admissions" 
      className="section-padding bg-gradient-to-br from-accent-soft to-white"
      ref={sectionRef}
    >
      <div className="container-max">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-6">
            <GraduationCap className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            🎓 Admissions <span className="text-accent">Open</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our learning community where every child's potential is nurtured and celebrated.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-accent-soft rounded-xl hover:bg-accent/10 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Call Us</p>
                    <button
                      onClick={() => window.open('tel:+918123456789')}
                      className="text-accent hover:text-accent-light transition-colors duration-300 font-medium"
                    >
                      +91 8123456789
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">WhatsApp</p>
                    <button
                      onClick={() => window.open('https://wa.me/918123456789?text=Hi! I am interested in admission at Sunshine Valley School.')}
                      className="text-green-700 hover:text-green-800 transition-colors duration-300 font-medium"
                    >
                      Chat with us
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-xl">
                <h4 className="font-semibold text-primary mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                  Admission Benefits
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                    Free trial classes for new students
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                    Personalized learning assessment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                    Family orientation program
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                    Flexible payment options
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Request a Callback
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="parentName" className="text-primary font-medium">
                    Parent/Guardian Name *
                  </Label>
                  <Input
                    id="parentName"
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Enter your full name"
                    className="mt-2 input-glow"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactNumber" className="text-primary font-medium">
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="Enter your mobile number"
                    className="mt-2 input-glow"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="classApplying" className="text-primary font-medium">
                    Class Applying For *
                  </Label>
                  <Select
                    value={formData.classApplying}
                    onValueChange={(value) => setFormData({ ...formData, classApplying: value })}
                  >
                    <SelectTrigger className="mt-2 input-glow">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary py-6 text-lg ${
                    isSubmitting ? 'animate-pulse' : 'hover:animate-pulse'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Request a Callback'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Our admission counselor will contact you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
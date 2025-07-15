import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AdmissionsSection from '@/components/AdmissionsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FloatingActionButton from '@/components/FloatingActionButton';
import Footer from '@/components/Footer';

const SchoolLanding = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-14 md:pt-0">
        <HeroSection />
      <AboutSection />
      <AdmissionsSection />
      <GallerySection />
      <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
      <FloatingActionButton />
    </div>
  );
};

export default SchoolLanding;
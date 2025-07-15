import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  onLoadComplete: () => void;
}

const LoadingOverlay = ({ onLoadComplete }: LoadingOverlayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.classList.add('overflow-hidden');

    const checkLoadingComplete = () => {
      // Check if DOM is ready
      if (document.readyState !== 'complete') {
        return false;
      }

      // Check if all images are loaded
      const images = document.querySelectorAll('img');
      const imagesLoaded = Array.from(images).every(img => img.complete && img.naturalHeight !== 0);

      // Check if fonts are loaded
      const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve();

      return imagesLoaded && fontsLoaded;
    };

    const handleLoad = async () => {
      // Wait for document to be complete
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleLoad);
        return;
      }

      // Wait for all images to load
      const images = Array.from(document.querySelectorAll('img'));
      const imagePromises = images.map(img => {
        if (img.complete) return Promise.resolve();
        
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to prevent hanging
        });
      });

      // Wait for fonts to load
      const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

      try {
        await Promise.all([...imagePromises, fontPromise]);
        
        // Add a small delay for smooth UX
        setTimeout(() => {
          setFadeOut(true);
          
          // Complete the loading process after fade animation
          setTimeout(() => {
            setIsLoading(false);
            document.body.classList.remove('overflow-hidden'); // Re-enable scrolling
            onLoadComplete();
          }, 300); // Match the fade-out duration
        }, 500); // Minimum loading time for smooth experience
        
      } catch (error) {
        console.warn('Loading check encountered an error:', error);
        // Fallback: remove loading after timeout
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setIsLoading(false);
            document.body.classList.remove('overflow-hidden');
            onLoadComplete();
          }, 300);
        }, 2000);
      }
    };

    // Start the loading check
    handleLoad();

    // Cleanup
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('DOMContentLoaded', handleLoad);
    };
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="relative mb-8">
          {/* Main spinner */}
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          
          {/* Outer ring for enhanced visual effect */}
          <div className="absolute inset-0 w-12 h-12 mx-auto border-2 border-muted rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground animate-pulse">
            Loading Sunshine Valley School
          </h3>
          <p className="text-sm text-muted-foreground animate-fade-in">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
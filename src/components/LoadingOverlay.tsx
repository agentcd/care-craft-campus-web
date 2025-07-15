import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { usePageLoaded } from '@/hooks/usePageLoaded';

interface LoadingOverlayProps {
  onLoadComplete: () => void;
}

const LoadingOverlay = ({ onLoadComplete }: LoadingOverlayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { setPageLoaded } = usePageLoaded();

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const checkPageLoad = () => {
      // Check if document is ready
      if (document.readyState === 'complete') {
        // Additional check for images and fonts
        Promise.all([
          // Wait for fonts to load
          document.fonts.ready,
          // Wait for images to load
          ...Array.from(document.images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // Resolve even on error to prevent hanging
            });
          })
        ]).then(() => {
          // Add a minimum loading time for smooth UX
          setTimeout(() => {
            setFadeOut(true);
            // Update page loaded state before enabling scrolling
            setPageLoaded(true);
            // Enable scrolling after fade starts
            setTimeout(() => {
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
              setIsLoading(false);
              onLoadComplete();
            }, 500);
          }, 1000);
        });
      } else {
        // If document not ready, wait a bit and check again
        setTimeout(checkPageLoad, 100);
      }
    };

    // Start checking
    checkPageLoad();

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [onLoadComplete, setPageLoaded]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ 
        background: 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--secondary)))' 
      }}
    >
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <div className="absolute -inset-2 bg-primary/20 rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-lg text-muted-foreground font-medium tracking-wide">
          Loading...
        </p>
        
        {/* Subtle animated dots */}
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
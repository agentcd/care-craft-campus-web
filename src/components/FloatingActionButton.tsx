import { useState } from 'react';
import { MessageCircle, Phone, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => window.open('https://wa.me/918123456789?text=Hi! I am interested in learning more about Sunshine Valley School.'),
      bgColor: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-white',
    },
    {
      icon: Phone,
      label: 'Call Us',
      action: () => window.open('tel:+918123456789'),
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      iconColor: 'text-white',
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-scale-in">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="hidden sm:block bg-white text-primary px-3 py-1 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap hover:bg-accent/5 hover:scale-105 transition-all duration-300 cursor-default">
                  {action.label}
                </span>
                <Button
                  size="icon"
                  className={`w-12 h-12 rounded-full shadow-lg ${action.bgColor} hover:scale-110 transition-all duration-300 border-0`}
                  onClick={action.action}
                >
                  <Icon className={`w-5 h-5 ${action.iconColor}`} />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="icon"
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl transition-all duration-300 border-0 ${
          isOpen 
            ? 'bg-accent hover:bg-accent/80 rotate-45' 
            : 'bg-primary hover:bg-primary/80 hover:scale-110'
        }`}
        onClick={toggleMenu}
        style={{
          boxShadow: isOpen 
            ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
            : '0 4px 20px rgba(220, 100, 15, 0.4)',
        }}
        aria-label={isOpen ? 'Close menu' : 'Open contact menu'}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </Button>

      {/* Pulse Animation Ring */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping pointer-events-none"></div>
      )}
    </div>
  );
};

export default FloatingActionButton;
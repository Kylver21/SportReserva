import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  slideInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function Carousel({ 
  children, 
  autoSlide = true, 
  slideInterval = 4000,
  showDots = true,
  showArrows = true 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoSlide && children.length > 1) {
      const interval = setInterval(goToNext, slideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, slideInterval, children.length]);

  if (children.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
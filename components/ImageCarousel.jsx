import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageCarousel = ({ 
  images, 
  height = "500px",
  autoPlayInterval = 5000,
  showCaption = true,
  showControls = true,
  showDots = true,
  showPlayPause = true,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && autoPlayInterval > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={`relative w-full group ${className}`} 
      style={{ height }}
      role="region" 
      aria-label="Image carousel"
    >
      {/* Main Image */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || ''}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-500"
          priority={currentIndex === 0}
        />
        
        {/* Caption */}
        {showCaption && images[currentIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 backdrop-blur-sm">
            <p className="text-center text-lg font-semibold">
              {images[currentIndex].caption}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {showControls && (
        <>
          <button
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all duration-200"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all duration-200"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index}
            />
          ))}
        </div>
      )}

      {/* Play/Pause Button */}
      {showPlayPause && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
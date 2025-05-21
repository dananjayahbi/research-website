'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SlideShowSection() {
  const slides = [
    {
      id: 1,
      imageUrl: "/images/slideshow/slide1.jpg",
      title: "Research in Progress",
      description: "Our team collecting data in the field"
    },
    {
      id: 2,
      imageUrl: "/images/slideshow/slide2.jpg",
      title: "Lab Analysis",
      description: "Processing samples in our state-of-the-art laboratory"
    },
    {
      id: 3,
      imageUrl: "/images/slideshow/slide3.jpg",
      title: "Team Meeting",
      description: "Collaborative discussions to interpret research findings"
    },
    {
      id: 4,
      imageUrl: "/images/slideshow/slide4.jpg",
      title: "Conference Presentation",
      description: "Sharing our research with the scientific community"
    },
    {
      id: 5,
      imageUrl: "/images/slideshow/slide5.jpg",
      title: "Technology Integration",
      description: "Using advanced technology to enhance our research capabilities"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Research Gallery</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Visual documentation of our research journey and milestones.
        </p>
        
        <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px]">
          {/* Placeholder for slideshow images */}
          <div className="relative h-full w-full rounded-xl overflow-hidden shadow-xl">
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))` 
              }}
            >
              <div className="text-center text-white p-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{slides[currentSlide].title}</h3>
                <p className="text-lg md:text-xl">{slides[currentSlide].description}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

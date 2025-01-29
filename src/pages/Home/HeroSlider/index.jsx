import React, { useState, useEffect } from 'react';
import './HeroSlider.css';
import hero1 from '../../../assets/images/hero-1.jpg';
import hero2 from '../../../assets/images/hero-2.jpg';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: "Transform Your Future",
      subtitle: "Access quality education from anywhere"
    },
    {
      image: hero2,
      title: "Learn at Your Own Pace",
      subtitle: "Professional courses designed for your success"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider; 
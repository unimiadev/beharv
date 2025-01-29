import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './CourseCard.css';
import defaultImage from '../../../assets/images/logo-beharv.png';

const CourseCard = ({ course }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleNavigate = () => {
    const courseSlug = course.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
    
    console.log('CourseCard - Navigating to course:', {
      title: course.title,
      id: course.id,
      slug: courseSlug
    });
    
    navigate(`/courses/${courseSlug}`, { 
      state: { 
        courseId: course.id,
        fromCourses: true
      } 
    });
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={`star-${i}`} className="star full">★</span>);
      } else if (i === fullStars && decimal > 0) {
        stars.push(
          <span key={`star-${i}`} className="star partial">
            <span 
              className="star-fill" 
              style={{ width: `${Math.round(decimal * 100)}%` }}
            >
              ★
            </span>
            <span className="star-empty">☆</span>
          </span>
        );
      } else {
        stars.push(<span key={`star-${i}`} className="star empty">☆</span>);
      }
    }
    
    return stars;
  };

  return (
    <div 
      id={`course-${course.id}`}
      className="course-card"
    >
      <div 
        className="course-image"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={course.image || defaultImage}
          alt={course.title}
          onError={handleImageError}
          loading="lazy"
          className={imageError ? 'default-image' : ''}
        />
      </div>
      <div className="course-info">
        <div className="course-details">
          <div className="rating">
            <div className="stars">{renderStars(course.rating)}</div>
            <span className="rating-number">{course.rating.toFixed(2)}</span>
            <span className="rating-count">({course.ratingCount} {t('courses.card.reviews')})</span>
          </div>
          <h3 
            className="course-title"
            onClick={handleNavigate}
            role="button"
            tabIndex={0}
          >
            {course.title}
          </h3>
          <div className="course-meta-info">
            <div className="provider-info">
              <img 
                src={course.provider.image} 
                alt={course.provider.name}
                className="provider-avatar"
              />
              <span className="provider-name">{course.provider.name}</span>
            </div>
            <div className="duration">
              <i className="fas fa-clock"></i>
              <span>{course.duration} {t('courses.card.hours')}</span>
            </div>
          </div>
          <button 
            className="enroll-button"
            onClick={handleNavigate}
          >
            {t('courses.card.enrollButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 
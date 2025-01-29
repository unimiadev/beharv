import React from 'react';
import { Link } from 'react-router-dom';
import './CourseAccess.css';
import { useLanguage } from '../../../context/LanguageContext';

const CourseAccess = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: "fas fa-certificate",
      titleKey: "courseAccess.features.certification.title",
      descriptionKey: "courseAccess.features.certification.description"
    },
    {
      icon: "fas fa-clock",
      titleKey: "courseAccess.features.pace.title",
      descriptionKey: "courseAccess.features.pace.description"
    },
    {
      icon: "fas fa-globe",
      titleKey: "courseAccess.features.access.title",
      descriptionKey: "courseAccess.features.access.description"
    }
  ];

  return (
    <section className="course-access">
      <div className="animated-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <div className="course-access-container">
        <div className="content-wrapper">
          <h2>{t('courseAccess.title')}</h2>
          <p>{t('courseAccess.subtitle')}</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <div className="feature-text">
                  <span className="feature-title">{t(feature.titleKey)}</span>
                  <span className="feature-description">{t(feature.descriptionKey)}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/courses" className="access-button">
            {t('courseAccess.button')}
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="decorative-element">
          <div className="circle-pattern">
            <div className="circle c1"></div>
            <div className="circle c2"></div>
            <div className="circle c3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseAccess; 
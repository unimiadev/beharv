import React from 'react';
import './FeatureCards.css';
import { useLanguage } from '../../../context/LanguageContext';

const FeatureCards = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: "fas fa-graduation-cap",
      titleKey: "features.certification.title",
      descriptionKey: "features.certification.description"
    },
    {
      icon: "fas fa-laptop",
      titleKey: "features.onlineLearning.title",
      descriptionKey: "features.onlineLearning.description"
    },
    {
      icon: "fas fa-users",
      titleKey: "features.expertInstructors.title",
      descriptionKey: "features.expertInstructors.description"
    }
  ];

  return (
    <section className="feature-cards">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <i className={feature.icon}></i>
            </div>
            <h3>{t(feature.titleKey)}</h3>
            <p>{t(feature.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards; 
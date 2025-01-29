import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  const sections = [
    {
      id: 1,
      title: t('about.sections.mission.title'),
      content: t('about.sections.mission.content')
    },
    {
      id: 2,
      title: t('about.sections.vision.title'),
      content: t('about.sections.vision.content')
    },
    {
      id: 3,
      title: t('about.sections.values.title'),
      content: t('about.sections.values.content')
    }
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <div className="header-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-line"></div>
          </div>
          <h1 className="about-title">{t('about.title')}</h1>
          <div className="title-underline"></div>
          <p className="header-subtitle">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="sections-container">
          {sections.map((section) => (
            <div key={section.id} className="about-section">
              <div className="content-wrapper">
                <span className="section-number">0{section.id}</span>
                <div className="content-header">
                  <h2>{section.title}</h2>
                  <div className="section-decoration"></div>
                </div>
                <div className="about-content">
                  <p>{section.content}</p>
                </div>
                <div className="geometric-pattern">
                  <div className="pattern-circle"></div>
                  <div className="pattern-line"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="background-decoration">
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
        <div className="decoration-shape shape-3"></div>
      </div>
    </div>
  );
};

export default About; 
import React from 'react';
import './HeroSection.css';
import girlImage from '../../../assets/images/girl-beharv.png';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            {t('hero.title.part1')}{' '}
            <span className="highlight">{t('hero.title.highlight')}</span>
            <br />
            {t('hero.title.part2')}
          </h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-buttons">
            <Link to="/courses" className="primary-button">
              {t('hero.buttons.explore')}
            </Link>
            <Link to="/about" className="secondary-button">
              {t('hero.buttons.learnMore')}
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">{t('hero.stats.students')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">{t('hero.stats.courses')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">{t('hero.stats.successRate')}</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={girlImage} alt="Student learning" />
          <div className="floating-card card-1">
            <i className="fas fa-graduation-cap"></i>
            <span>{t('hero.cards.certification')}</span>
          </div>
          <div className="floating-card card-2">
            <i className="fas fa-star"></i>
            <span>{t('hero.cards.expertLed')}</span>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </section>
  );
};

export default HeroSection; 
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './Footer.css';
import logo from '../../../assets/images/logo-beharv.png';

const Footer = () => {
  const { t } = useLanguage();

  return ( 
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column brand-column">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p className="brand-description">
            {t('footer.brand.description')}
          </p>
        </div>

        <div className="footer-column">
          <h3>{t('footer.sections.institutional.title')}</h3>
          <ul className="footer-links">
            <li>
              <Link to="/about">{t('footer.sections.institutional.about')}</Link>
            </li>
            <li>
              <Link to="/terms">{t('footer.sections.institutional.terms')}</Link>
            </li>
            <li>
              <Link to="/privacy">{t('footer.sections.institutional.privacy')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('footer.sections.institutional.contact')}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>{t('footer.sections.useful.title')}</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">{t('footer.sections.useful.panel')}</Link>
            </li>
            <li>
              <Link to="/courses">{t('footer.sections.useful.courses')}</Link>
            </li>
            <li>
              <div className="social-links">
                <h3>{t('footer.sections.useful.social')}</h3>
                <div className="social-icons">
                  <a href="https://www.facebook.com/seucursodigital10" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com/seucursodigital_/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer; 
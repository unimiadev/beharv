import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    window.location.href = 'https://scd3.expertvision.com.br/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <button 
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={t('navigation.menu.menu')}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="mobile-nav-items">
              <li><Link to="/" onClick={closeMenu}>{t('navigation.menu.home')}</Link></li>
              <li><Link to="/courses" onClick={closeMenu}>{t('navigation.menu.courses')}</Link></li>
              <li><Link to="/about" onClick={closeMenu}>{t('navigation.menu.about')}</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>{t('navigation.menu.contact')}</Link></li>
              <li>
                <Link to="/" className="cta-button" onClick={handleLogin}>
                  {t('navigation.menu.login')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <ul className="nav-menu">
          <li><Link to="/">{t('navigation.menu.home')}</Link></li>
          <li><Link to="/courses">{t('navigation.menu.courses')}</Link></li>
          <li><Link to="/about">{t('navigation.menu.about')}</Link></li>
          <li><Link to="/contact">{t('navigation.menu.contact')}</Link></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/" className="cta-button" onClick={handleLogin}>
            {t('navigation.menu.login')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
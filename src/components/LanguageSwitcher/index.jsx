import React, { useState, useRef, useEffect } from 'react';
import './LanguageSwitcher.css';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = {
    en: { name: 'English', flag: '🇺🇸', shortName: 'EN' },
    es: { name: 'Español', flag: '🇪🇸', shortName: 'ES' }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode, e) => {
    e.preventDefault(); // Prevent default behavior
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className={`language-button ${isOpen ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <div className="button-content">
          <span className="flag">{languages[language].flag}</span>
          <span className="language-name">{languages[language].shortName}</span>
          <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              className={`language-option ${language === code ? 'active' : ''}`}
              onClick={(e) => handleLanguageChange(code, e)}
              aria-label={`Switch to ${name}`}
            >
              <div className="option-content">
                <span className="flag">{flag}</span>
                <span className="language-name">{name}</span>
                {language === code && (
                  <span className="check-icon">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 
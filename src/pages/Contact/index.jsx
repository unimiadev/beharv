import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5554996825784', '_blank');
  };

  return (
    <div>
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <h1>{t('contact.title')}</h1>
            <div className="header-underline"></div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <p>
                {t('contact.description')}
              </p>

              <p className="contact-methods">
                {t('contact.methods.title')}
              </p>

              <div className="contact-email">
                <strong>{t('contact.methods.email')}</strong> contact@beharv.com
              </div>

              <button 
                className="whatsapp-button"
                onClick={handleWhatsAppClick}
              >
                <i className="fab fa-whatsapp"></i>
                {t('contact.methods.whatsapp')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 
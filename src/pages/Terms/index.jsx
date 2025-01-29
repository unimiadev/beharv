import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Terms.css';

const Terms = () => {
  const { t } = useLanguage();

  const sections = [
    'introduction',
    'changes',
    'eligibility',
    'account',
    'content',
    'payments',
    'usage',
    'liability',
    'thirdParty',
    'privacy',
    'law',
    'contact'
  ];

  return (
    <div>
      <div className="terms-page">
        <div className="terms-container">
          <h1>{t('terms.title')}</h1>
          
          {sections.map((section) => (
            <section key={section} className="terms-section">
              <h2>{t(`terms.sections.${section}.title`)}</h2>
              <p>{t(`terms.sections.${section}.content`)}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms; 
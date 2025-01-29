import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Privacy.css';

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="privacy-page">
        <div className="privacy-container">
          <h1>{t('privacy.title')}</h1>
          
          <section className="privacy-section">
            <p>
              {t('privacy.sections.introduction.content')}
            </p>
            
            <p>
              {t('privacy.sections.dataCollection.content')}
            </p>

            <h2>{t('privacy.sections.cookies.title')}</h2>
            <h3>{t('privacy.sections.cookies.subtitle')}</h3>
            <p>
              {t('privacy.sections.cookies.content')}
            </p>

            <h2>{t('privacy.sections.userCommitment.title')}</h2>
            <p>
              {t('privacy.sections.userCommitment.content')}
            </p>
            <ul>
              <li>{t('privacy.sections.userCommitment.list.a')}</li>
              <li>{t('privacy.sections.userCommitment.list.b')}</li>
              <li>{t('privacy.sections.userCommitment.list.c')}</li>
            </ul>

            <h2>{t('privacy.sections.moreInfo.title')}</h2>
            <p>
              {t('privacy.sections.moreInfo.content')}
            </p>
            <p>
              {t('privacy.sections.moreInfo.effective')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 
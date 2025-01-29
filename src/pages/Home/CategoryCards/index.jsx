import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCards.css';
import { useLanguage } from '../../../context/LanguageContext';

// Import all category images
import beautyImage from '../../../assets/images/card-beleza.png';
import healthImage from '../../../assets/images/card-saude.jpg';
import itImage from '../../../assets/images/card-informatica.jpg';
import adminImage from '../../../assets/images/card-administracao.jpg';
import languagesImage from '../../../assets/images/card-idiomas.jpg';

const CategoryCards = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();


  const categories = [
    {
      image: beautyImage,
      title: t('categories.items.beauty.title'),
      slug: 'beauty-and-aesthetics'
    },
    {
      image: healthImage,
      title: t('categories.items.health.title'),
      slug: 'health'
    },
    {
      image: itImage,
      title: t('categories.items.it.title'),
      slug: 'information-technology'

    },
    {
      image: adminImage,
      title: t('categories.items.admin.title'),
      slug: 'administration-and-management'

    },
    {
      image: languagesImage,
      title: t('categories.items.languages.title'),
      slug: 'languages'
    }
  ];

  const handleCategoryClick = (categorySlug) => {
    navigate(`/courses?category=${categorySlug}`);
  };

  return (
    <section className="category-cards-section">
    <div className="category-cards-container">
      <h2>{t('categories.title')}</h2>
      <div className="category-cards-grid">
      {categories.map((category, index) => (
            <div
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(category.slug)}
          >
            <div className="category-image-container">
              <img 
                src={category.image} 
                alt={category.title} 
                className="category-image"
              />
              <div className="category-title-overlay">
                <h3>{category.title}</h3>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards; 
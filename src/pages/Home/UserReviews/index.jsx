import React from 'react';
import './UserReviews.css';
import { useLanguage } from '../../../context/LanguageContext';

const UserReviews = () => {
  const { t } = useLanguage();

  const reviews = [
    {
      id: 1,
      nameKey: "reviews.reviewers.clara.name",
      roleKey: "reviews.reviewers.clara.role",
      image: "https://cursos.seucursodigital.com/wp-content/uploads/2023/09/avaliacao01.jpg",
      textKey: "reviews.reviewers.clara.text",
      rating: 5
    },
    {
      id: 2,
      nameKey: "reviews.reviewers.nelson.name",
      roleKey: "reviews.reviewers.nelson.role",
      image: "https://cursos.seucursodigital.com/wp-content/uploads/2023/09/3cb4198a3e5657175dac22d9639c73e3.jpg",
      textKey: "reviews.reviewers.nelson.text",
      rating: 5
    },
    {
      id: 3,
      nameKey: "reviews.reviewers.maria.name",
      roleKey: "reviews.reviewers.maria.role",
      image: "https://cursos.seucursodigital.com/wp-content/uploads/2020/08/lab-customer-testimonial-13.jpg",
      textKey: "reviews.reviewers.maria.text",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating);
  };

  return (
    <section className="user-reviews">
      <div className="reviews-background">
        <div className="review-particle review-particle-1"></div>
        <div className="review-particle review-particle-2"></div>
        <div className="review-particle review-particle-3"></div>
      </div>
      
      <div className="user-reviews-container">
        <div className="reviews-header">
          <h2>{t('reviews.title')}</h2>
          <p className="reviews-subtitle">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-right"></i>
                </div>
                <div className="review-stars">{renderStars(review.rating)}</div>
                <p className="review-text">{t(review.textKey)}</p>
              </div>
              <div className="review-author">
                <div className="author-avatar">
                  <img src={review.image} alt={t(review.nameKey)} />
                </div>
                <div className="author-info">
                  <h4>{t(review.nameKey)}</h4>
                  <p>{t(review.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews; 
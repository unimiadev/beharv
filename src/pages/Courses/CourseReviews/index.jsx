import React from 'react';
import { useUserData } from '../../../hooks/useUserData';
import { formatDistanceToNow } from 'date-fns';
import { ptBR, es } from 'date-fns/locale';
import { useLanguage } from '../../../context/LanguageContext';
import './CourseReviews.css';

const formatReviewDate = (dateString, language) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');
  
  const date = new Date(year, month - 1, day, hours, minutes);
  
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: language === 'es' ? es : ptBR
  });
};

const RatingSummary = ({ reviews }) => {
  const { t } = useLanguage();
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  
  const ratingCounts = Array(5).fill(0);
  reviews.forEach(review => {
    ratingCounts[Math.floor(review.rating) - 1]++;
  });

  return (
    <div className="reviews-summary">
      <div className="rating-overview">
        <div className="average-rating">
          <span className="big-rating">{averageRating.toFixed(1)}</span>
          <div className="rating-stars">
            <span className="stars">{"★".repeat(Math.floor(averageRating))}</span>
            <span className="total-ratings">
              {t('courses.reviews.summary.totalRatings', { count: totalReviews })}
            </span>
          </div>
        </div>
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map(stars => (
            <div key={stars} className="rating-bar-item">
              <div className="stars-label">
                {t('courses.reviews.summary.starsLabel', { count: stars })}
              </div>
              <div className="rating-bar">
                <div 
                  className="rating-fill"
                  style={{ 
                    width: `${(ratingCounts[stars - 1] / totalReviews) * 100}%`
                  }}
                />
              </div>
              <div className="rating-count">
                {ratingCounts[stars - 1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const { userData, loading } = useUserData(review.userId);

  if (loading) {
    return <div className="review-item skeleton"></div>;
  }

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="avatar">
            {userData.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="reviewer-details">
            <div className="reviewer-name">{userData.fullName}</div>
            <div className="review-date">{formatReviewDate(review.date, 'es')}</div>
          </div>
        </div>
        <div className="review-rating">
          <span className="stars">{"★".repeat(Math.floor(review.rating))}</span>
          <span className="rating-number">{review.rating.toFixed(1)}</span>
        </div>
      </div>
      {review.description && (
        <div className="review-content">{review.description}</div>
      )}
    </div>
  );
};

const CourseReviews = ({ reviews }) => {
  const { t } = useLanguage();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        {t('courses.details.reviews.noReviews')}
      </div>
    );
  }

  return (
    <div className="course-reviews">
      <h3>{t('courses.details.reviews.title')}</h3>
      <RatingSummary reviews={reviews} />
      <div className="reviews-list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default CourseReviews; 
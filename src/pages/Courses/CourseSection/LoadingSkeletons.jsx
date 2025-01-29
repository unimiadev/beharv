import React from 'react';
import './LoadingSkeletons.css';

const LoadingSkeletons = () => {
  return (
    <section className="course-section">
      <div className="skeleton-title"></div>
      <div className="course-container">
        <div className="filters-section">
          <div className="skeleton-filter">
            <div className="skeleton-filter-title"></div>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="skeleton-filter-item"></div>
            ))}
          </div>
        </div>
        
        <div className="courses-content">
          <div className="skeleton-search-sort">
            <div className="skeleton-search"></div>
            <div className="skeleton-sort"></div>
          </div>
          
          <div className="course-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title-card"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-tags">
                    <div className="skeleton-tag"></div>
                    <div className="skeleton-tag"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeletons; 
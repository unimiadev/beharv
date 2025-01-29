import React from 'react';
import './LoadingSkeletons.css';

const LoadingSkeletons = () => {
  return (
    <div className="course-details-skeleton">
      <div className="hero-section-skeleton">
        <div className="container">
          <div className="hero-content">
            <div className="skeleton-breadcrumb"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-stats">
              {[1, 2, 3].map((item) => (
                <div key={item} className="skeleton-stat-item"></div>
              ))}
            </div>
          </div>
          <div className="hero-image-skeleton"></div>
        </div>
      </div>

      <div className="main-content-skeleton">
        <div className="container">
          {/* Tabs */}
          <div className="skeleton-tabs">
            {[1, 2, 3].map((item) => (
              <div key={item} className="skeleton-tab"></div>
            ))}
          </div>

          <div className="skeleton-description">
            {[1, 2, 3].map((item) => (
              <div key={item} className="skeleton-text-block"></div>
            ))}

            <div className="skeleton-modules">
              <div className="skeleton-module-title"></div>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="skeleton-module">
                  <div className="skeleton-module-header">
                    <div className="skeleton-module-number"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeletons; 
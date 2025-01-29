import React from 'react';
import Header from '../../components/layout/Header';
import HeroSection from './HeroSection';
import FeatureCards from './FeatureCards';
import CourseAccess from './CourseAccess';
import UserReviews from './UserReviews';
import Footer from '../../components/layout/Footer';
import CategoryCards from './CategoryCards';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main>
        <HeroSection />
        <FeatureCards />
        <CourseAccess />
        <CategoryCards />
        <UserReviews />
      </main>
    </div>
  );
};

export default LandingPage; 
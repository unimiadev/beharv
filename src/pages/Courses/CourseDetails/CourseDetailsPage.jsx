import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseModal from '../CourseModal';
import './CourseDetailsPage.css';

const CourseDetailsPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate('/', { state: { selectedCategory: categoryId } });
  };

  return (
    <div className="course-details-page">
      <CourseModal onCategoryClick={handleCategoryClick} />
    </div>
  );
};

export default CourseDetailsPage; 
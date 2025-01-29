import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseDetails from '../CourseDetails/index';
import './CourseModal.css';

const CourseModal = ({ onCategoryClick }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`course-modal-backdrop ${isClosing ? 'closing' : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className="course-modal-content">
        <CourseDetails onCategoryClick={onCategoryClick} />
      </div>
    </div>
  );
};

export default CourseModal; 
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import CourseCard from '../CourseCard/index';
import CategoryFilter from '../CategoryFilter/index';
import CoursesFilter from '../CoursesFilter/index';
import { useCategories } from '../../../hooks/useCategories';
import { useCourses } from '../../../hooks/useCourses';
import LoadingSkeletons from './LoadingSkeletons';
import './CourseSection.css';

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const CourseSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;

  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { courses, loading: coursesLoading, error: coursesError } = useCourses();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam && categories.length > 0) {
      const category = categories.find(cat => 
        cat.slug === categoryParam || 
        removeAccents(cat.name.toLowerCase()).replace(/\s+/g, '-') === categoryParam
      );
      
      if (category) {
        setSelectedCategories([category.id]);
      } else {
        setSelectedCategories([]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [location.search, categories]);

  const handleCategoryChange = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    let newSelectedCategories;
    
    if (selectedCategories.includes(categoryId)) {
      newSelectedCategories = [];
      navigate('/courses', { replace: true });
    } else {
      newSelectedCategories = [categoryId];
      const categorySlug = category.slug || 
        removeAccents(category.name.toLowerCase()).replace(/\s+/g, '-');
      navigate(`/courses?category=${categorySlug}`, { replace: true });
    }
    
    setSelectedCategories(newSelectedCategories);
    setCurrentPage(1);
  };

  const filterAndSortCourses = () => {
    let filteredCourses = [...courses];

    if (selectedCategories.length > 0) {
      filteredCourses = filteredCourses.filter(course => {
        const courseCategories = course.rawCategory.toLowerCase().split(/\s+e\s+|\s*,\s*/);
        return selectedCategories.some(categoryId => {
          const category = categories.find(cat => cat.id === categoryId);
          if (!category) return false;
          
          const categoryName = category.name.toLowerCase();
          return courseCategories.some(courseCategory => 
            courseCategory.includes(categoryName) || categoryName.includes(courseCategory)
          );
        });
      });
    }

    if (searchTerm) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'name-asc':
        filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        filteredCourses.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          if (ratingDiff === 0) {
            return b.ratingCount - a.ratingCount;
          }
          return ratingDiff;
        });
        break;
      case 'rating-asc':
        filteredCourses.sort((a, b) => {
          const ratingDiff = a.rating - b.rating;
          if (ratingDiff === 0) {
            return a.ratingCount - b.ratingCount;
          }
          return ratingDiff;
        });
        break;
      case 'duration-asc':
        filteredCourses.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-desc':
        filteredCourses.sort((a, b) => b.duration - a.duration);
        break;
      default:
        filteredCourses.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          if (ratingDiff === 0) {
            return b.ratingCount - a.ratingCount;
          }
          return ratingDiff;
        });
        break;
    }

    return filteredCourses;
  };

  const filteredAndSortedCourses = filterAndSortCourses();
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  useEffect(() => {
    if (location.state?.selectedCategories && location.state?.fromCourseDetails) {
      setSelectedCategories(location.state.selectedCategories);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (coursesLoading || categoriesLoading) {
    return <LoadingSkeletons />;
  }

  if (coursesError || categoriesError) {
    return <div className="error-message">{t('courses.errors.loading')}</div>;
  }

  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);
  const paginationButtons = [];

  if (currentPage > 1) {
    paginationButtons.push(
      <button key="first" onClick={() => setCurrentPage(1)}>
        1
      </button>
    );
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    paginationButtons.push(
      <button
        key="ellipsis"
        onClick={() => setCurrentPage(endPage + 1)}
        className="ellipsis"
      >
        ...
      </button>
    );
    paginationButtons.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={currentPage === totalPages ? 'active' : ''}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <section className="course-section">
      <h2>{t('courses.section.title')}</h2>
      <div className="course-container">
        <div className="filters-section">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="courses-content">
          <CoursesFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
          <div className="course-grid">
            {currentCourses.map(course => (
              <CourseCard 
                key={`course-${course.id}`}
                course={course} 
              />
            ))}
          </div>
          <div className="pagination">
            {paginationButtons}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection; 
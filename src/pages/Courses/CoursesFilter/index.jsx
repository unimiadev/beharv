import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './CoursesFilter.css';

const CoursesFilter = ({ searchTerm, onSearchChange, sortOption, onSortChange }) => {
  const { t } = useLanguage();

  return (
    <div className="courses-filter">
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder={t('courses.search.placeholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="sort-container">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="default">{t('courses.search.sortOptions.default')}</option>
          <option value="name-asc">{t('courses.search.sortOptions.nameAsc')}</option>
          <option value="name-desc">{t('courses.search.sortOptions.nameDesc')}</option>
          <option value="rating-desc">{t('courses.search.sortOptions.ratingDesc')}</option>
          <option value="rating-asc">{t('courses.search.sortOptions.ratingAsc')}</option>
          <option value="duration-asc">{t('courses.search.sortOptions.durationAsc')}</option>
          <option value="duration-desc">{t('courses.search.sortOptions.durationDesc')}</option>
        </select>
      </div>
    </div>
  );
};

export default CoursesFilter; 
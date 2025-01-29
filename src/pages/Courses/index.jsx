const filterCoursesByCategories = (courses, selectedCategories) => {
  if (!selectedCategories.length) return courses;
  
  return courses.filter(course => {
    const courseCategories = course.rawCategory
      .toLowerCase()
      .split(/,|\se\s/)
      .map(cat => cat.trim());

    return selectedCategories.some(selectedCat => {
      const normalizedSelectedCat = selectedCat
        .replace(/-/g, ' ')
        .toLowerCase();
      return courseCategories.some(courseCat => 
        courseCat.includes(normalizedSelectedCat)
      );
    });
  });
}; 
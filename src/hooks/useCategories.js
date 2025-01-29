import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useLanguage } from "../context/LanguageContext";

const CACHE_KEY = "categories_cache";
const CACHE_DURATION = 10 * 60 * 1000;

const getLocalCache = (language) => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${language}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
      localStorage.removeItem(`${CACHE_KEY}_${language}`);
    }
  } catch (error) {
    return null;
  }
  return null;
};

const setLocalCache = (data, language) => {
  try {
    localStorage.setItem(
      `${CACHE_KEY}_${language}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    return;
  }
};

export const useCategories = () => {
  const { language } = useLanguage();
  const [categories, setCategories] = useState(
    () => getLocalCache(language) || []
  );
  const [loading, setLoading] = useState(!getLocalCache(language));
  const [error, setError] = useState(null);

  const getCategoriesCollection = () => {
    return language === "es" ? "categoriasEsp" : "categoriasEng";
  };

  useEffect(() => {
    // Clear existing cache when language changes
    localStorage.removeItem(`${CACHE_KEY}_${language}`);
    const fetchCategories = async () => {
      try {
        const cachedData = getLocalCache(language);
        if (cachedData) {
          setCategories(cachedData);
          setLoading(false);
          return;
        }

        const categoriesRef = collection(db, getCategoriesCollection());
        const snapshot = await getDocs(categoriesRef);

        const categoriesData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setLocalCache(categoriesData, language);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

  return { categories, loading, error };
};

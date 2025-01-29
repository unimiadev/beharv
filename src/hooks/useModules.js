import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useLanguage } from "../context/LanguageContext";

export const useModules = (courseId) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const getLanguagePath = () => {
    return language === "es" ? "es_es" : "en_us";
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const langPath = getLanguagePath();
        const modulesRef = collection(
          db,
          `cursosMd/${courseId}/${langPath}/modulos/modulos`
        );
        const modulesSnapshot = await getDocs(modulesRef);

        const modulesData = modulesSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            title: doc.data().titulo,
          }))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id));

        setModules(modulesData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (courseId) {
      fetchModules();
    }
  }, [courseId, language]);

  return { modules, loading, error };
};

import React, { createContext, useState, useContext, useEffect } from "react";
import { translations } from "../translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get initial language from localStorage or default to 'en'
    return localStorage.getItem("language") || "en";
  });
  const [forceUpdate, setForceUpdate] = useState(0);

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const value = {
    language: currentLanguage,
    setLanguage: (lang) => {
      setCurrentLanguage(lang);
      setForceUpdate((prev) => prev + 1);
      // Force a re-render of components using translations
      window.dispatchEvent(new Event("languageChange"));
    },
    forceUpdate,
    t: (key, params = {}) => {
      try {
        const keys = key.split(".");
        let translation = translations[currentLanguage];

        for (const k of keys) {
          if (!translation || !translation[k]) {
            console.warn(
              `Translation missing for key: ${key} in language: ${currentLanguage}`
            );
            return key; // Return the key if translation is missing
          }
          translation = translation[k];
        }

        // Handle string interpolation if params are provided
        if (typeof translation === "string" && Object.keys(params).length > 0) {
          return translation.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
          });
        }

        return translation;
      } catch (error) {
        console.error(`Error getting translation for key: ${key}`, error);
        return key;
      }
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

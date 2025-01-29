import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const setupCategories = async () => {
  try {
    console.log("Starting categories setup...");

    const coursesRef = collection(db, "cursosMd");
    const coursesSnapshot = await getDocs(coursesRef);

    // Create Sets for each language
    const uniqueCategoriesEng = new Set();
    const uniqueCategoriesEsp = new Set();

    const normalizeCategory = (category) => {
      return category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    };

    const standardizeCategory = (category) => {
      const commonVariations = {
        "beauty aesthetics": "beauty and aesthetics",
        "business management": "business and management",
        // Add other variations as needed
      };

      const normalized = normalizeCategory(category);
      return commonVariations[normalized] || category;
    };

    for (const courseDoc of coursesSnapshot.docs) {
      // Get categories for English
      const enUsRef = doc(db, `cursosMd/${courseDoc.id}/en_us/curso`);
      const enUsDoc = await getDoc(enUsRef);

      // Get categories for Spanish
      const esEsRef = doc(db, `cursosMd/${courseDoc.id}/es_es/curso`);
      const esEsDoc = await getDoc(esEsRef);

      // Process English categories
      if (enUsDoc.exists()) {
        const courseData = enUsDoc.data();
        if (courseData.categoria) {
          const categories = courseData.categoria
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat.length > 0);

          categories.forEach((category) => {
            const standardizedCategory = standardizeCategory(category);
            uniqueCategoriesEng.add(standardizedCategory);
          });
        }
      }

      // Process Spanish categories
      if (esEsDoc.exists()) {
        const courseData = esEsDoc.data();
        if (courseData.categoria) {
          const categories = courseData.categoria
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat.length > 0);

          categories.forEach((category) => {
            const standardizedCategory = standardizeCategory(category);
            uniqueCategoriesEsp.add(standardizedCategory);
          });
        }
      }
    }

    console.log("Found unique categories (EN):", uniqueCategoriesEng);
    console.log("Found unique categories (ES):", uniqueCategoriesEsp);

    // Save categories for each language
    const categoriesCollections = [
      { name: "categoriasEng", categories: uniqueCategoriesEng },
      { name: "categoriasEsp", categories: uniqueCategoriesEsp },
    ];

    for (const { name, categories } of categoriesCollections) {
      const categoriesRef = collection(db, name);

      for (const categoryName of categories) {
        const docId = categoryName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        const categoryDoc = doc(categoriesRef, docId);
        await setDoc(categoryDoc, {
          name: categoryName,
          createdAt: new Date().toISOString(),
        });
        console.log(`Added category to ${name}:`, categoryName);
      }
    }

    console.log("Categories setup completed successfully!");
    return true;
  } catch (error) {
    console.error("Error setting up categories:", error);
    throw error;
  }
};

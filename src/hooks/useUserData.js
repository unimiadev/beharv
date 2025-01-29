import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, `usuarios/${userId}`);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            nome: data.nome,
            sobrenome: data.sobrenome || "",
            fullName: data.sobrenome
              ? `${data.nome} ${data.sobrenome}`
              : data.nome,
          });
        } else {
          setUserData({ fullName: "Anonymous User" });
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return { userData, loading, error };
};

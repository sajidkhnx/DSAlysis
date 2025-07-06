import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const QuestionsContext = createContext();

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("dsa_jwt");
      const res = await axios.get("http://localhost:5000/api/questions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuestions(res.data);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  React.useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <QuestionsContext.Provider value={{ questions, fetchQuestions, loading }}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  return useContext(QuestionsContext);
}

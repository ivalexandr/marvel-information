import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          body,
          method,
          headers,
        });
        if (!res.ok) throw new Error("Some error...");
        const data = await res.json();
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);

  return { isLoading, isError, request, clearError };
};

export { useHttp };

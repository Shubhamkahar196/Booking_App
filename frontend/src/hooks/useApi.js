import { useState } from "react";

/**
 * @description Custom hook for API POST requests with dynamic URLs,
 * automatically includes credentials for cookie-based auth.
 */
const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookie-based JWT
        body: JSON.stringify(body),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
          setData(result);
          return result;
        } else {
          return { success: true, message: await response.text() };
        }
      } else {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
          throw new Error(result.message || "Something went wrong with the API call");
        } else {
          const textResult = await response.text();
          throw new Error(`API error: ${textResult}`);
        }
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Optional: GET request helper that also includes credentials
  const getData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData, getData };
};

export default useApi;

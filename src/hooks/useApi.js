import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from the API.
 * Re-fetches whenever the userId changes.
 *
 * @param {Function} fetchFunction - API function that takes userId and returns a promise
 * @param {string} userId - The current user ID
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
export function useApi(fetchFunction, userId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // prevents state updates after unmount

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(userId);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    // Cleanup function to prevent setting state on unmounted component
    return () => {
      cancelled = true;
    };
  }, [fetchFunction, userId]);

  return { data, loading, error };
}

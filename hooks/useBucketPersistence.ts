import { useState, useEffect } from 'react';
import { BucketItem } from '../types';

// The original /api/bucket was a Vercel Blob function; there is no VPS backend (and bucket.yaeger.info has no DNS).
// On GitHub Pages the list is persisted in localStorage instead.
const LOCAL_ONLY = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
const LS_KEY = 'bucket_items_v1';
const apiUrl = (path: string) => path;
const readLocal = (): BucketItem[] | null => {
  try { const v = JSON.parse(localStorage.getItem(LS_KEY) || 'null'); return Array.isArray(v) ? v : null; } catch { return null; }
};

export function useBucketPersistence(initialValue: BucketItem[]) {
  const [data, setData] = useState<BucketItem[]>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from API on mount
  useEffect(() => {
    let isMounted = true;

    if (LOCAL_ONLY) {
      const saved = readLocal();
      if (saved) setData(saved);
      setLoading(false);
      return () => { isMounted = false; };
    }

    fetch(apiUrl('/api/bucket'))
      .then(async (res) => {
        // If 404, we are likely running locally without `vercel dev`
        if (res.status === 404) {
          console.warn('API endpoint /api/bucket not found. Using local state only.');
          return [];
        }
        
        // If other error, try to parse message
        if (!res.ok) {
          const errText = await res.text();
          let msg = res.statusText;
          try {
             const json = JSON.parse(errText);
             msg = json.error || msg;
          } catch (e) { /* ignore */ }
          throw new Error(msg);
        }

        return res.json();
      })
      .then((serverData) => {
        if (isMounted) {
          if (Array.isArray(serverData)) {
            setData(serverData);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to load bucket:', err);
          setError(err.message || 'Could not load data.');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  // Wrapper to update state and sync to server
  const setValue = (value: BucketItem[] | ((val: BucketItem[]) => BucketItem[])) => {
    const valueToStore = value instanceof Function ? value(data) : value;
    setData(valueToStore);

    if (LOCAL_ONLY) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(valueToStore)); } catch { /* quota */ }
      return;
    }

    fetch(apiUrl('/api/bucket'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(valueToStore),
    }).catch((err) => {
      console.error('Failed to sync bucket:', err);
    });
  };

  return [data, setValue, loading, error] as const;
}
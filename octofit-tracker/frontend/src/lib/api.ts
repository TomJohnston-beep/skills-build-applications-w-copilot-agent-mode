import { useEffect, useState } from 'react';

export const getApiBaseUrl = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME;
  return codespace && codespace.trim() !== ''
    ? `https://${codespace}-8000.app.github.dev`
    : 'http://localhost:8000';
};

export const normalizeResponse = (payload: unknown) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  const wrapped = payload as Record<string, unknown>;
  const arrayKeys = ['data', 'results', 'items', 'entries', 'docs'];
  for (const key of arrayKeys) {
    if (Array.isArray(wrapped[key])) {
      return wrapped[key] as unknown[];
    }
  }
  const firstArray = Object.values(wrapped).find(Array.isArray);
  if (Array.isArray(firstArray)) return firstArray;
  return [payload];
};

export async function fetchJson(path: string, options?: RequestInit) {
  const url = path.startsWith('http') ? path : `${getApiBaseUrl()}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const err = new Error(typeof data === 'string' ? data : JSON.stringify(data));
    // @ts-ignore add status for consumers
    err.status = res.status;
    throw err;
  }
  return data;
}

export function useFetch(resourcePath: string) {
  const [data, setData] = useState<unknown[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchJson(resourcePath)
      .then((d) => {
        if (!mounted) return;
        setData(Array.isArray(d) ? d : normalizeResponse(d));
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || String(err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [resourcePath]);

  return { data, loading, error } as const;
}

export default {
  getApiBaseUrl,
  normalizeResponse,
  fetchJson,
  useFetch
};

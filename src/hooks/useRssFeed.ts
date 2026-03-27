import { useState, useEffect } from 'react';
import { fetchRssFeed, RssItem } from '@/lib/rssParser';

interface UseRssFeedResult {
  items: RssItem[];
  loading: boolean;
  error: string | null;
}

export function useRssFeed(url: string | string[]): UseRssFeedResult {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const key = Array.isArray(url) ? url.join('|') : url;

  useEffect(() => {
    const urls = Array.isArray(url) ? url : [url];
    const active = urls.filter(Boolean);
    if (active.length === 0) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all(active.map(fetchRssFeed))
      .then((results) => {
        if (cancelled) return;
        const merged = results.flat().sort((a, b) =>
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        setItems(merged);
      })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { items, loading, error };
}
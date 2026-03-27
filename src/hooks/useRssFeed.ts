import { useState, useEffect } from "react";
import { fetchRssFeed, RssItem } from "@/lib/rssParser";

interface UseRssFeedResult {
  items: RssItem[];
  loading: boolean;
  error: string | null;
}

export function useRssFeed(url: string): UseRssFeedResult {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchRssFeed(url)
      .then((data) => { if (!cancelled) setItems(data); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { items, loading, error };
}

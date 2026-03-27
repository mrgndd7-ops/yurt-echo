import { useState, useEffect } from "react";

export interface OnThisDayEvent {
  year: number;
  text: string;
  pageUrl?: string;
  thumbnail?: string;
}

// Türk, askeri, siyasi tarihle ilgili anahtar kelimeler
const KEYWORDS = [
  "türk", "türkiye", "osmanlı", "cumhuriyet", "atatürk", "tbmm", "meclis",
  "ankara", "istanbul", "anadolu", "boğaz", "trakya",
  "savaş", "muharebe", "ordu", "askeri", "kuvvet", "harp", "zafer", "şehit",
  "kurtuluş", "istiklal", "milli", "cephe", "sefer", "kuşatma", "haçlı",
  "devlet", "hükümet", "cumhurbaşkan", "başbakan", "sultan", "padişah",
  "nato", "balkan", "selçuk", "bizans", "fatih", "yavuz", "kanuni",
  "çanakkale", "sakarya", "dumlupınar", "malazgirt", "mohaç",
];

function isRelevant(text: string): boolean {
  const lower = text.toLowerCase();
  return KEYWORDS.some((kw) => lower.includes(kw));
}

export function useOnThisDay(limit = 5) {
  const [events, setEvents] = useState<OnThisDayEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    setLoading(true);
    setError(null);

    fetch(`https://tr.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
      .then((r) => {
        if (!r.ok) throw new Error("API hatası");
        return r.json();
      })
      .then((data) => {
        const filtered: OnThisDayEvent[] = (data.events ?? [])
          .filter((e: any) => isRelevant(e.text ?? ""))
          .sort((a: any, b: any) => b.year - a.year)
          .slice(0, limit)
          .map((e: any) => ({
            year: e.year,
            text: e.text,
            pageUrl: e.pages?.[0]?.content_urls?.desktop?.page,
            thumbnail: e.pages?.[0]?.thumbnail?.source,
          }));

        // Filtre sonuç vermezse en yakın tarihli 5 olayı döndür
        if (filtered.length === 0) {
          const fallback: OnThisDayEvent[] = (data.events ?? [])
            .sort((a: any, b: any) => b.year - a.year)
            .slice(0, limit)
            .map((e: any) => ({
              year: e.year,
              text: e.text,
              pageUrl: e.pages?.[0]?.content_urls?.desktop?.page,
              thumbnail: e.pages?.[0]?.thumbnail?.source,
            }));
          setEvents(fallback);
        } else {
          setEvents(filtered);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading, error };
}

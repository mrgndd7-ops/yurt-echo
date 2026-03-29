export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl: string;
  author?: string;
  category?: string;
}

const RSS2JSON = "https://api.rss2json.com/v1/api.json";
const MAX_AGE_DAYS = 30;

export async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const params = new URLSearchParams({
    rss_url: url,
    count: "30",
    _: Date.now().toString(),
  });
  const res = await fetch(`${RSS2JSON}?${params}`);
  if (!res.ok) throw new Error(`RSS fetch hatası: ${res.status}`);

  const data = await res.json();
  if (data.status !== "ok") throw new Error("RSS parse hatası");

  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

  return (data.items as any[])
    .filter((item) => {
      if (!item.pubDate) return true;
      const t = new Date(item.pubDate).getTime();
      return isNaN(t) || t >= cutoff;
    })
    .slice(0, 20)
    .map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      description: stripHtml(item.description ?? "").slice(0, 200),
      pubDate: item.pubDate ?? "",
      imageUrl: resolveImage(item),
      author: item.author ?? "",
      category: item.categories?.[0] ?? "",
    }));
}

function resolveImage(item: any): string {
  const candidates = [
    item.thumbnail,
    item.enclosure?.link,
    extractImage(item.content ?? ""),
    extractImage(item.description ?? ""),
  ];
  return candidates.find(isValidImage) ?? "";
}

function isValidImage(url: unknown): url is string {
  if (!url || typeof url !== "string" || url.length < 10) return false;
  try {
    const { pathname } = new URL(url);
    if (pathname.length < 5) return false;
    if (/.(jpe?g|png|gif|webp|avif)/i.test(pathname)) return true;
    if (/(upload|image|photo|media|cdn|thumb|crop)/i.test(pathname)) return true;
    return false;
  } catch (_e) {
    return false;
  }
}
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function extractImage(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "";
}

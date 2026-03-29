export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl: string;
  author?: string;
  category?: string;
}

const CORS_PROXY = "/api/rss?url=";

export async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const res = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`RSS fetch hatası: ${res.status}`);

  const data = await res.json();
  if (!data.contents) throw new Error("RSS içeriği alınamadı");

  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, "text/xml");
  const items = Array.from(xml.querySelectorAll("item"));

  return items
    .map((item) => {
      const get = (tag: string) => item.querySelector(tag)?.textContent?.trim() ?? "";
      const content = item.querySelector("encoded")?.textContent ?? get("description");
      return {
        title: get("title"),
        link: get("link"),
        description: stripHtml(get("description")).slice(0, 200),
        pubDate: get("pubDate"),
        imageUrl: resolveImageFromItem(item, content),
        author: get("author") || get("creator"),
        category: get("category"),
      };
    })
    .slice(0, 20);
}

function resolveImageFromItem(item: Element, content: string): string {
  const enclosure = item.querySelector("enclosure")?.getAttribute("url") ?? "";
  const mediaThumbnail = item.querySelector("thumbnail")?.getAttribute("url") ?? "";
  const candidates = [
    enclosure,
    mediaThumbnail,
    extractImage(content),
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

export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl?: string;
  author?: string;
  category?: string;
}

// CORS proxy — tarayıcı doğrudan dış feed'e erişemez
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

export async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const res = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`RSS fetch hatası: ${res.status}`);

  const text = await res.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");

  const parseError = xml.querySelector("parsererror");
  if (parseError) throw new Error("RSS parse hatası");

  return Array.from(xml.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent?.trim() ?? "",
    link:
      item.querySelector("link")?.textContent?.trim() ??
      item.querySelector("guid")?.textContent?.trim() ??
      "",
    description: stripHtml(item.querySelector("description")?.textContent ?? ""),
    pubDate: item.querySelector("pubDate")?.textContent?.trim() ?? "",
    imageUrl:
      item.querySelector("enclosure")?.getAttribute("url") ??
      item.querySelector("media\\:content")?.getAttribute("url") ??
      item.querySelector("content")?.getAttribute("url") ??
      extractImageFromHtml(item.querySelector("description")?.textContent ?? "") ??
      extractImageFromHtml(item.querySelector("content\\:encoded")?.textContent ?? ""),
    author:
      item.querySelector("author")?.textContent?.trim() ??
      item.querySelector("dc\\:creator")?.textContent?.trim() ??
      "",
    category:
      item.querySelector("category")?.textContent?.trim() ?? "",
  }));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function extractImageFromHtml(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
}

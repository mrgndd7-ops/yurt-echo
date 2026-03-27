export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl: string;
  author?: string;
  category?: string;
}

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

export async function fetchRssFeed(url: string): Promise<RssItem[]> {
  const res = await fetch(`${RSS2JSON}${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`RSS fetch hatası: ${res.status}`);

  const data = await res.json();
  if (data.status !== "ok") throw new Error("RSS parse hatası");

  return (data.items as any[]).slice(0, 20).map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    description: stripHtml(item.description ?? "").slice(0, 200),
    pubDate: item.pubDate ?? "",
    imageUrl:
      item.thumbnail ||
      item.enclosure?.link ||
      extractImage(item.content ?? "") ||
      extractImage(item.description ?? "") ||
      "",
    author: item.author ?? "",
    category: item.categories?.[0] ?? "",
  }));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

function extractImage(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? "";
}

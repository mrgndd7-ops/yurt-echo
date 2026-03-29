export const config = { runtime: "edge" };

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "url parametresi gerekli" }), { status: 400 });
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; RSS Reader/1.0)",
      "Accept": "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: `Fetch hatası: ${response.status}` }), { status: response.status });
  }

  const content = await response.text();

  return new Response(JSON.stringify({ contents: content }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
    },
  });
}

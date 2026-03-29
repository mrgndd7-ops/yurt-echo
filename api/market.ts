import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const response = await fetch("https://finans.truncgil.com/v4/today.json");
  if (!response.ok) {
    return res.status(response.status).json({ error: "Veri alınamadı" });
  }

  const data = await response.json();

  const fmt = (val: number) =>
    val?.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const changeStr = (val: number) =>
    val == null ? "" : (val >= 0 ? `+${val.toFixed(2)}%` : `${val.toFixed(2)}%`);

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
  res.setHeader("Access-Control-Allow-Origin", "*");

  return res.status(200).json([
    { label: "Dolar/TL",  value: fmt(data.USD?.Selling),  change: changeStr(data.USD?.Change)  },
    { label: "Euro/TL",   value: fmt(data.EUR?.Selling),   change: changeStr(data.EUR?.Change)   },
    { label: "Altın (g)", value: fmt(data.GRA?.Selling),   change: changeStr(data.GRA?.Change)   },
    { label: "BIST 100",  value: fmt(data.XU100?.Selling), change: changeStr(data.XU100?.Change) },
  ]);
}

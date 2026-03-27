import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import NewsCard from "@/components/news/NewsCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRssFeed } from "@/hooks/useRssFeed";
import { RSS_FEEDS } from "@/config/rssFeeds";

const filters = ["Son Gelişmeler", "Bugün", "Bu Hafta", "Analiz"];

const categoryMeta: Record<string, { title: string; description: string; tag: string }> = {
  gundem:   { title: "Gündem",   description: "Türkiye'nin günlük gündemi, siyaset ve güvenlik gelişmeleri.",        tag: "Gündem"   },
  siyaset:  { title: "Siyaset",  description: "Meclis, hükümet ve siyasi partilerden öne çıkan gelişmeler.",         tag: "Siyaset"  },
  guvenlik: { title: "Güvenlik", description: "İç güvenlik, terörle mücadele ve operasyonel gelişmeler.",            tag: "Güvenlik" },
  savunma:  { title: "Savunma",  description: "Yerli savunma sanayii, TSK ve stratejik güvenlik haberleri.",         tag: "Savunma"  },
  dunya:    { title: "Dünya",    description: "Uluslararası gelişmeler, Türkiye'nin dış politikası ve jeopolitika.",  tag: "Dünya"    },
  tarih:    { title: "Tarih",    description: "Milli hafıza, tarihsel perspektif ve devlet geleneği.",                tag: "Tarih"    },
  analiz:   { title: "Analiz",   description: "Uzman görüşleri, derinlemesine analizler ve dosyalar.",                tag: "Analiz"   },
  ekonomi:  { title: "Ekonomi",  description: "Türkiye ekonomisi, piyasalar ve finansal gelişmeler.",                tag: "Ekonomi"  },
};

const PAGE_SIZE = 12;

const CategoryPage = () => {
  const { slug = "gundem" } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState("Son Gelişmeler");
  const [page, setPage] = useState(1);
  const meta = categoryMeta[slug] ?? { title: slug.charAt(0).toUpperCase() + slug.slice(1), description: "", tag: slug };

  const feedUrl = RSS_FEEDS[slug] ?? "";
  const { items, loading, error } = useRssFeed(feedUrl);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />
      <main>
        <div className="bg-secondary text-secondary-foreground">
          <div className="container py-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-primary" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-archivo">{meta.title}</h1>
                {meta.description && <p className="text-sm text-secondary-foreground/70 mt-1">{meta.description}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-border bg-card">
          <div className="container">
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 text-sm font-medium font-archivo rounded-md whitespace-nowrap transition-colors ${
                    activeFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >{f}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-8">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg bg-muted aspect-video" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-center text-sm text-muted-foreground py-20">Feed yüklenemedi: {error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-20">Bu kategori için henüz haber bulunamadı.</p>
          )}

          {!loading && pageItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer">
                  <NewsCard
                    size="medium"
                    category={item.category || meta.tag}
                    title={item.title}
                    excerpt={item.description || undefined}
                    imageUrl={item.imageUrl || undefined}
                    author={item.author || undefined}
                    date={item.pubDate ? new Date(item.pubDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : undefined}
                    categoryVariant={i % 2 === 0 ? "burgundy" : "navy"}
                  />
                </a>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-md border border-border hover:bg-muted transition-colors disabled:opacity-40"
                aria-label="Önceki sayfa"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-md text-sm font-medium font-archivo transition-colors ${
                    page === i + 1 ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                  }`}
                >{i + 1}</button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-md border border-border hover:bg-muted transition-colors disabled:opacity-40"
                aria-label="Sonraki sayfa"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default CategoryPage;

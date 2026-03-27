import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import CategoryTag from "@/components/news/CategoryTag";
import { Clock, Share2, Facebook, Twitter, Link2, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { RssItem } from "@/lib/rssParser";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80";

const ArticleDetail = () => {
  const { state } = useLocation();
  const article = state as RssItem | null;

  const title       = article?.title       || "Sınır güvenliğinde yeni dönem";
  const excerpt     = article?.description || "Güvenlik bürokrasisinin yeniden yapılandırılmasıyla birlikte sınır hattındaki operasyonel kapasite güçlendiriliyor.";
  const imageUrl    = article?.imageUrl    || FALLBACK_IMG;
  const author      = article?.author      || "";
  const pubDate     = article?.pubDate     ? new Date(article.pubDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
  const category    = article?.category    || "Gündem";
  const sourceLink  = article?.link        || "";

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />

      <main>
        <article className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CategoryTag label={category} className="mb-3" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-archivo leading-tight">
                {title}
              </h1>
              {excerpt && (
                <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{excerpt}</p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 py-4 border-y border-border text-sm text-muted-foreground">
                {author && <span className="font-medium text-foreground">{author}</span>}
                {pubDate && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />{pubDate}
                  </span>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs">Paylaş:</span>
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Twitter className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Facebook className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Hero image */}
              {imageUrl && (
                <div className="mt-6 rounded-lg overflow-hidden">
                  <img src={imageUrl} alt={title} className="w-full aspect-[16/9] object-cover" />
                </div>
              )}

              {/* Devamını Oku */}
              {sourceLink && (
                <div className="mt-8 p-5 bg-soft-surface rounded-lg border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold font-archivo">Haberin tamamı kaynak sitede yer almaktadır.</p>
                    <p className="text-xs text-muted-foreground mt-1">Devamını okumak için kaynak siteye yönlendirileceksiniz.</p>
                  </div>
                  <a
                    href={sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium font-archivo rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Devamını Oku
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo mb-3">Kategoriye Dön</h3>
                <Link
                  to={category ? `/kategori/${category.toLowerCase()}` : "/"}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  ← {category} Haberleri
                </Link>
              </div>

              <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                <h3 className="text-sm font-bold font-archivo mb-2">Stratejik Not</h3>
                <p className="text-xs leading-relaxed text-secondary-foreground/80">
                  Bu haber, Yurt Medya'nın takip ettiği kaynaklardan derlenmektedir.
                </p>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default ArticleDetail;

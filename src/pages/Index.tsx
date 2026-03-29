import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import CurrentNewsBand from "@/components/layout/CurrentNewsBand";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import NewsCard from "@/components/news/NewsCard";
import SectionTitle from "@/components/news/SectionTitle";
import CategoryTag from "@/components/news/CategoryTag";
import { Clock, Play, TrendingUp, Calendar, Shield, BookOpen, MapPin, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useRssFeed } from "@/hooks/useRssFeed";
import { useOnThisDay } from "@/hooks/useOnThisDay";
import { RSS_FEEDS } from "@/config/rssFeeds";
import type { RssItem } from "@/lib/rssParser";

const IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80";
const IMG2 = "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80";
const IMG3 = "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80";
const IMG4 = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80";
const IMG5 = "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80";
const IMG6 = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80";

// RSS item'ı link olarak kullan (dış siteye yönlendir)

function formatDate(pubDate: string) {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  return isNaN(d.getTime()) ? pubDate : d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Her bölüm için ortak skeleton
function SectionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-pulse">
      <div className="md:col-span-1 aspect-video bg-muted rounded-lg" />
      <div className="md:col-span-2 space-y-3">
        {[1, 2, 3].map(i => <div key={i} className="h-14 bg-muted rounded-lg" />)}
      </div>
    </div>
  );
}

// Haber bölümü: 1 büyük kart + n küçük kart
function NewsSection({
  title,
  href,
  accent,
  label,
  labelVariant,
  fallbackImage,
  items,
  loading,
  staticMain,
  staticList,
}: {
  title: string;
  href: string;
  accent?: "navy";
  label: string;
  labelVariant?: "navy";
  fallbackImage: string;
  items: RssItem[];
  loading: boolean;
  staticMain: { title: string; excerpt?: string };
  staticList: string[];
}) {
  if (loading) return <SectionSkeleton />;

  const hasRss = items.length > 0;
  const main = hasRss ? items[0] : null;
  const rest = hasRss ? items.slice(1, 4) : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-1">
        {main ? (
            <NewsCard state={main}
              size="medium"
              category={label}
              title={main.title}
              excerpt={main.description || undefined}
              imageUrl={main.imageUrl || fallbackImage}
              author={main.author || undefined}
              date={formatDate(main.pubDate)}
              categoryVariant={labelVariant}
            />
        ) : (
          <Link to={href}>
            <NewsCard
              size="medium"
              category={label}
              title={staticMain.title}
              excerpt={staticMain.excerpt}
              imageUrl={fallbackImage}
              categoryVariant={labelVariant}
            />
          </Link>
        )}
      </div>
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hasRss
          ? rest.map((item, i) => (
                <NewsCard state={item}
                  size="small"
                  category={label}
                  title={item.title}
                  imageUrl={item.imageUrl || undefined}
                  categoryVariant={labelVariant}
                />
            ))
          : staticList.map((t, i) => (
              <Link key={i} to={href}>
                <NewsCard size="small" category={label} title={t} categoryVariant={labelVariant} />
              </Link>
            ))}
      </div>
    </div>
  );
}

const STATIC_STRIP = [
  { cat: "Gündem",  title: "Ankara'da kritik güvenlik zirvesi başladı" },
  { cat: "Siyaset", title: "Meclis'te yeni yasa teklifi tartışılıyor" },
  { cat: "Ekonomi", title: "Merkez Bankası faiz kararını açıkladı" },
  { cat: "Güvenlik",title: "Sınır hattında dikkat çeken gelişme" },
  { cat: "Dünya",   title: "Jeopolitikte yeni eşik: Balkan cephesi" },
  { cat: "Savunma", title: "Savunmada yerli kapasite artıyor" },
];

const Index = () => {
  const onThisDay = useOnThisDay(4);
  const gundem   = useRssFeed(RSS_FEEDS.gundem);
  const siyaset  = useRssFeed(RSS_FEEDS.siyaset);
  const guvenlik = useRssFeed(RSS_FEEDS.guvenlik);
  const savunma  = useRssFeed(RSS_FEEDS.savunma);
  const dunya    = useRssFeed(RSS_FEEDS.dunya);
  const tarih    = useRssFeed(RSS_FEEDS.tarih);
  const analiz   = useRssFeed(RSS_FEEDS.analiz);

  // Hero: ilk dolu feed'den al
  const heroFeed = [gundem, guvenlik, savunma, dunya].find(f => f.items.length > 0);
  const heroItem = heroFeed?.items[0];
  const sideItems = heroFeed?.items.slice(1, 4) ?? [];

  // Quick strip: tüm feed'lerin ilk haberlerini karıştır
  const allItems = [
    ...gundem.items.slice(0, 1),
    ...siyaset.items.slice(0, 1),
    ...guvenlik.items.slice(0, 1),
    ...savunma.items.slice(0, 1),
    ...dunya.items.slice(0, 1),
    ...tarih.items.slice(0, 1),
  ];

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />
      <CurrentNewsBand />

      <main>
        {/* Hero Section */}
        <section className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              {heroItem ? (
                  <NewsCard state={heroItem}
                    size="large"
                    category={heroItem.category || "Gündem"}
                    title={heroItem.title}
                    excerpt={heroItem.description || undefined}
                    imageUrl={heroItem.imageUrl || IMG}
                    author={heroItem.author || undefined}
                    date={formatDate(heroItem.pubDate)}
                  />
              ) : (
                <NewsCard
                  size="large"
                  category="Güvenlik"
                  title="Sınır güvenliğinde yeni dönem: devletin sahadaki refleksi yeniden şekilleniyor"
                  excerpt="Güvenlik bürokrasisinin yeniden yapılandırılmasıyla birlikte sınır hattındaki operasyonel kapasite güçlendiriliyor."
                  imageUrl={IMG}
                  author="Mehmet Karataş"
                  date="26 Mart 2026, 13:45"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              {sideItems.length > 0
                ? sideItems.map((item, i) => (
                      <NewsCard state={item}
                        size="small"
                        category={item.category || "Haber"}
                        title={item.title}
                        imageUrl={item.imageUrl || [IMG2, IMG3, IMG6][i]}
                        categoryVariant="navy"
                      />
                  ))
                : (
                  <>
                    <NewsCard size="small" category="Savunma" title="Yerli savunma sanayiinde kritik ihracat anlaşması imzalandı" imageUrl={IMG2} categoryVariant="navy" />
                    <NewsCard size="small" category="Dünya" title="Doğu Akdeniz'de enerji denklemi yeniden şekilleniyor" imageUrl={IMG3} categoryVariant="navy" />
                    <NewsCard size="small" category="Tarih" title="Çanakkale'nin 111. yılında milli hafıza ve direniş ruhu" imageUrl={IMG6} />
                  </>
                )}
            </div>
          </div>
        </section>

        {/* Quick Agenda Strip */}
        <section className="bg-soft-surface border-y border-border">
          <div className="container py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allItems.length > 0
                ? allItems.map((item, i) => (
                    <Link
                      key={i}
                      to={`/haber/${encodeURIComponent(item.title.slice(0,60).toLowerCase().replace(/s+/g, "-"))}`}
                      state={item}
                      className="group bg-card rounded-lg p-3 border border-border hover:shadow-sm transition-all hover:-translate-y-0.5"
                    >
                      <CategoryTag label={item.category || "Haber"} variant="muted" className="mb-1.5" />
                      <p className="text-xs font-semibold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">{item.title}</p>
                    </Link>
                  ))
                : STATIC_STRIP.map((item, i) => (
                    <Link key={i} to="/haber/detay" className="group bg-card rounded-lg p-3 border border-border hover:shadow-sm transition-all hover:-translate-y-0.5">
                      <CategoryTag label={item.cat} variant="muted" className="mb-1.5" />
                      <p className="text-xs font-semibold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">{item.title}</p>
                    </Link>
                  ))}
            </div>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">

              {/* Gündem / Siyaset */}
              <section>
                <SectionTitle title="Gündem / Siyaset" href="/kategori/gundem" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {gundem.loading ? (
                    <div className="col-span-2 animate-pulse h-40 bg-muted rounded-lg" />
                  ) : gundem.items.length > 0 ? (
                    <>
                        <NewsCard state={gundem.items[0]}
                          size="medium"
                          category="Gündem"
                          title={gundem.items[0].title}
                          excerpt={gundem.items[0].description || undefined}
                          imageUrl={gundem.items[0].imageUrl || IMG4}
                        />
                      <div className="space-y-0">
                        {gundem.items.slice(1, 5).map((item, i) => (
                            <NewsCard state={item} size="compact" category="Gündem" title={item.title} categoryVariant="navy" />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <NewsCard size="medium" category="Gündem" title="Devlet refleksinin öne çıktığı başlıklar: güvenlik ve diplomasi bir arada" excerpt="Hükümetin son haftalardaki stratejik hamleleri, iç ve dış politikada yeni bir denge arayışına işaret ediyor." imageUrl={IMG4} />
                      <div className="space-y-0">
                        {["Meclis'te yeni güvenlik paketi görüşmeleri başladı", "Cumhurbaşkanlığı'ndan diplomatik temas açıklaması", "Yerel yönetimlerde yeni dönem planlaması", "Ekonomi zirvesinde stratejik kararlar masada"].map((t, i) => (
                          <NewsCard key={i} size="compact" category="Siyaset" title={t} categoryVariant="navy" />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Güvenlik */}
              <section>
                <SectionTitle title="Güvenlik" href="/kategori/guvenlik" accent="navy" />
                <NewsSection
                  title="Güvenlik" href="/kategori/guvenlik" accent="navy"
                  label="Güvenlik" labelVariant="navy"
                  fallbackImage={IMG5}
                  items={guvenlik.items} loading={guvenlik.loading}
                  staticMain={{ title: "İç güvenlikte yeni strateji belgesi hazırlanıyor" }}
                  staticList={["Sınır güvenliğinde teknoloji yatırımları hız kazandı", "Terörle mücadelede yeni operasyonel başarılar", "Siber güvenlik altyapısı güçlendiriliyor"]}
                />
              </section>

              {/* Savunma */}
              <section>
                <SectionTitle title="Savunma" href="/kategori/savunma" />
                <NewsSection
                  title="Savunma" href="/kategori/savunma"
                  label="Savunma"
                  fallbackImage={IMG2}
                  items={savunma.items} loading={savunma.loading}
                  staticMain={{ title: "Milli muharip uçak programında yeni aşamaya geçildi" }}
                  staticList={["Deniz kuvvetlerinin yeni nesil fırkateyn projesi", "İHA teknolojisinde ihracat rekoru kırıldı", "Savunma sanayii zirvesinden önemli kararlar"]}
                />
              </section>

              {/* Dünya */}
              <section>
                <SectionTitle title="Dünya" href="/kategori/dunya" accent="navy" />
                <NewsSection
                  title="Dünya" href="/kategori/dunya" accent="navy"
                  label="Dünya" labelVariant="navy"
                  fallbackImage={IMG3}
                  items={dunya.items} loading={dunya.loading}
                  staticMain={{ title: "Doğu Akdeniz'de enerji denklemi yeniden şekilleniyor" }}
                  staticList={["Balkanlar'da yeni siyasi denge arayışı", "Orta Doğu'da diplomasi trafiği yoğunlaştı", "Türk dünyasıyla ekonomik entegrasyon adımları"]}
                />
              </section>

              {/* Tarih / Hafıza */}
              <section>
                <SectionTitle title="Tarih / Hafıza" href="/kategori/tarih" />
                <NewsSection
                  title="Tarih / Hafıza" href="/kategori/tarih"
                  label="Tarih"
                  fallbackImage={IMG6}
                  items={tarih.items} loading={tarih.loading}
                  staticMain={{ title: "Milli hafızada önemli gün: Cumhuriyet'in kuruluş iradesini yeniden okumak" }}
                  staticList={["Osmanlı'dan Cumhuriyet'e geçişin stratejik dersleri", "Kurtuluş Savaşı'nın bilinmeyen diplomatik boyutu", "Türk devlet geleneğinde kurumsallaşma"]}
                />
              </section>

              {/* Analiz / Dosya */}
              <section>
                <SectionTitle title="Analiz & Dosya" href="/kategori/analiz" accent="navy" />
                <NewsSection
                  title="Analiz" href="/kategori/analiz" accent="navy"
                  label="Analiz" labelVariant="navy"
                  fallbackImage={IMG4}
                  items={analiz.items} loading={analiz.loading}
                  staticMain={{ title: "Jeopolitikte yeni eşik: Türkiye'nin çok cepheli stratejisi" }}
                  staticList={["Enerji güvenliği ve milli bağımsızlık ilişkisi", "Doğu Akdeniz'de güç dengesi", "Savunma sanayiinde dönüşüm"]}
                />
              </section>

              {/* Video Section */}
              <section>
                <SectionTitle title="Video & Röportaj" accent="navy" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { title: "Güvenlik zirvesinin perde arkası", duration: "12:34" },
                    { title: "Milli hafıza belgeseli: Kuruluştan bugüne", duration: "24:15" },
                  ].map((v, i) => (
                    <Link key={i} to="/haber/detay" className="group relative block">
                      <div className="aspect-video rounded-lg overflow-hidden bg-secondary/20">
                        <img src={i === 0 ? IMG4 : IMG6} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-secondary/80 text-secondary-foreground text-[10px] px-1.5 py-0.5 rounded">
                          {v.duration}
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold font-archivo group-hover:text-primary transition-colors">{v.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Piyasalar
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Dolar/TL", value: "38,42", change: "+0.12%" },
                    { label: "Euro/TL", value: "41,18", change: "-0.08%" },
                    { label: "Altın", value: "3.284", change: "+0.45%" },
                    { label: "BIST 100", value: "12.450", change: "+1.2%" },
                  ].map((m, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{m.label}</span>
                      <div className="text-right">
                        <span className="font-semibold">{m.value}</span>
                        <span className={`ml-1.5 text-xs ${m.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                          {m.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  En Çok Okunanlar
                </h3>
                <div className="space-y-0">
                  {[
                    "Sınır güvenliğinde yeni dönem başlıyor",
                    "Ankara'da güvenlik zirvesinin perde arkası",
                    "Savunma sanayiinde ihracat rekoru",
                    "Milli hafızada önemli bir gün",
                    "Jeopolitikte yeni eşik yaklaşıyor",
                  ].map((t, i) => (
                    <Link key={i} to="/haber/detay" className="group flex gap-3 py-2.5 border-b border-border last:border-0">
                      <span className="text-lg font-bold font-archivo text-primary/40 w-6 flex-shrink-0">{i + 1}</span>
                      <p className="text-xs font-semibold font-archivo leading-snug group-hover:text-primary transition-colors">{t}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-soft-surface rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  Bugün Tarihte
                </h3>
                {onThisDay.loading && <div className="animate-pulse space-y-2">{[1,2,3].map(i=><div key={i} className="h-8 bg-muted rounded" />)}</div>}
                {!onThisDay.loading && (
                  <div className="space-y-3">
                    {onThisDay.events.map((e, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-xs font-bold text-primary w-10 flex-shrink-0">{e.year}</span>
                        {e.pageUrl
                          ? <a href={e.pageUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground leading-snug hover:text-primary transition-colors line-clamp-2">{e.text}</a>
                          : <p className="text-xs text-foreground leading-snug line-clamp-2">{e.text}</p>
                        }
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <Shield className="h-4 w-4" />
                  Stratejik Not
                </h3>
                <p className="text-xs leading-relaxed text-secondary-foreground/80">
                  Doğu Akdeniz'deki enerji rekabeti, Türkiye'nin bölgesel güç dengesindeki rolünü yeniden tanımlıyor. Diplomatik ve askeri kapasitenin eşzamanlı kullanımı stratejik öncelik olarak öne çıkıyor.
                </p>
                <Link to="/kategori/analiz" className="inline-block mt-2 text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Devamını oku →
                </Link>
              </div>

            </aside>
          </div>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;

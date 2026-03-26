import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import NewsCard from "@/components/news/NewsCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const filters = ["Son Gelişmeler", "Bugün", "Bu Hafta", "Analiz"];

const articles = [
  { cat: "Gündem", title: "Ankara'da kritik güvenlik zirvesi: yeni değerlendirmeler gündemde", excerpt: "Cumhurbaşkanlığı bünyesinde gerçekleştirilen toplantıda sınır güvenliği ve iç tehditler masaya yatırıldı." },
  { cat: "Gündem", title: "Meclis'te yeni güvenlik paketi görüşmeleri başladı", excerpt: "İç güvenlik reformuna ilişkin yasa teklifi komisyonda ele alınmaya başlandı." },
  { cat: "Siyaset", title: "Cumhurbaşkanlığı'ndan diplomatik temas açıklaması", excerpt: "Üst düzey diplomatik görüşmelerin sonuçları kamuoyuyla paylaşıldı." },
  { cat: "Gündem", title: "Yerel yönetimlerde yeni dönem planlaması", excerpt: "Büyükşehir belediyeleri stratejik plan çalışmalarını hızlandırdı." },
  { cat: "Siyaset", title: "Ekonomi zirvesinde stratejik kararlar masada", excerpt: "Ekonomik bağımsızlık ve üretim kapasitesinin artırılması ele alındı." },
  { cat: "Gündem", title: "Devlet refleksinin öne çıktığı başlıklar", excerpt: "Hükümetin stratejik hamleleri iç ve dış politikada yeni bir denge arayışına işaret ediyor." },
  { cat: "Gündem", title: "Sınır hattında dikkat çeken gelişme", excerpt: "Operasyonel kapasitenin artırılmasına yönelik yeni adımlar atılıyor." },
  { cat: "Siyaset", title: "Milli güvenlik kurulu kararları açıklandı", excerpt: "Toplantıda alınan kararlar ve stratejik değerlendirmeler paylaşıldı." },
  { cat: "Gündem", title: "Jeopolitikte yeni eşik: çok cepheli diplomasi", excerpt: "Türkiye'nin bölgesel politikalarında yeni bir evreye girildiği değerlendiriliyor." },
];

const CategoryPage = () => {
  const [activeFilter, setActiveFilter] = useState("Son Gelişmeler");

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />

      <main>
        {/* Category Header */}
        <div className="bg-secondary text-secondary-foreground">
          <div className="container py-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-primary" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-archivo">Gündem</h1>
                <p className="text-sm text-secondary-foreground/70 mt-1">Türkiye'nin günlük gündemi, siyaset ve güvenlik gelişmeleri</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border-b border-border bg-card">
          <div className="container">
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 text-sm font-medium font-archivo rounded-md whitespace-nowrap transition-colors ${
                    activeFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <NewsCard
                key={i}
                size="medium"
                category={a.cat}
                title={a.title}
                excerpt={a.excerpt}
                imageUrl={`https://images.unsplash.com/photo-${
                  ["1524661135-423995f22d0b", "1555848962-6e79363ec58f", "1529107386315-e1a2ed48a620",
                   "1541872703-74c5e44368f9", "1577495508048-b635879837f1", "1564769625905-50e93615e769",
                   "1524661135-423995f22d0b", "1555848962-6e79363ec58f", "1529107386315-e1a2ed48a620"][i]
                }?w=600&q=80`}
                categoryVariant={i % 2 === 0 ? "burgundy" : "navy"}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            <button className="p-2 rounded-md border border-border hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`w-10 h-10 rounded-md text-sm font-medium font-archivo transition-colors ${
                  n === 1
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="p-2 rounded-md border border-border hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default CategoryPage;

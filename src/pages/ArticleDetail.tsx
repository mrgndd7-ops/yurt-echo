import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import CategoryTag from "@/components/news/CategoryTag";
import NewsCard from "@/components/news/NewsCard";
import SectionTitle from "@/components/news/SectionTitle";
import { Clock, Share2, Facebook, Twitter, Link2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80";

const tags = ["Güvenlik", "Türkiye", "Sınır", "Devlet", "Strateji", "Savunma"];

const ArticleDetail = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />

      <main>
        <article className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article body */}
            <div className="lg:col-span-2">
              <CategoryTag label="Güvenlik" className="mb-3" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-archivo leading-tight">
                Sınır güvenliğinde yeni dönem: devletin sahadaki refleksi yeniden şekilleniyor
              </h1>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                Güvenlik bürokrasisinin yeniden yapılandırılmasıyla birlikte sınır hattındaki operasyonel kapasite güçlendiriliyor. Yeni dönemin stratejik çerçevesi netleşiyor.
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 py-4 border-y border-border text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Mehmet Karataş</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  26 Mart 2026, 13:45
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs">Paylaş:</span>
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Twitter className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Facebook className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Link2 className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Hero image */}
              <div className="mt-6 rounded-lg overflow-hidden">
                <img src={IMG} alt="" className="w-full aspect-[16/9] object-cover" />
                <p className="text-xs text-muted-foreground mt-2 italic">Ankara'daki güvenlik zirvesinden bir kare. Fotoğraf: Yurt Medya</p>
              </div>

              {/* Body */}
              <div className="mt-8 prose prose-sm max-w-none font-inter text-foreground leading-relaxed space-y-5">
                <p>
                  Türkiye'nin güvenlik mimarisinde köklü bir dönüşüm süreci yaşanıyor. Cumhurbaşkanlığı bünyesinde gerçekleştirilen kapsamlı değerlendirme toplantılarının ardından, sınır güvenliği konseptinde önemli değişikliklere gidilmesi kararlaştırıldı. Bu süreçte hem teknolojik altyapının güçlendirilmesi hem de operasyonel doktrinlerin güncellenmesi öncelikli hedefler arasında yer alıyor.
                </p>
                <p>
                  Güvenlik kaynakları, yeni dönemde "proaktif savunma" konseptinin ön plana çıkacağını belirtiyor. Bu yaklaşım, sınır hattındaki tehditlerin henüz oluşma aşamasındayken bertaraf edilmesini öngörüyor. Bunun için istihbarat kapasitesinin artırılması, insansız hava araçlarının etkin kullanımı ve sınır ötesi operasyonel esnekliğin korunması kritik unsurlar olarak değerlendiriliyor.
                </p>

                {/* Quote block */}
                <blockquote className="border-l-4 border-primary bg-soft-surface p-5 rounded-r-lg not-italic">
                  <p className="text-base font-semibold font-archivo text-foreground">
                    "Devletin sahadaki refleksi, stratejik derinlik ve operasyonel hız dengesine dayanmalıdır. Bu denge, ulusal güvenliğin temel taşıdır."
                  </p>
                  <cite className="text-sm text-muted-foreground mt-2 block">— Güvenlik Analisti Mehmet Karataş</cite>
                </blockquote>

                <p>
                  Savunma sanayiindeki yerli üretim kapasitesinin artması, bu stratejik dönüşümün en önemli destekçisi olarak öne çıkıyor. Özellikle insansız hava araçları, elektronik harp sistemleri ve entegre sınır güvenlik çözümleri alanında Türkiye'nin elde ettiği yetkinlik, uluslararası alanda da dikkatle takip ediliyor.
                </p>
                <p>
                  Diplomatik kaynaklar, Ankara'nın bu yeni güvenlik konseptini müttefik ülkelerle de paylaştığını ve bölgesel iş birliği çerçevesinde ortak güvenlik mekanizmalarının geliştirilmesi konusunda görüşmelerin sürdüğünü aktarıyor. Bu süreçte NATO çerçevesindeki taahhütlerle ulusal güvenlik önceliklerinin dengelenmesi kritik bir konu olarak masada yer alıyor.
                </p>
                <p>
                  Analiz uzmanları, Türkiye'nin güvenlik alanındaki bu dönüşümünün sadece sınır güvenliğiyle sınırlı kalmayacağını, iç güvenlikten siber savunmaya, enerji güvenliğinden gıda güvenliğine kadar geniş bir yelpazeyi kapsayacağını değerlendiriyor. Bu bütüncül yaklaşım, 2026 yılının Türkiye'nin güvenlik politikalarında bir milat olabileceğine işaret ediyor.
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/kategori/${tag.toLowerCase()}`}
                    className="text-xs font-medium px-3 py-1.5 bg-muted text-muted-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Related */}
              <div className="mt-10">
                <SectionTitle title="İlgili Haberler" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { cat: "Güvenlik", title: "İç güvenlikte yeni strateji belgesi hazırlanıyor" },
                    { cat: "Savunma", title: "Milli muharip uçak programında yeni aşamaya geçildi" },
                    { cat: "Dünya", title: "Doğu Akdeniz'de enerji denklemi yeniden şekilleniyor" },
                    { cat: "Analiz", title: "Jeopolitikte yeni eşik: Türkiye'nin çok cepheli stratejisi" },
                  ].map((r, i) => (
                    <NewsCard
                      key={i}
                      size="small"
                      category={r.cat}
                      title={r.title}
                      imageUrl={`https://images.unsplash.com/photo-${i % 2 === 0 ? "1555848962-6e79363ec58f" : "1529107386315-e1a2ed48a620"}?w=400&q=80`}
                      categoryVariant={i % 2 === 0 ? "burgundy" : "navy"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Yazar Hakkında
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold font-archivo">
                    MK
                  </div>
                  <div>
                    <p className="text-sm font-bold font-archivo">Mehmet Karataş</p>
                    <p className="text-xs text-muted-foreground">Güvenlik Analisti</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  20 yılı aşkın süredir Türkiye'nin güvenlik politikalarını ve savunma stratejilerini yakından takip eden kıdemli güvenlik analisti.
                </p>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo mb-3">En Çok Okunanlar</h3>
                {[
                  "Sınır güvenliğinde yeni dönem başlıyor",
                  "Ankara'da güvenlik zirvesi toplandı",
                  "Savunma sanayiinde ihracat rekoru",
                  "Milli hafızada önemli bir gün",
                ].map((t, i) => (
                  <Link key={i} to="/haber/detay" className="group flex gap-2.5 py-2 border-b border-border last:border-0">
                    <span className="text-base font-bold font-archivo text-primary/40 w-5 flex-shrink-0">{i + 1}</span>
                    <p className="text-xs font-semibold leading-snug group-hover:text-primary transition-colors">{t}</p>
                  </Link>
                ))}
              </div>

              <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                <h3 className="text-sm font-bold font-archivo mb-2">Stratejik Not</h3>
                <p className="text-xs leading-relaxed text-secondary-foreground/80">
                  Sınır güvenliği konseptindeki dönüşüm, Türkiye'nin bölgesel güç statüsünü pekiştiren kritik bir adım olarak değerlendiriliyor.
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

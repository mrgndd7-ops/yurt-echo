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

const IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80";
const IMG2 = "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80";
const IMG3 = "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80";
const IMG4 = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80";
const IMG5 = "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80";
const IMG6 = "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />
      <CurrentNewsBand />

      <main>
        {/* Hero Section */}
        <section className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main hero */}
            <div className="lg:col-span-2">
              <NewsCard
                size="large"
                category="Güvenlik"
                title="Sınır güvenliğinde yeni dönem: devletin sahadaki refleksi yeniden şekilleniyor"
                excerpt="Güvenlik bürokrasisinin yeniden yapılandırılmasıyla birlikte sınır hattındaki operasyonel kapasite güçlendiriliyor. Yeni dönemin stratejik çerçevesi netleşiyor."
                imageUrl={IMG}
                author="Mehmet Karataş"
                date="26 Mart 2026, 13:45"
              />
            </div>
            {/* Side stories */}
            <div className="flex flex-col gap-4">
              <NewsCard
                size="small"
                category="Savunma"
                title="Yerli savunma sanayiinde kritik ihracat anlaşması imzalandı"
                imageUrl={IMG2}
                categoryVariant="navy"
              />
              <NewsCard
                size="small"
                category="Dünya"
                title="Doğu Akdeniz'de enerji denklemi yeniden şekilleniyor"
                imageUrl={IMG3}
                categoryVariant="navy"
              />
              <NewsCard
                size="small"
                category="Tarih"
                title="Çanakkale'nin 111. yılında milli hafıza ve direniş ruhu"
                imageUrl={IMG6}
              />
            </div>
          </div>
        </section>

        {/* Quick Agenda Strip */}
        <section className="bg-soft-surface border-y border-border">
          <div className="container py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { cat: "Gündem", title: "Ankara'da kritik güvenlik zirvesi başladı" },
                { cat: "Siyaset", title: "Meclis'te yeni yasa teklifi tartışılıyor" },
                { cat: "Ekonomi", title: "Merkez Bankası faiz kararını açıkladı" },
                { cat: "Güvenlik", title: "Sınır hattında dikkat çeken gelişme" },
                { cat: "Dünya", title: "Jeopolitikte yeni eşik: Balkan cephesi" },
                { cat: "Savunma", title: "Savunmada yerli kapasite artıyor" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to="/haber/detay"
                  className="group bg-card rounded-lg p-3 border border-border hover:shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <CategoryTag label={item.cat} variant="muted" className="mb-1.5" />
                  <p className="text-xs font-semibold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Gündem / Siyaset */}
              <section>
                <SectionTitle title="Gündem / Siyaset" href="/kategori/gundem" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <NewsCard
                    size="medium"
                    category="Gündem"
                    title="Devlet refleksinin öne çıktığı başlıklar: güvenlik ve diplomasi bir arada"
                    excerpt="Hükümetin son haftalardaki stratejik hamleleri, iç ve dış politikada yeni bir denge arayışına işaret ediyor."
                    imageUrl={IMG4}
                  />
                  <div className="space-y-0">
                    {[
                      "Meclis'te yeni güvenlik paketi görüşmeleri başladı",
                      "Cumhurbaşkanlığı'ndan diplomatik temas açıklaması",
                      "Yerel yönetimlerde yeni dönem planlaması",
                      "Ekonomi zirvesinde stratejik kararlar masada",
                    ].map((t, i) => (
                      <NewsCard
                        key={i}
                        size="compact"
                        category="Siyaset"
                        title={t}
                        categoryVariant="navy"
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Güvenlik */}
              <section>
                <SectionTitle title="Güvenlik" href="/kategori/guvenlik" accent="navy" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-1">
                    <NewsCard
                      size="medium"
                      category="Güvenlik"
                      title="İç güvenlikte yeni strateji belgesi hazırlanıyor"
                      imageUrl={IMG5}
                      categoryVariant="navy"
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Sınır güvenliğinde teknoloji yatırımları hız kazandı",
                      "Terörle mücadelede yeni operasyonel başarılar",
                      "Siber güvenlik altyapısı güçlendiriliyor",
                    ].map((t, i) => (
                      <NewsCard key={i} size="small" category="Güvenlik" title={t} categoryVariant="navy" />
                    ))}
                  </div>
                </div>
              </section>

              {/* Savunma */}
              <section>
                <SectionTitle title="Savunma" href="/kategori/savunma" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-1">
                    <NewsCard
                      size="medium"
                      category="Savunma"
                      title="Milli muharip uçak programında yeni aşamaya geçildi"
                      imageUrl={IMG2}
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Deniz kuvvetlerinin yeni nesil fırkateyn projesi",
                      "İHA teknolojisinde ihracat rekoru kırıldı",
                      "Savunma sanayii zirvesinden önemli kararlar",
                    ].map((t, i) => (
                      <NewsCard key={i} size="small" category="Savunma" title={t} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Dünya */}
              <section>
                <SectionTitle title="Dünya" href="/kategori/dunya" accent="navy" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-1">
                    <NewsCard
                      size="medium"
                      category="Dünya"
                      title="Doğu Akdeniz'de enerji denklemi yeniden şekilleniyor"
                      imageUrl={IMG3}
                      categoryVariant="navy"
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Balkanlar'da yeni siyasi denge arayışı",
                      "Orta Doğu'da diplomasi trafiği yoğunlaştı",
                      "Türk dünyasıyla ekonomik entegrasyon adımları",
                    ].map((t, i) => (
                      <NewsCard key={i} size="small" category="Dünya" title={t} categoryVariant="navy" />
                    ))}
                  </div>
                </div>
              </section>

              {/* Tarih / Hafıza */}
              <section>
                <SectionTitle title="Tarih / Hafıza" href="/kategori/tarih" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="md:col-span-1">
                    <NewsCard
                      size="medium"
                      category="Tarih"
                      title="Milli hafızada önemli gün: Cumhuriyet'in kuruluş iradesin yeniden okumak"
                      imageUrl={IMG6}
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Osmanlı'dan Cumhuriyet'e geçişin stratejik dersleri",
                      "Kurtuluş Savaşı'nın bilinmeyen diplomatik boyutu",
                      "Türk devlet geleneğinde kurumsallaşma",
                    ].map((t, i) => (
                      <NewsCard key={i} size="small" category="Tarih" title={t} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Analiz / Dosya */}
              <section className="bg-soft-surface rounded-lg p-5 border border-border">
                <SectionTitle title="Analiz & Dosya" href="/kategori/analiz" accent="navy" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { title: "Jeopolitikte yeni eşik: Türkiye'nin çok cepheli stratejisi", author: "Prof. Dr. Ayşe Demir" },
                    { title: "Enerji güvenliği ve milli bağımsızlık ilişkisi", author: "Doç. Dr. Hasan Yılmaz" },
                  ].map((item, i) => (
                    <Link key={i} to="/haber/detay" className="group bg-card rounded-lg p-4 border border-border hover:shadow-sm transition-all">
                      <CategoryTag label="Analiz" variant="navy" className="mb-2" />
                      <h3 className="text-base font-bold font-archivo group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-2">{item.author}</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Yazarlar */}
              <section>
                <SectionTitle title="Yazarlar" href="/yazarlar" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "Mehmet Karataş", role: "Güvenlik Analisti", article: "Sınır hattının stratejik önemi" },
                    { name: "Ayşe Demir", role: "Jeopolitik Uzmanı", article: "Doğu Akdeniz denklemi" },
                    { name: "Hasan Yılmaz", role: "Tarih Yazarı", article: "Milli hafıza ve devlet geleneği" },
                    { name: "Elif Aydın", role: "Dış Politika", article: "Diplomasi trafiğinin arka planı" },
                    { name: "Ali Kaya", role: "Savunma Muhabiri", article: "Yerli savunma hamleleri" },
                    { name: "Zeynep Arslan", role: "Ekonomi Editörü", article: "Ekonomik bağımsızlık yolu" },
                  ].map((w, i) => (
                    <Link key={i} to="/yazarlar" className="group text-center p-4 bg-card rounded-lg border border-border hover:shadow-sm transition-all">
                      <div className="w-12 h-12 mx-auto rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold font-archivo mb-2">
                        {w.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-sm font-bold font-archivo">{w.name}</p>
                      <p className="text-[10px] text-muted-foreground mb-1.5">{w.role}</p>
                      <p className="text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">{w.article}</p>
                    </Link>
                  ))}
                </div>
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
              {/* Weather & Markets */}
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

              {/* En Çok Okunanlar */}
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
                      <span className="text-lg font-bold font-archivo text-primary/40 w-6 flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-xs font-semibold font-archivo leading-snug group-hover:text-primary transition-colors">
                        {t}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bugün Tarihte / Milli Hafıza */}
              <div className="bg-soft-surface rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  Bugün Tarihte
                </h3>
                <div className="space-y-3">
                  {[
                    { year: "1915", text: "Çanakkale Kara Muharebelerinin başlaması" },
                    { year: "1921", text: "İstiklal Marşı'nın kabulü" },
                    { year: "1938", text: "Hatay Devleti'nin kurulması" },
                  ].map((h, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-xs font-bold text-primary w-10 flex-shrink-0">{h.year}</span>
                      <p className="text-xs text-foreground leading-snug">{h.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Notes */}
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

              {/* Yazarlar Teaser */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-sm font-bold font-archivo flex items-center gap-1.5 mb-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Yazarlardan
                </h3>
                {[
                  { name: "Mehmet Karataş", article: "Sınır hattının değişen dinamikleri" },
                  { name: "Ayşe Demir", article: "Küresel denge ve Türkiye" },
                  { name: "Hasan Yılmaz", article: "Tarih bilinci ve gelecek" },
                ].map((w, i) => (
                  <Link key={i} to="/yazarlar" className="group flex items-center gap-2.5 py-2 border-b border-border last:border-0">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {w.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground">{w.name}</p>
                      <p className="text-xs group-hover:text-primary transition-colors">{w.article}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>

        {/* Milli Hafıza mini module - full width */}
        <section className="bg-secondary text-secondary-foreground">
          <div className="container py-8">
            <h2 className="text-lg font-bold font-archivo mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-primary" />
              Milli Hafıza & Strateji
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Calendar, label: "Bugün Tarihte", desc: "26 Mart'ın tarihteki yeri" },
                { icon: BookOpen, label: "Milli Hafıza", desc: "Unutulmaması gereken günler" },
                { icon: TrendingUp, label: "Jeopolitik Notlar", desc: "Bölgesel güç dengesi" },
                { icon: MapPin, label: "Sınır Hattı", desc: "Güncel sınır gelişmeleri" },
                { icon: Landmark, label: "Devlet ve Strateji", desc: "Kurumsal hafıza arşivi" },
              ].map((item, i) => (
                <Link key={i} to="/kategori/tarih" className="group bg-secondary-foreground/5 rounded-lg p-4 hover:bg-secondary-foreground/10 transition-colors">
                  <item.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-sm font-bold font-archivo">{item.label}</p>
                  <p className="text-xs text-secondary-foreground/60 mt-1">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;

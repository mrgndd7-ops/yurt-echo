import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Link } from "react-router-dom";
import { PenTool } from "lucide-react";

const writers = [
  { name: "Mehmet Karataş", role: "Güvenlik Analisti", bio: "Savunma ve güvenlik politikaları üzerine uzmanlaşmış gazeteci ve analist.", initials: "MK" },
  { name: "Ayşe Demir", role: "Jeopolitik Uzmanı", bio: "Doğu Akdeniz ve Orta Doğu jeopolitiği üzerine çalışmalar yürütmektedir.", initials: "AD" },
  { name: "Hasan Yılmaz", role: "Tarih Yazarı", bio: "Osmanlı'dan Cumhuriyet'e geçiş dönemi ve milli hafıza üzerine yazmaktadır.", initials: "HY" },
  { name: "Elif Aydın", role: "Dış Politika Editörü", bio: "Türk dış politikası ve uluslararası ilişkiler alanında uzmanlaşmıştır.", initials: "EA" },
  { name: "Ali Kaya", role: "Savunma Muhabiri", bio: "Yerli savunma sanayii ve TSK operasyonlarını yakından takip etmektedir.", initials: "AK" },
  { name: "Zeynep Arslan", role: "Ekonomi Editörü", bio: "Makroekonomi, enerji güvenliği ve ekonomik bağımsızlık konularında kalem oynatan yazar.", initials: "ZA" },
];

const Yazarlar = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />
      <main className="container py-8">
        <div className="flex items-center gap-3 mb-8 border-b-2 border-border pb-4">
          <PenTool className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold font-archivo">Yazarlar</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {writers.map((writer, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-lg font-bold font-archivo flex-shrink-0">
                  {writer.initials}
                </div>
                <div>
                  <h2 className="font-bold font-archivo">{writer.name}</h2>
                  <p className="text-xs text-primary font-medium">{writer.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{writer.bio}</p>
              <Link to="/kategori/analiz" className="inline-block mt-4 text-xs font-semibold text-primary hover:underline">
                Yazılarını gör →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Yazarlar;

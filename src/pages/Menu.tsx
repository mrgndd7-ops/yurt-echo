import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Kategoriler",
    links: [
      { label: "Gündem", href: "/kategori/gundem" },
      { label: "Siyaset", href: "/kategori/siyaset" },
      { label: "Güvenlik", href: "/kategori/guvenlik" },
      { label: "Savunma", href: "/kategori/savunma" },
      { label: "Dünya", href: "/kategori/dunya" },
      { label: "Tarih", href: "/kategori/tarih" },
      { label: "Analiz", href: "/kategori/analiz" },
    ],
  },
  {
    title: "Yazarlar & İçerik",
    links: [
      { label: "Yazarlar", href: "/yazarlar" },
      { label: "Video & Röportaj", href: "/kategori/video" },
      { label: "Analiz & Dosya", href: "/kategori/analiz" },
      { label: "Milli Hafıza", href: "/kategori/tarih" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { label: "Künye", href: "/kunye" },
      { label: "Yayın İlkeleri", href: "/yayin-ilkeleri" },
      { label: "Gizlilik", href: "/gizlilik" },
      { label: "İletişim", href: "/iletisim" },
      { label: "Reklam", href: "/reklam" },
    ],
  },
];

const Menu = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <UtilityBar />
      <Header />
      <main className="container py-8">
        <h1 className="text-2xl font-bold font-archivo mb-8 border-b-2 border-border pb-4">Menü</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xs font-bold font-archivo uppercase tracking-widest text-muted-foreground mb-3">
                {section.title}
              </h2>
              <ul className="space-y-1">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.href}
                      className="flex items-center justify-between py-2.5 border-b border-border text-sm font-medium hover:text-primary transition-colors group"
                    >
                      {link.label}
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Menu;

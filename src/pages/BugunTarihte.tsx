import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useOnThisDay } from "@/hooks/useOnThisDay";

function todayLabel() {
  return new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

const BugunTarihte = () => {
  const { events, loading, error } = useOnThisDay(20);

  return (
    <div className="min-h-screen bg-background">
      <UtilityBar />
      <Header />
      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold font-archivo">Bugün Tarihte</h1>
          <span className="text-muted-foreground text-sm font-medium ml-1">— {todayLabel()}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Türk, Osmanlı ve dünya tarihinden bugün yaşanan önemli olaylar.
        </p>
        {loading && (
          <div className="space-y-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                <div className="w-16 h-5 bg-muted rounded flex-shrink-0" />
                <div className="flex-1 h-5 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="text-center py-16 text-muted-foreground">
            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>Veriler yüklenirken bir hata oluştu.</p>
          </div>
        )}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>Bugün için kayıt bulunamadı.</p>
          </div>
        )}
        {!loading && events.length > 0 && (
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
                <span className="text-base font-bold font-archivo text-primary w-16 flex-shrink-0 pt-0.5">
                  {e.year}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{e.text}</p>
                  {e.pageUrl && (
                    <a href={e.pageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1.5">
                      Wikipedia da oku
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                {e.thumbnail && (
                  <img src={e.thumbnail} alt="" className="w-16 h-16 object-cover rounded flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default BugunTarihte;

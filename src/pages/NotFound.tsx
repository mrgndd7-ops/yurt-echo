import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import UtilityBar from "@/components/layout/UtilityBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — Sayfa bulunamadı:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0 flex flex-col">
      <UtilityBar />
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-8xl font-bold font-archivo text-primary/20 mb-2">404</p>
          <h1 className="text-2xl font-bold font-archivo mb-3">Sayfa Bulunamadı</h1>
          <p className="text-muted-foreground mb-6">
            Aradığınız sayfa kaldırılmış, taşınmış ya da hiç var olmamış olabilir.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold font-archivo rounded-md hover:bg-primary/90 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default NotFound;

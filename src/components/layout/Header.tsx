import { Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/yurt-logo.png";

const navItems = [
  { label: "Gündem", href: "/kategori/gundem" },
  { label: "Siyaset", href: "/kategori/siyaset" },
  { label: "Güvenlik", href: "/kategori/guvenlik" },
  { label: "Savunma", href: "/kategori/savunma" },
  { label: "Dünya", href: "/kategori/dunya" },
  { label: "Tarih", href: "/kategori/tarih" },
  { label: "Yazarlar", href: "/yazarlar" },
  { label: "Analiz", href: "/kategori/analiz" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container">
        {/* Main header row */}
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Yurt" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-2 text-sm font-medium font-archivo text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Search className="h-4 w-4 text-foreground" />
            </button>
            <Link
              to="/uyelik"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium font-archivo rounded-md hover:bg-primary/90 transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              Abone Ol
            </Link>
            <button
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-3 py-2.5 text-sm font-medium font-archivo text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/uyelik"
              className="md:hidden mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium font-archivo rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="h-3.5 w-3.5" />
              Abone Ol
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

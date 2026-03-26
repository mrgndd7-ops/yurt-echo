import { Home, Newspaper, BarChart3, PenTool, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Anasayfa", icon: Home, href: "/" },
  { label: "Gündem", icon: Newspaper, href: "/kategori/gundem" },
  { label: "Analiz", icon: BarChart3, href: "/kategori/analiz" },
  { label: "Yazarlar", icon: PenTool, href: "/yazarlar" },
  { label: "Menü", icon: Menu, href: "/menu" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

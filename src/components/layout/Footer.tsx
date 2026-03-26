import { Link } from "react-router-dom";
import logo from "@/assets/yurt-logo.png";

const footerLinks = [
  { label: "Künye", href: "/kunye" },
  { label: "Yayın İlkeleri", href: "/yayin-ilkeleri" },
  { label: "Gizlilik", href: "/gizlilik" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Reklam", href: "/reklam" },
  { label: "RSS", href: "/rss" },
];

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <img src={logo} alt="Yurt" className="h-10 w-auto brightness-0 invert" />
            <p className="text-sm text-secondary-foreground/70 font-inter italic">
              Milletin hafızası, memleketin gündemi
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-secondary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social & copyright */}
          <div className="space-y-3 md:text-right">
            <div className="flex gap-3 md:justify-end">
              {["X", "YT", "IG", "TG"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-md bg-secondary-foreground/10 flex items-center justify-center text-xs font-bold text-secondary-foreground/60 hover:bg-secondary-foreground/20 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-secondary-foreground/50">
              © 2026 Yurt Medya. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

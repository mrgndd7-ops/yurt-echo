import { Link } from "react-router-dom";
import CategoryTag from "./CategoryTag";
import { Clock } from "lucide-react";
import logo from "@/assets/yurt-logo.png";

interface NewsCardProps {
  category: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  size?: "large" | "medium" | "small" | "compact";
  categoryVariant?: "burgundy" | "navy" | "muted";
  state?: object;
}

function slugify(title: string) {
  return encodeURIComponent(title.slice(0, 60).toLowerCase().replace(/s+/g, "-"));
}

function ImgBox({ src, alt, className }: { src?: string; alt: string; className: string }) {
  if (src) {
    return (
      <div className={`${className} overflow-hidden`}>
        <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
    );
  }
  return (
    <div className={`${className} bg-muted flex items-center justify-center`}>
      <img src={logo} alt="Yurt" className="w-1/3 max-w-[80px] opacity-25 object-contain" />
    </div>
  );
}

const NewsCard = ({
  category,
  title,
  excerpt,
  imageUrl,
  date = "26 Mart 2026",
  author,
  size = "medium",
  categoryVariant = "burgundy",
  state,
}: NewsCardProps) => {
  const to = `/haber/${slugify(title)}`;

  if (size === "compact") {
    return (
      <Link to={to} state={state} className="group flex gap-3 py-3 border-b border-border last:border-0">
        <ImgBox src={imageUrl} alt={title} className="w-20 h-14 rounded flex-shrink-0" />
        <div className="min-w-0">
          <CategoryTag label={category} variant={categoryVariant} className="mb-1" />
          <h4 className="text-sm font-semibold font-archivo leading-tight line-clamp-2 group-hover:text-primary transition-colors">{title}</h4>
        </div>
      </Link>
    );
  }

  if (size === "small") {
    return (
      <Link to={to} state={state} className="group block">
        <ImgBox src={imageUrl} alt={title} className="aspect-[16/10] rounded-lg mb-2.5" />
        <CategoryTag label={category} variant={categoryVariant} className="mb-1.5" />
        <h3 className="text-sm font-bold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /><span>{date}</span>
        </div>
      </Link>
    );
  }

  if (size === "large") {
    return (
      <Link to={to} state={state} className="group block">
        <ImgBox src={imageUrl} alt={title} className="aspect-[16/9] rounded-lg mb-4" />
        <CategoryTag label={category} variant={categoryVariant} className="mb-2" />
        <h2 className="text-xl md:text-2xl font-bold font-archivo leading-tight group-hover:text-primary transition-colors">{title}</h2>
        {excerpt && <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{excerpt}</p>}
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          {author && <span className="font-medium text-foreground">{author}</span>}
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{date}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={to} state={state} className="group block">
      <ImgBox src={imageUrl} alt={title} className="aspect-[16/10] rounded-lg mb-3" />
      <CategoryTag label={category} variant={categoryVariant} className="mb-1.5" />
      <h3 className="text-base font-bold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
      {excerpt && <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>}
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" /><span>{date}</span>
      </div>
    </Link>
  );
};

export default NewsCard;

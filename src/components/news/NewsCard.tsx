import { Link } from "react-router-dom";
import CategoryTag from "./CategoryTag";
import { Clock } from "lucide-react";

interface NewsCardProps {
  category: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  date?: string;
  author?: string;
  size?: "large" | "medium" | "small" | "compact";
  categoryVariant?: "burgundy" | "navy" | "muted";
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
}: NewsCardProps) => {
  if (size === "compact") {
    return (
      <Link to="/haber/detay" className="group flex gap-3 py-3 border-b border-border last:border-0">
        {imageUrl && (
          <div className="w-20 h-14 rounded overflow-hidden flex-shrink-0">
            <img src={imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="min-w-0">
          <CategoryTag label={category} variant={categoryVariant} className="mb-1" />
          <h4 className="text-sm font-semibold font-archivo leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h4>
        </div>
      </Link>
    );
  }

  if (size === "small") {
    return (
      <Link to="/haber/detay" className="group block">
        {imageUrl && (
          <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2.5">
            <img src={imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <CategoryTag label={category} variant={categoryVariant} className="mb-1.5" />
        <h3 className="text-sm font-bold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{date}</span>
        </div>
      </Link>
    );
  }

  if (size === "large") {
    return (
      <Link to="/haber/detay" className="group block">
        {imageUrl && (
          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <img src={imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
          </div>
        )}
        <CategoryTag label={category} variant={categoryVariant} className="mb-2" />
        <h2 className="text-xl md:text-2xl font-bold font-archivo leading-tight group-hover:text-primary transition-colors">
          {title}
        </h2>
        {excerpt && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          {author && <span className="font-medium text-foreground">{author}</span>}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {date}
          </span>
        </div>
      </Link>
    );
  }

  // medium
  return (
    <Link to="/haber/detay" className="group block">
      {imageUrl && (
        <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3">
          <img src={imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <CategoryTag label={category} variant={categoryVariant} className="mb-1.5" />
      <h3 className="text-base font-bold font-archivo leading-snug line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      {excerpt && (
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
      )}
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{date}</span>
      </div>
    </Link>
  );
};

export default NewsCard;

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  href?: string;
  accent?: "burgundy" | "navy";
}

const SectionTitle = ({ title, href, accent = "burgundy" }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-5 border-b-2 border-border pb-2">
      <h2 className="text-lg font-bold font-archivo flex items-center gap-2">
        <span
          className={`w-1 h-5 rounded-full ${
            accent === "burgundy" ? "bg-primary" : "bg-secondary"
          }`}
        />
        {title}
      </h2>
      {href && (
        <Link
          to={href}
          className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-0.5"
        >
          Tümünü gör
          <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;

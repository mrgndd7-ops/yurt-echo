import { cn } from "@/lib/utils";

interface CategoryTagProps {
  label: string;
  variant?: "burgundy" | "navy" | "muted";
  className?: string;
}

const CategoryTag = ({ label, variant = "burgundy", className }: CategoryTagProps) => {
  return (
    <span
      className={cn(
        "inline-block text-[10px] font-bold font-archivo uppercase tracking-wider px-2 py-0.5 rounded-sm",
        variant === "burgundy" && "bg-primary text-primary-foreground",
        variant === "navy" && "bg-secondary text-secondary-foreground",
        variant === "muted" && "bg-muted text-muted-foreground",
        className
      )}
    >
      {label}
    </span>
  );
};

export default CategoryTag;

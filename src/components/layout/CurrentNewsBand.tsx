import { Clock } from "lucide-react";

const CurrentNewsBand = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between py-2 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-shrink-0 bg-primary-foreground/20 text-primary-foreground text-[10px] font-bold font-archivo px-2 py-0.5 rounded-sm tracking-wider">
            SON GELİŞME
          </span>
          <p className="text-sm font-medium truncate">
            Ankara'da güvenlik zirvesi: sınır hattına ilişkin yeni değerlendirmeler gündemde
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1 text-xs text-primary-foreground/80 flex-shrink-0">
          <Clock className="h-3 w-3" />
          14:32
        </span>
      </div>
    </div>
  );
};

export default CurrentNewsBand;

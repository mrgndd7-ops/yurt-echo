import { Cloud, TrendingUp, Radio, Bell, Smartphone } from "lucide-react";

const UtilityBar = () => {
  return (
    <div className="bg-secondary text-secondary-foreground text-xs">
      <div className="container flex items-center justify-between py-1.5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Cloud className="h-3 w-3" />
            Ankara 12°C
          </span>
          <span className="hidden sm:inline text-secondary-foreground/70">|</span>
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Dolar: 38,42
            </span>
            <span>Euro: 41,18</span>
            <span>Altın: 3.284</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <Radio className="h-3 w-3" />
            <span className="hidden sm:inline">Canlı Yayın</span>
          </button>
          <button className="hover:text-primary transition-colors">
            <Bell className="h-3 w-3" />
          </button>
          <button className="hover:text-primary transition-colors">
            <Smartphone className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;

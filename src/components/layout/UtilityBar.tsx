import { Cloud, TrendingUp, Radio, Bell, Smartphone } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";

const UtilityBar = () => {
  const { data, loading } = useMarketData();

  return (
    <div className="bg-secondary text-secondary-foreground text-xs">
      <div className="container flex items-center justify-between py-1.5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Cloud className="h-3 w-3" />
            Ankara
          </span>
          <span className="hidden sm:inline text-secondary-foreground/70">|</span>
          <div className="hidden sm:flex items-center gap-3">
            <TrendingUp className="h-3 w-3" />
            {loading ? (
              <span className="opacity-50">Yükleniyor...</span>
            ) : (
              data.slice(0, 3).map((item) => (
                <span key={item.label} className="flex items-center gap-1">
                  {item.label}: <span className="font-medium">{item.value}</span>
                  <span className={item.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                    {item.change}
                  </span>
                </span>
              ))
            )}
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

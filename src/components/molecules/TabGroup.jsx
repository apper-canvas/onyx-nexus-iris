import { cn } from "@/utils/cn";

const TabGroup = ({ tabs, activeTab, onChange, className }) => {
  return (
<div className={cn("flex border-b border-orange-200", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
activeTab === tab.value
              ? "text-primary border-primary"
              : "text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300"
          )}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full",
activeTab === tab.value
                  ? "bg-primary/10 text-primary"
                  : "bg-slate-100 text-slate-600"
              )}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TabGroup;
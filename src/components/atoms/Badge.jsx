import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", className }) => {
const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-yellow-50 text-yellow-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
    primary: "bg-purple-50 text-purple-700",
    secondary: "bg-purple-50 text-purple-700"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
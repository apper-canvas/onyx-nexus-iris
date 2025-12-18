import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className,
  type = "text",
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
className={cn(
        "w-full px-3 py-2 text-sm border border-slate-200 rounded-md",
        "focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500",
        "disabled:bg-slate-50 disabled:cursor-not-allowed",
        "placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
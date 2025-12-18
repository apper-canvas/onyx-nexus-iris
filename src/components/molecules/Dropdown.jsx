import { useState, useRef, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Dropdown = ({ 
  trigger, 
  children, 
  align = "left",
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0"
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[12rem]",
          alignmentClasses[align],
          className
        )}>
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2",
        className
      )}
    >
      {children}
    </button>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
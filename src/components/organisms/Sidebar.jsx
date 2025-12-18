import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "", icon: "LayoutDashboard", label: "Dashboard" },
    { path: "contacts", icon: "Users", label: "Contacts" },
    { path: "companies", icon: "Building2", label: "Companies" },
    { path: "deals", icon: "TrendingUp", label: "Deals" },
    { path: "reports", icon: "BarChart3", label: "Reports" },
    { path: "settings", icon: "Settings", label: "Settings" }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Mobile (Transform Overlay) */}
<aside className={cn(
        "fixed top-0 left-0 h-full w-60 bg-white border-r border-slate-200 z-50",
        "transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
<div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Network" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">HubSpot</h1>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
              <ApperIcon name="X" size={24} />
            </button>
          </div>
        </div>

<nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/${item.path}`}
              onClick={onClose}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                isActive 
                  ? "bg-orange-50 text-orange-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

{/* Sidebar - Desktop (Fixed) */}
      <aside className="hidden lg:block fixed top-0 left-0 w-60 bg-white border-r border-slate-200 min-h-screen z-40">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Network" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">HubSpot</h1>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/${item.path}`}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                isActive 
                  ? "bg-orange-50 text-orange-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
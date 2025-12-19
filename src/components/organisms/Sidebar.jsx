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
        "fixed top-0 left-0 h-full w-60 bg-purple-900 z-50",
        "transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
<div className="p-6 border-b border-purple-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Network" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">HubSpot</h1>
            </div>
            <button onClick={onClose} className="lg:hidden text-purple-300 hover:text-white">
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
                  ? "bg-purple-800 text-white font-medium" 
                  : "text-purple-100 hover:bg-purple-800 hover:text-white"
              )}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

{/* Sidebar - Desktop (Fixed) */}
<aside className="hidden lg:block fixed top-0 left-0 w-60 bg-purple-900 min-h-screen z-40">
        <div className="p-6 border-b border-purple-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Network" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">HubSpot</h1>
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
                  ? "bg-purple-800 text-white font-medium" 
                  : "text-purple-100 hover:bg-purple-800 hover:text-white"
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
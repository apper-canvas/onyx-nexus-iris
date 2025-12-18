import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing here yet",
  actionLabel,
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex items-center justify-center py-16 px-8">
      <div className="text-center space-y-6 max-w-md">
<div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} className="w-10 h-10 text-slate-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-slate-600">{description}</p>
        </div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;
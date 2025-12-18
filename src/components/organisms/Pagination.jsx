import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  perPage, 
  totalItems,
  onPageChange, 
  onPerPageChange 
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const displayPages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 3)
  );

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
<div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-100">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          Showing {startItem}-{endItem} of {totalItems} contacts
        </span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "p-2 rounded-lg transition-colors",
            currentPage === 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          <ApperIcon name="ChevronLeft" size={18} />
        </button>

        {displayPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
page === currentPage
                ? "bg-orange-500 text-white"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "p-2 rounded-lg transition-colors",
            currentPage === totalPages
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100"
          )}
        >
          <ApperIcon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
import ApperIcon from "@/components/ApperIcon";

const Deals = () => {
  return (
<div className="flex items-center justify-center py-16">
      <div className="text-center space-y-6 max-w-md">
<div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <ApperIcon name="TrendingUp" className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Sales Pipeline</h2>
          <p className="text-slate-600">
            Visualize your sales pipeline with drag-and-drop deal cards, stage tracking, and revenue forecasting.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Deal tracking and pipeline visualization coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Deals;
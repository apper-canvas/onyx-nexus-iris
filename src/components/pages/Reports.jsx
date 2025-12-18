import ApperIcon from "@/components/ApperIcon";

const Reports = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mx-auto shadow-lg">
          <ApperIcon name="BarChart3" className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Analytics & Reports</h2>
          <p className="text-slate-600">
            Generate comprehensive reports with customizable dashboards, data visualizations, and export capabilities.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Reporting dashboard in progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
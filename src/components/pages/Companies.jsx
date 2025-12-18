import ApperIcon from "@/components/ApperIcon";

const Companies = () => {
  return (
<div className="flex items-center justify-center py-16">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto shadow-lg">
          <ApperIcon name="Building2" className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Company Management</h2>
          <p className="text-slate-600">
            Organize and track company accounts with detailed profiles, relationship history, and team assignments.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Company management features in development
          </p>
        </div>
      </div>
    </div>
  );
};

export default Companies;
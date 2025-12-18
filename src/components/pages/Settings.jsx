import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <ApperIcon name="Settings" className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">System Settings</h2>
          <p className="text-slate-600">
            Configure system preferences, customize fields, manage users, and integrate with third-party tools.
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            System configuration options coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
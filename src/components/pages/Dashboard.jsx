import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const metrics = [
    { icon: "Users", label: "Total Contacts", value: "1,234", change: "+12.5%", trend: "up" },
    { icon: "TrendingUp", label: "Active Deals", value: "45", change: "+8.3%", trend: "up" },
    { icon: "DollarSign", label: "Revenue", value: "$125K", change: "+15.2%", trend: "up" },
    { icon: "Target", label: "Conversion Rate", value: "24.5%", change: "-2.1%", trend: "down" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">
            Welcome back! Here's an overview of your CRM performance.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <ApperIcon name={metric.icon} className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600">{metric.label}</p>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Sales Analytics</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Comprehensive analytics dashboard with revenue trends, conversion funnels, and performance metrics coming soon.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-center text-sm text-slate-500">
              Analytics dashboard in development
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="Activity" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Track recent interactions, deal updates, and team activities across your customer relationships.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-center text-sm text-slate-500">
              Activity feed coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const metrics = [
    { 
      icon: "Users", 
      label: "Total Contacts", 
      value: "1,234", 
      change: "+12.5%", 
      trend: "up",
      filter: "all",
      route: "contacts"
    },
    { 
      icon: "TrendingUp", 
      label: "Active Deals", 
      value: "45", 
      change: "+8.3%", 
      trend: "up",
      filter: "active",
      route: "deals"
    },
    { 
      icon: "DollarSign", 
      label: "Pipeline Value", 
      value: "$2.4M", 
      change: "+15.2%", 
      trend: "up",
      filter: "pipeline",
      route: "deals"
    },
    { 
      icon: "Target", 
      label: "Conversion Rate", 
      value: "24.5%", 
      change: "-2.1%", 
      trend: "down",
      filter: "conversion",
      route: "reports"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "contact_created",
      title: "New contact added",
      description: "Sarah Johnson from TechCorp",
      timestamp: "2 minutes ago",
      icon: "UserPlus",
      color: "text-green-600"
    },
    {
      id: 2,
      type: "deal_updated",
      title: "Deal moved to negotiation",
      description: "Enterprise Software License - $50K",
      timestamp: "15 minutes ago",
      icon: "TrendingUp",
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "email_sent",
      title: "Follow-up email sent",
      description: "To 5 qualified leads",
      timestamp: "1 hour ago",
      icon: "Mail",
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "meeting_scheduled",
      title: "Demo scheduled",
      description: "With Global Industries for tomorrow",
      timestamp: "2 hours ago",
      icon: "Calendar",
      color: "text-orange-600"
    }
  ];

  const handleMetricClick = (metric) => {
    if (metric.route === "contacts") {
      navigate("/contacts");
    } else if (metric.route === "deals") {
      navigate("/deals");
    } else if (metric.route === "reports") {
      navigate("/reports");
    }
  };

  const handleActivityClick = (activity) => {
    // Navigate to relevant record based on activity type
    if (activity.type === "contact_created") {
      navigate("/contacts");
    } else if (activity.type === "deal_updated") {
      navigate("/deals");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">
              Welcome back! Here's an overview of your CRM performance.
            </p>
          </div>
          <Button onClick={() => navigate("/reports")} className="hidden sm:flex">
            <ApperIcon name="BarChart3" size={16} className="mr-2" />
            View Reports
          </Button>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              onClick={() => handleMetricClick(metric)}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ApperIcon name={metric.icon} className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium flex items-center gap-1 ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <ApperIcon 
                    name={metric.trend === "up" ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                  />
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Sales Performance</h3>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" size={16} />
                </Button>
              </div>
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <ApperIcon name="BarChart3" className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Interactive charts coming soon</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Pipeline Overview</h3>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" size={16} />
                </Button>
              </div>
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <ApperIcon name="PieChart" className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Pipeline visualization in development</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                <ApperIcon name="MoreHorizontal" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 ${activity.color} group-hover:scale-105 transition-transform`}>
                    <ApperIcon name={activity.icon} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ApperIcon name="Star" size={14} className="text-slate-400 hover:text-yellow-500" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button variant="ghost" size="sm" className="w-full">
                View all activity
                <ApperIcon name="ArrowRight" size={14} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
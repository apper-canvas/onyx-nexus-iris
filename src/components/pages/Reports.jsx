import ApperIcon from "@/components/ApperIcon";
import React from "react";
import Button from "@/components/atoms/Button";

const Reports = () => {
  const reportTemplates = [
    {
      id: 1,
      name: "Contact Analytics",
      description: "Comprehensive analysis of contact data, lead sources, and conversion rates",
      icon: "Users",
      category: "Sales",
      lastRun: "2 days ago",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Sales Performance",
      description: "Revenue trends, deal pipeline, and sales team performance metrics",
      icon: "TrendingUp",
      category: "Sales",
      lastRun: "1 week ago",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Pipeline Analysis",
      description: "Deal stage progression, win rates, and sales cycle analysis",
      icon: "BarChart3",
      category: "Pipeline",
      lastRun: "3 days ago",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "Activity Report",
      description: "Team activity tracking, communication logs, and engagement metrics",
      icon: "Activity",
      category: "Activity",
      lastRun: "Never",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      name: "Lead Source Analysis",
      description: "Lead generation effectiveness and source ROI analysis",
      icon: "Target",
      category: "Marketing",
      lastRun: "5 days ago",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 6,
      name: "Customer Retention",
      description: "Customer lifecycle analysis and retention rate metrics",
      icon: "Heart",
      category: "Customer",
      lastRun: "1 month ago",
      color: "from-red-500 to-red-600"
    }
  ];

  const categories = ["All", "Sales", "Pipeline", "Marketing", "Activity", "Customer"];

  const handleGenerateReport = (template) => {
    // Simulate report generation
    alert(`Generating ${template.name} report...`);
  };

  const handleExportReport = (template) => {
    // Simulate export functionality
    alert(`Exporting ${template.name} as PDF...`);
  };

return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate insights and export business analytics from your CRM data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <ApperIcon name="Upload" size={16} className="mr-2" />
            Import Data
          </Button>
          <Button>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={category === "All" ? "primary" : "ghost"}
            size="sm"
            className={category === "All" ? "" : "border border-slate-300"}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}
              >
                <ApperIcon name={template.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                  {template.category}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {template.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ApperIcon name="Clock" size={12} />
                Last run: {template.lastRun}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200">
              <Button
                onClick={() => handleGenerateReport(template)}
                size="sm"
                className="flex-1"
              >
                <ApperIcon name="Play" size={14} className="mr-2" />
                Generate
              </Button>
              <Button
                onClick={() => handleExportReport(template)}
                variant="ghost"
                size="sm"
                className="border border-slate-300"
              >
                <ApperIcon name="Download" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary">24</div>
          <div className="text-sm text-slate-600">Reports Generated</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-slate-600">Data Points Analyzed</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-sm text-slate-600">Scheduled Reports</div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">92%</div>
          <div className="text-sm text-slate-600">Data Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
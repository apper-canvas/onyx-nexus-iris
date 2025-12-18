import ApperIcon from "@/components/ApperIcon";
import React, { useState } from "react";
import Button from "@/components/atoms/Button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    company: {
      name: "Nexus Corporation",
      email: "admin@nexuscorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Suite 100",
      city: "San Francisco",
      country: "United States",
      website: "https://nexuscorp.com"
    },
    system: {
      timezone: "America/Los_Angeles",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12-hour",
      currency: "USD",
      language: "English"
    },
    notifications: {
      emailAlerts: true,
      browserNotifications: true,
      dailyDigest: true,
      weeklyReport: false
    }
  });

  const settingsTabs = [
    { id: "general", label: "General", icon: "Settings" },
    { id: "company", label: "Company", icon: "Building" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "integrations", label: "Integrations", icon: "Plug" },
    { id: "security", label: "Security", icon: "Shield" }
  ];

  const timezones = [
    "America/Los_Angeles",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo"
  ];

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "CAD", name: "Canadian Dollar" }
  ];

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Simulate save operation
    alert("Settings saved successfully!");
  };

  return (
<div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure your CRM system preferences and company information.
          </p>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex space-x-8">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <ApperIcon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="max-w-4xl">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">System Preferences</h3>
                
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.system.timezone}
                      onChange={(e) => handleInputChange("system", "timezone", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={settings.system.currency}
                      onChange={(e) => handleInputChange("system", "currency", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date Format
                    </label>
                    <select
                      value={settings.system.dateFormat}
                      onChange={(e) => handleInputChange("system", "dateFormat", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Time Format
                    </label>
                    <select
                      value={settings.system.timeFormat}
                      onChange={(e) => handleInputChange("system", "timeFormat", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="12-hour">12-hour</option>
                      <option value="24-hour">24-hour</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Company Information</h3>
                
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.company.name}
                      onChange={(e) => handleInputChange("company", "name", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.company.email}
                      onChange={(e) => handleInputChange("company", "email", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={settings.company.phone}
                      onChange={(e) => handleInputChange("company", "phone", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={settings.company.address}
                      onChange={(e) => handleInputChange("company", "address", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={settings.company.city}
                      onChange={(e) => handleInputChange("company", "city", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={settings.company.website}
                      onChange={(e) => handleInputChange("company", "website", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <Button onClick={handleSaveSettings}>
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
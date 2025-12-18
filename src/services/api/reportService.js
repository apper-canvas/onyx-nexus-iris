const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ReportService {
  constructor() {
    this.reports = [];
    this.templates = [
      {
        id: 1,
        name: "Contact Analytics",
        type: "contact",
        description: "Contact data analysis with lead sources and conversion rates",
        fields: ["name", "email", "leadStatus", "createdDate", "lastActivity"]
      },
      {
        id: 2,
        name: "Sales Performance", 
        type: "sales",
        description: "Revenue trends and sales team performance",
        fields: ["dealValue", "closeDate", "salesRep", "stage"]
      }
    ];
  }

  async getTemplates() {
    await delay(200);
    return this.templates.map(template => ({ ...template }));
  }

  async generateReport(templateId, options = {}) {
    await delay(1000);
    
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    // Simulate report generation with mock data
    const reportData = {
      id: Date.now(),
      templateId,
      templateName: template.name,
      generatedAt: new Date().toISOString(),
      data: this.generateMockData(template.type),
      options
    };

    this.reports.push(reportData);
    return reportData;
  }

  generateMockData(type) {
    switch(type) {
      case 'contact':
        return {
          totalContacts: 1234,
          newThisMonth: 156,
          conversionRate: 24.5,
          leadSources: [
            { source: 'Website', count: 456, percentage: 37 },
            { source: 'Referral', count: 234, percentage: 19 },
            { source: 'Social Media', count: 189, percentage: 15 }
          ]
        };
      case 'sales':
        return {
          totalRevenue: 2400000,
          avgDealSize: 53333,
          winRate: 68,
          pipelineValue: 4200000,
          salesByMonth: [
            { month: 'Jan', revenue: 180000 },
            { month: 'Feb', revenue: 220000 },
            { month: 'Mar', revenue: 195000 }
          ]
        };
      default:
        return {};
    }
  }

  async exportReport(reportId, format = 'pdf') {
    await delay(500);
    
    const report = this.reports.find(r => r.id === reportId);
    if (!report) {
      throw new Error('Report not found');
    }

    // Simulate file export
    return {
      filename: `${report.templateName}_${new Date().toISOString().split('T')[0]}.${format}`,
      url: '#',
      format
    };
  }

  async getReportHistory() {
    await delay(300);
    return this.reports.map(report => ({ ...report }));
  }

  async scheduleReport(templateId, schedule) {
    await delay(400);
    
    const scheduledReport = {
      id: Date.now(),
      templateId,
      schedule,
      createdAt: new Date().toISOString(),
      active: true
    };

    return scheduledReport;
  }

  async deleteReport(reportId) {
    await delay(200);
    const index = this.reports.findIndex(r => r.id === reportId);
    if (index > -1) {
      this.reports.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default new ReportService();
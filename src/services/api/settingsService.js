const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SettingsService {
  constructor() {
    this.settings = {
      company: {
        name: "Nexus Corporation",
        email: "admin@nexuscorp.com", 
        phone: "+1 (555) 123-4567",
        address: "123 Business Ave, Suite 100",
        city: "San Francisco",
        country: "United States",
        website: "https://nexuscorp.com",
        logo: null
      },
      system: {
        timezone: "America/Los_Angeles",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12-hour",
        currency: "USD",
        language: "English",
        fiscalYear: "January"
      },
      notifications: {
        emailAlerts: true,
        browserNotifications: true,
        dailyDigest: true,
        weeklyReport: false,
        mentionAlerts: true,
        taskReminders: true
      },
      privacy: {
        dataRetention: 365,
        cookieConsent: true,
        analyticsEnabled: true,
        shareUsageData: false
      },
      security: {
        passwordExpiration: 90,
        twoFactorRequired: false,
        sessionTimeout: 60,
        loginAttempts: 5
      }
    };
  }

  async getSettings(category = null) {
    await delay(200);
    
    if (category) {
      return { ...this.settings[category] };
    }
    
    return JSON.parse(JSON.stringify(this.settings));
  }

  async updateSettings(category, newSettings) {
    await delay(300);
    
    if (!this.settings[category]) {
      throw new Error(`Settings category '${category}' not found`);
    }

    // Validate required fields
    if (category === 'company' && !newSettings.name) {
      throw new Error('Company name is required');
    }

    if (category === 'system' && !newSettings.currency) {
      throw new Error('Currency is required');
    }

    this.settings[category] = {
      ...this.settings[category],
      ...newSettings
    };

    return { ...this.settings[category] };
  }

  async resetSettings(category) {
    await delay(200);
    
    const defaults = {
      system: {
        timezone: "America/Los_Angeles",
        dateFormat: "MM/DD/YYYY", 
        timeFormat: "12-hour",
        currency: "USD",
        language: "English",
        fiscalYear: "January"
      },
      notifications: {
        emailAlerts: true,
        browserNotifications: true,
        dailyDigest: true,
        weeklyReport: false,
        mentionAlerts: true,
        taskReminders: true
      }
    };

    if (defaults[category]) {
      this.settings[category] = { ...defaults[category] };
      return this.settings[category];
    }

    throw new Error(`Cannot reset ${category} settings`);
  }

  async validateSettings(category, settings) {
    await delay(100);
    
    const errors = [];

    if (category === 'company') {
      if (!settings.name?.trim()) {
        errors.push('Company name is required');
      }
      if (settings.email && !this.isValidEmail(settings.email)) {
        errors.push('Invalid email format');
      }
      if (settings.website && !this.isValidUrl(settings.website)) {
        errors.push('Invalid website URL');
      }
    }

    if (category === 'security') {
      if (settings.passwordExpiration < 30 || settings.passwordExpiration > 365) {
        errors.push('Password expiration must be between 30 and 365 days');
      }
      if (settings.sessionTimeout < 15 || settings.sessionTimeout > 480) {
        errors.push('Session timeout must be between 15 and 480 minutes');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  async exportSettings() {
    await delay(400);
    
    const exportData = {
      exportDate: new Date().toISOString(),
      version: "1.0",
      settings: this.settings
    };

    return {
      filename: `crm_settings_${new Date().toISOString().split('T')[0]}.json`,
      data: JSON.stringify(exportData, null, 2)
    };
  }

  async importSettings(settingsData) {
    await delay(500);
    
    try {
      const importedData = typeof settingsData === 'string' 
        ? JSON.parse(settingsData)
        : settingsData;

      // Validate structure
      if (!importedData.settings) {
        throw new Error('Invalid settings file format');
      }

      // Backup current settings
      const backup = { ...this.settings };
      
      try {
        // Merge imported settings
        Object.keys(importedData.settings).forEach(category => {
          if (this.settings[category]) {
            this.settings[category] = {
              ...this.settings[category],
              ...importedData.settings[category]
            };
          }
        });

        return {
          success: true,
          message: 'Settings imported successfully',
          categoriesUpdated: Object.keys(importedData.settings)
        };
      } catch (error) {
        // Restore backup on error
        this.settings = backup;
        throw error;
      }
    } catch (error) {
      throw new Error('Failed to import settings: ' + error.message);
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export default new SettingsService();
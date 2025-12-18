const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CsvService {
  constructor() {
    this.fieldMappings = {
      contacts: {
        'Name': 'name',
        'First Name': 'firstName', 
        'Last Name': 'lastName',
        'Email': 'email',
        'Phone': 'phone',
        'Company': 'company',
        'Lead Status': 'leadStatus',
        'Topics': 'topics',
        'Created Date': 'createdDate',
        'Last Activity': 'lastActivity'
      }
    };
  }

  async parseCSV(file) {
    await delay(500);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvText = e.target.result;
          const lines = csvText.split('\n').filter(line => line.trim());
          
          if (lines.length === 0) {
            reject(new Error('CSV file is empty'));
            return;
          }

          const headers = this.parseCSVLine(lines[0]);
          const rows = [];
          
          for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
              const row = {};
              headers.forEach((header, index) => {
                row[header] = values[index]?.trim() || '';
              });
              rows.push(row);
            }
          }

          resolve({
            headers,
            rows,
            rowCount: rows.length,
            preview: rows.slice(0, 5) // First 5 rows for preview
          });
        } catch (error) {
          reject(new Error('Failed to parse CSV file: ' + error.message));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result.map(field => field.replace(/^"|"$/g, ''));
  }

  async validateData(data, mappings) {
    await delay(300);
    
    const errors = [];
    const warnings = [];
    
    data.rows.forEach((row, index) => {
      const rowNumber = index + 2; // +2 for header row and 0-based index
      
      // Check required fields
      if (mappings.name && !row[mappings.name]) {
        errors.push(`Row ${rowNumber}: Name is required`);
      }
      
      if (mappings.email) {
        const email = row[mappings.email];
        if (email && !this.isValidEmail(email)) {
          errors.push(`Row ${rowNumber}: Invalid email format - ${email}`);
        }
      }
      
      // Check for duplicates within the CSV
      if (mappings.email) {
        const email = row[mappings.email];
        const duplicateIndex = data.rows.findIndex((r, i) => 
          i !== index && r[mappings.email] === email && email
        );
        if (duplicateIndex !== -1) {
          warnings.push(`Row ${rowNumber}: Duplicate email - ${email}`);
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      totalRows: data.rows.length,
      validRows: data.rows.length - errors.length
    };
  }

  async importData(data, mappings, options = {}) {
    await delay(1000);
    
    const { skipDuplicates = true, updateExisting = false } = options;
    
    const imported = [];
    const skipped = [];
    const errors = [];

    data.rows.forEach((row, index) => {
      try {
        const contact = {};
        
        // Map CSV fields to contact fields
        Object.keys(mappings).forEach(csvField => {
          const contactField = mappings[csvField];
          const value = row[csvField];
          
          if (value) {
            if (contactField === 'topics' && value) {
              // Split comma-separated topics
              contact[contactField] = value.split(',').map(t => t.trim());
            } else {
              contact[contactField] = value;
            }
          }
        });

        // Generate ID and set defaults
        contact.Id = Date.now() + index;
        contact.avatar = null;
        contact.createdDate = contact.createdDate || new Date().toISOString();
        contact.lastActivity = contact.lastActivity || new Date().toISOString();
        
        // Set default lead status if not provided
        if (!contact.leadStatus) {
          contact.leadStatus = 'New Lead';
        }

        imported.push(contact);
      } catch (error) {
        errors.push({
          row: index + 2,
          error: error.message
        });
      }
    });

    return {
      success: true,
      imported: imported.length,
      skipped: skipped.length,
      errors: errors.length,
      data: imported,
      details: {
        importedContacts: imported,
        skippedRows: skipped,
        errorRows: errors
      }
    };
  }

  async exportToCSV(data, fields) {
    await delay(400);
    
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    // Create header row
    const headers = fields || Object.keys(data[0]);
    let csvContent = headers.map(h => this.escapeCSVField(h)).join(',') + '\n';
    
    // Add data rows
    data.forEach(item => {
      const row = headers.map(field => {
        const value = item[field];
        if (Array.isArray(value)) {
          return this.escapeCSVField(value.join(', '));
        }
        return this.escapeCSVField(String(value || ''));
      });
      csvContent += row.join(',') + '\n';
    });

    return {
      filename: `export_${new Date().toISOString().split('T')[0]}.csv`,
      content: csvContent,
      contentType: 'text/csv'
    };
  }

  escapeCSVField(field) {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return '"' + field.replace(/"/g, '""') + '"';
    }
    return field;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  getFieldSuggestions(csvHeaders, entityType = 'contacts') {
    const mappings = this.fieldMappings[entityType];
    const suggestions = {};
    
    csvHeaders.forEach(header => {
      const normalizedHeader = header.toLowerCase().trim();
      
      // Direct match
      const directMatch = Object.keys(mappings).find(key => 
        key.toLowerCase() === normalizedHeader
      );
      
      if (directMatch) {
        suggestions[header] = mappings[directMatch];
        return;
      }
      
      // Partial match
      const partialMatch = Object.keys(mappings).find(key => 
        normalizedHeader.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(normalizedHeader)
      );
      
      if (partialMatch) {
        suggestions[header] = mappings[partialMatch];
      }
    });
    
    return suggestions;
  }

  async getImportTemplate(entityType = 'contacts') {
    await delay(100);
    
    const templates = {
      contacts: {
        filename: 'contacts_template.csv',
        headers: ['Name', 'Email', 'Phone', 'Company', 'Lead Status', 'Topics'],
        sampleData: [
          ['John Smith', 'john@example.com', '555-0123', 'Acme Corp', 'Qualified', 'Product Demo, Pricing'],
          ['Jane Doe', 'jane@company.com', '555-0124', 'Tech Inc', 'New Lead', 'Features, Integration']
        ]
      }
    };
    
    const template = templates[entityType];
    if (!template) {
      throw new Error(`Template for ${entityType} not found`);
    }
    
    let csvContent = template.headers.join(',') + '\n';
    template.sampleData.forEach(row => {
      csvContent += row.map(field => this.escapeCSVField(field)).join(',') + '\n';
    });
    
    return {
      filename: template.filename,
      content: csvContent,
      contentType: 'text/csv'
    };
  }
}

export default new CsvService();
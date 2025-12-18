import contactsData from "../mockData/contacts.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
  }

  async getAll() {
    await delay(300);
    return this.contacts.map(contact => ({ ...contact }));
  }

  async getById(id) {
    await delay(200);
    const contact = this.contacts.find(c => c.Id === parseInt(id));
    return contact ? { ...contact } : null;
  }

  async create(contact) {
    await delay(250);
    const maxId = Math.max(...this.contacts.map(c => c.Id), 0);
    const newContact = {
      ...contact,
      Id: maxId + 1,
      createdDate: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    this.contacts.push(newContact);
    return { ...newContact };
  }

  async update(id, data) {
    await delay(250);
    const index = this.contacts.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      this.contacts[index] = {
        ...this.contacts[index],
        ...data,
        lastActivity: new Date().toISOString()
      };
      return { ...this.contacts[index] };
    }
    return null;
  }

  async delete(id) {
    await delay(200);
    const index = this.contacts.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      this.contacts.splice(index, 1);
      return true;
    }
    return false;
  }
async bulkDelete(ids) {
    await delay(300);
    const parsedIds = ids.map(id => parseInt(id));
    this.contacts = this.contacts.filter(c => !parsedIds.includes(c.Id));
    return true;
  }

  async bulkUpdate(ids, updates) {
    await delay(400);
    const parsedIds = ids.map(id => parseInt(id));
    
    this.contacts = this.contacts.map(contact => {
      if (parsedIds.includes(contact.Id)) {
        return { ...contact, ...updates };
      }
      return contact;
    });
    
    return this.contacts.filter(c => parsedIds.includes(c.Id));
  }

  async assignOwner(ids, owner) {
    return this.bulkUpdate(ids, { owner });
  }

  async changeStatus(ids, leadStatus) {
    return this.bulkUpdate(ids, { leadStatus });
  }

  async addTags(ids, tags) {
    await delay(300);
    const parsedIds = ids.map(id => parseInt(id));
    
    this.contacts = this.contacts.map(contact => {
      if (parsedIds.includes(contact.Id)) {
        const currentTopics = contact.topics || [];
        const newTopics = [...new Set([...currentTopics, ...tags])];
        return { ...contact, topics: newTopics };
      }
      return contact;
    });
    
    return this.contacts.filter(c => parsedIds.includes(c.Id));
  }

  async exportContacts(ids = null, format = 'csv') {
    await delay(500);
    
    const contactsToExport = ids 
      ? this.contacts.filter(c => ids.includes(c.Id))
      : this.contacts;
    
    if (format === 'csv') {
      const headers = ['Name', 'Email', 'Phone', 'Company', 'Lead Status', 'Topics', 'Created Date'];
      const csvRows = [headers.join(',')];
      
      contactsToExport.forEach(contact => {
        const row = [
          contact.name,
          contact.email,
          contact.phone,
          contact.company,
          contact.leadStatus,
          (contact.topics || []).join('; '),
          contact.createdDate
        ].map(field => `"${String(field).replace(/"/g, '""')}"`);
        
        csvRows.push(row.join(','));
      });
      
      return {
        filename: `contacts_export_${new Date().toISOString().split('T')[0]}.csv`,
        content: csvRows.join('\n'),
        contentType: 'text/csv'
      };
    }
    
    throw new Error('Unsupported export format');
  }

  async importContacts(contactData) {
    await delay(600);
    
    const importedContacts = contactData.map(data => ({
      Id: this.getNextId(),
      name: data.name || 'Unknown',
      email: data.email || '',
      phone: data.phone || '',
      company: data.company || '',
      leadStatus: data.leadStatus || 'New Lead',
      topics: Array.isArray(data.topics) ? data.topics : [],
      avatar: data.avatar || null,
      createdDate: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }));
    
    this.contacts.push(...importedContacts);
    return importedContacts;
  }

  getNextId() {
    return Math.max(...this.contacts.map(c => c.Id), 0) + 1;
  }
}

export default new ContactService();
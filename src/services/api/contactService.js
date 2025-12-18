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
}

export default new ContactService();
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import contactService from "@/services/api/contactService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import TabGroup from "@/components/molecules/TabGroup";
import FilterBar from "@/components/organisms/FilterBar";
import ContactsTable from "@/components/organisms/ContactsTable";
import Pagination from "@/components/organisms/Pagination";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import Empty from "@/components/ui/Empty";
import Dropdown from "@/components/molecules/Dropdown";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("table");
const [selectedContacts, setSelectedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  
  const bulkActions = [
    { value: "assign_owner", label: "Assign Owner", icon: "UserPlus" },
    { value: "change_status", label: "Change Status", icon: "Target" },
    { value: "add_tags", label: "Add Tags", icon: "Tag" },
    { value: "export", label: "Export Selected", icon: "Download" },
    { value: "delete", label: "Delete", icon: "Trash2", danger: true }
  ];

  const [filters, setFilters] = useState({
    owner: "",
    leadStatus: [],
    dateRange: null
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      owner: "",
      leadStatus: [],
      dateRange: null
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSelectContact = (id, checked) => {
    setSelectedContacts(prev =>
      checked ? [...prev, id] : prev.filter(contactId => contactId !== id)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedContacts(checked ? filteredContacts.map(c => c.Id) : []);
  };

  const handleBulkDelete = async () => {
    if (selectedContacts.length === 0) return;
    
    if (window.confirm(`Delete ${selectedContacts.length} contact(s)?`)) {
      try {
        await contactService.bulkDelete(selectedContacts);
        toast.success(`${selectedContacts.length} contact(s) deleted successfully`);
        setSelectedContacts([]);
        loadContacts();
      } catch (err) {
        toast.error("Failed to delete contacts");
      }
    }
  };
// Bulk action handlers
  const handleBulkAction = async (action) => {
    if (selectedContacts.length === 0) return;

    try {
      switch (action) {
        case 'assign_owner':
          const owner = prompt('Enter owner name:');
          if (owner) {
            await contactService.assignOwner(selectedContacts, owner);
            showToast(`Assigned ${selectedContacts.length} contacts to ${owner}`);
            fetchContacts();
          }
          break;
          
        case 'change_status':
          const status = prompt('Enter new status (New Lead, Qualified, Customer, Unqualified):');
          if (status) {
            await contactService.changeStatus(selectedContacts, status);
            showToast(`Updated status for ${selectedContacts.length} contacts`);
            fetchContacts();
          }
          break;
          
        case 'add_tags':
          const tags = prompt('Enter tags (comma-separated):');
          if (tags) {
            const tagArray = tags.split(',').map(t => t.trim());
            await contactService.addTags(selectedContacts, tagArray);
            showToast(`Added tags to ${selectedContacts.length} contacts`);
            fetchContacts();
          }
          break;
          
        case 'export':
          const exportData = await contactService.exportContacts(selectedContacts);
          downloadFile(exportData.filename, exportData.content, exportData.contentType);
          showToast(`Exported ${selectedContacts.length} contacts`);
          break;
          
        case 'delete':
          if (confirm(`Delete ${selectedContacts.length} contacts? This cannot be undone.`)) {
            await contactService.bulkDelete(selectedContacts);
            showToast(`Deleted ${selectedContacts.length} contacts`);
            fetchContacts();
          }
          break;
      }
      setSelectedContacts([]);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const downloadFile = (filename, content, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Filter contacts based on search and filters
  let filteredContacts = contacts.filter(contact => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.company.toLowerCase().includes(query) ||
        contact.phone.includes(query);
      if (!matchesSearch) return false;
    }

    // Tab filter
    switch (activeTab) {
      case "subscribers":
        if (!contact.isSubscribed) return false;
        break;
      case "unsubscribed":
        if (contact.isSubscribed) return false;
        break;
      case "customers":
        if (!contact.isCustomer) return false;
        break;
      default:
        break;
    }

    // Owner filter
    if (filters.owner && contact.owner !== filters.owner) {
      return false;
    }

    // Lead status filter
    if (filters.leadStatus.length > 0 && !filters.leadStatus.includes(contact.leadStatus)) {
      return false;
    }

    return true;
  });

  // Tab counts
  const tabCounts = {
    all: contacts.length,
    subscribers: contacts.filter(c => c.isSubscribed).length,
    unsubscribed: contacts.filter(c => !c.isSubscribed).length,
    customers: contacts.filter(c => c.isCustomer).length
  };

  const tabs = [
    { value: "all", label: "All contacts", count: tabCounts.all },
    { value: "subscribers", label: "Newsletter subscribers", count: tabCounts.subscribers },
    { value: "unsubscribed", label: "Unsubscribed", count: tabCounts.unsubscribed },
    { value: "customers", label: "All customers", count: tabCounts.customers }
  ];

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / perPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={loadContacts} />;

  return (
<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage and organize your business contacts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowImportModal(true)} variant="secondary">
            <ApperIcon name="Upload" size={18} className="mr-2" />
            Import CSV
          </Button>
          <Button>
            <ApperIcon name="Plus" size={18} className="mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

{selectedContacts.length > 0 && (
        <div className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
            </span>
            <div className="h-4 w-px bg-white/30"></div>
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" className="text-white border-white/50 hover:bg-white/10">
                  <ApperIcon name="Settings" size={16} className="mr-2" />
                  Bulk Actions
                  <ApperIcon name="ChevronDown" size={16} className="ml-2" />
                </Button>
              }
            >
              {bulkActions.map((action) => (
                <Dropdown.Item
                  key={action.value}
                  onClick={() => handleBulkAction(action.value)}
                  className={action.danger ? "text-red-600 hover:bg-red-50" : ""}
                >
                  <ApperIcon name={action.icon} size={16} />
                  {action.label}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedContacts([])}
            className="text-white hover:bg-white/10"
          >
            <ApperIcon name="X" size={16} />
          </Button>
        </div>
      )}

<div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search contacts by name, email, company, or phone..."
              className="flex-1"
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-lg">
<button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ApperIcon name="Table" size={18} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ApperIcon name="Grid" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

<div className="px-6 py-4 border-b border-slate-100">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {paginatedContacts.length === 0 ? (
          <Empty
            title="No contacts found"
            description="Try adjusting your search or filters"
            icon="Users"
            actionLabel="Clear filters"
            onAction={handleClearFilters}
          />
        ) : (
          <ContactsTable
            contacts={paginatedContacts}
            selectedContacts={selectedContacts}
            onSelectContact={handleSelectContact}
            onSelectAll={handleSelectAll}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalItems={filteredContacts.length}
          onPageChange={setCurrentPage}
          onPerPageChange={(value) => {
            setPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>

      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Import Contacts</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImportModal(false)}
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <ApperIcon name="Upload" className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 mb-2">
                  Drop your CSV file here or click to browse
                </p>
                <Button variant="secondary" size="sm">
                  Choose File
                </Button>
              </div>
              
              <div className="text-xs text-slate-500">
                <p className="font-medium mb-1">Supported fields:</p>
                <p>Name, Email, Phone, Company, Lead Status, Topics</p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowImportModal(false)}
                >
                  Cancel
                </Button>
                <Button>
                  Import Contacts
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
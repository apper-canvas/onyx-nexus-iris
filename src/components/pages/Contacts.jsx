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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage and organize your business contacts
              </p>
            </div>
            <Button>
<ApperIcon name="Plus" size={18} className="mr-2" />
              Add Contact
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowImportModal(true)}
            >
              <ApperIcon name="Upload" size={18} className="mr-2" />
              Import CSV
            </Button>
          </div>

          {/* Bulk Actions Bar */}
          {selectedContacts.length > 0 && (
            <div className="bg-primary text-white px-4 py-3 rounded-lg flex items-center justify-between">
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
        </div>

        {/* Import CSV Modal */}
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

        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search contacts..."
                className="flex-1"
              />
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>

        <ContactsTable
          contacts={paginatedContacts}
          selectedContacts={selectedContacts}
          onSelectContact={handleSelectContact}
          onSelectAll={handleSelectAll}
        />

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            totalItems={filteredContacts.length}
            onPageChange={setCurrentPage}
            onPerPageChange={setPerPage}
          />
        </div>

        {/* Action Bar Footer */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, filteredContacts.length)} of {filteredContacts.length} contacts
            </span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white border-white/50 hover:bg-white/10">
                <ApperIcon name="Mail" size={16} className="mr-2" />
                Email
              </Button>
              <Button variant="ghost" size="sm" className="text-white border-white/50 hover:bg-white/10">
                <ApperIcon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <Dropdown
                trigger={
                  <Button variant="ghost" size="sm" className="text-white border-white/50 hover:bg-white/10">
                    <ApperIcon name="MoreHorizontal" size={16} />
                  </Button>
                }
              >
                <Dropdown.Item>
                  <ApperIcon name="Printer" size={16} />
                  Print List
                </Dropdown.Item>
                <Dropdown.Item>
                  <ApperIcon name="Share" size={16} />
                  Share
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "table"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ApperIcon name="Table" size={18} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ApperIcon name="Grid" size={18} />
                </button>
              </div>

              <Button variant="ghost" size="sm" className="border border-slate-300">
                <ApperIcon name="Columns" size={16} className="mr-2" />
                Edit columns
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="border border-slate-300">
                <ApperIcon name="ArrowUpDown" size={16} className="mr-2" />
                Sort
              </Button>
              <Button variant="ghost" size="sm" className="border border-slate-300">
                <ApperIcon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <Button variant="secondary" size="sm">
                <ApperIcon name="Save" size={16} className="mr-2" />
                Save view
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search contacts by name, email, company, or phone..."
          className="max-w-md"
        />

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 flex items-center justify-between">
          <span className="font-medium">
            {selectedContacts.length} contact(s) selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white border-white/50 hover:bg-white/10">
              <ApperIcon name="Mail" size={16} className="mr-2" />
              Email
            </Button>
            <Button variant="ghost" size="sm" className="text-white border-white/50 hover:bg-white/10">
              <ApperIcon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white border-white/50 hover:bg-white/10"
              onClick={handleBulkDelete}
            >
              <ApperIcon name="Trash2" size={16} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white">
        {paginatedContacts.length === 0 ? (
          <Empty
            title="No contacts found"
            description="Try adjusting your search or filters"
            icon="Users"
            actionLabel="Clear filters"
            onAction={handleClearFilters}
          />
        ) : (
          <>
            <ContactsTable
              contacts={paginatedContacts}
              selectedContacts={selectedContacts}
              onSelectContact={handleSelectContact}
              onSelectAll={handleSelectAll}
            />

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
          </>
        )}
      </div>
    </div>
  );
};

export default Contacts;
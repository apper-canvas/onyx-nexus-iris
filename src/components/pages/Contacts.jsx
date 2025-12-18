import { useState, useEffect } from "react";
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
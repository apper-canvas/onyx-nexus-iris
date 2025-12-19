import { useState } from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ContactsTable = ({ contacts, selectedContacts, onSelectContact, onSelectAll }) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "createdDate" || sortField === "lastActivity") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getStatusVariant = (status) => {
    const variants = {
      "Customer": "success",
      "Qualified": "info",
      "New Lead": "warning",
      "Unqualified": "default"
    };
    return variants[status] || "default";
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ApperIcon name="ChevronsUpDown" size={14} className="text-slate-400" />;
    return sortDirection === "asc" 
      ? <ApperIcon name="ChevronUp" size={14} className="text-primary" />
      : <ApperIcon name="ChevronDown" size={14} className="text-primary" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
<thead className="bg-purple-50/50 border-y border-purple-100">
          <tr>
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
              />
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-2">
                <span>Name</span>
                <SortIcon field="name" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("email")}
            >
              <div className="flex items-center gap-2">
                <span>Email</span>
                <SortIcon field="email" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("phone")}
            >
              <div className="flex items-center gap-2">
                <span>Phone</span>
                <SortIcon field="phone" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              onClick={() => handleSort("leadStatus")}
            >
              <div className="flex items-center gap-2">
                <span>Lead Status</span>
                <SortIcon field="leadStatus" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Topics
            </th>
            <th className="w-12 px-4 py-3"></th>
          </tr>
        </thead>
<tbody className="bg-white divide-y divide-purple-100">
          {sortedContacts.map((contact) => (
            <tr 
              key={contact.Id}
              className="hover:bg-slate-50 transition-colors group"
            >
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.Id)}
                  onChange={(e) => onSelectContact(contact.Id, e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={contact.name} src={contact.avatar} size="sm" />
                  <div>
                    <div className="font-medium text-slate-900">{contact.name}</div>
                    <div className="text-xs text-slate-500">{contact.company}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-sm text-primary hover:text-primary-light transition-colors"
                >
                  {contact.email}
                </a>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">
                {contact.phone}
              </td>
              <td className="px-4 py-4">
                <Badge variant={getStatusVariant(contact.leadStatus)}>
                  {contact.leadStatus}
                </Badge>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {contact.topics.slice(0, 2).map((topic) => (
                    <Badge key={topic} variant="default" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {contact.topics.length > 2 && (
                    <Badge variant="default" className="text-xs">
                      +{contact.topics.length - 2}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600">
                  <ApperIcon name="MoreVertical" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
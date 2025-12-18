# Nexus CRM - Professional Customer Relationship Management

A sophisticated, production-ready CRM application built with React, Vite, and Tailwind CSS. Nexus CRM delivers a powerful contacts management system with advanced search, filtering, and bulk operations capabilities wrapped in a clean, modern enterprise interface.

## Features

### Fully Functional Contacts Management
- **Advanced Search**: Real-time search across name, email, company, and phone fields
- **Multi-Criteria Filtering**: Filter by contact owner, creation date, last activity, and lead status
- **Contact Categories**: Organized tabs for All contacts, Newsletter subscribers, Unsubscribed, and Customers
- **Bulk Operations**: Select multiple contacts for batch actions including export and delete
- **Sortable Columns**: Click any column header to sort contacts ascending or descending
- **Flexible Pagination**: Adjustable results per page (10/25/50/100) with page navigation
- **View Modes**: Toggle between table and grid layouts for optimal data viewing

### Professional Enterprise Design
- Navy-to-teal color palette with gradient accents
- Responsive layouts that work seamlessly across all devices
- Smooth animations and hover effects throughout
- Premium card designs with subtle shadows and borders
- Professional typography with clear visual hierarchy

### Complete CRM Structure
- **Dashboard**: Overview metrics with placeholder for analytics
- **Contacts**: Fully functional contact management (active page)
- **Companies**: Placeholder for company account management
- **Deals**: Placeholder for sales pipeline visualization
- **Reports**: Placeholder for analytics and reporting
- **Settings**: Placeholder for system configuration

## Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon system
- **Framer Motion** - Smooth animations
- **React Toastify** - Toast notifications
- **date-fns** - Date formatting utilities

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic UI components
│   ├── molecules/      # Composite components
│   ├── organisms/      # Complex sections
│   ├── pages/          # Full page components
│   ├── ui/             # State components
│   └── ApperIcon.jsx   # Icon component
├── hooks/              # Custom React hooks
├── router/             # Route configuration
├── services/           # API and data services
├── utils/              # Utility functions
├── App.jsx
├── main.jsx
└── index.css
```

## Key Features Explained

### Contact Management
The contacts page provides a comprehensive interface for managing customer relationships:
- **Search Bar**: Instantly filter contacts as you type
- **Filter System**: Apply multiple filters simultaneously with visual feedback
- **Status Badges**: Color-coded lead status indicators
- **Avatar System**: Automatic initial-based avatars with gradient backgrounds
- **Bulk Actions**: Multi-select contacts for batch operations

### Data Flow
All contact data flows through the service layer located in `src/services/api/contactService.js`, which manages:
- CRUD operations for contacts
- Simulated API delays for realistic loading states
- Mock data persistence during the session
- Bulk delete operations

### Responsive Design
- Mobile-first approach with breakpoint-based layouts
- Touch-friendly interfaces on mobile devices
- Collapsible sidebar navigation on smaller screens
- Horizontal scrolling tables on mobile with sticky first column

## Mock Data

The application includes 20 realistic business contacts with:
- Professional names and email addresses
- Properly formatted phone numbers
- Various lead statuses (New Lead, Qualified, Customer, Unqualified)
- Content topic interests (Marketing, Sales, Technology, etc.)
- Subscription and customer status flags
- Recent activity timestamps

## Future Enhancements

The placeholder sections indicate planned features:
- **Dashboard**: Analytics widgets and performance metrics
- **Companies**: Company account management with relationship tracking
- **Deals**: Visual sales pipeline with drag-and-drop cards
- **Reports**: Customizable reporting dashboard with data visualizations
- **Settings**: System configuration and user preferences

## Design Philosophy

Nexus CRM prioritizes:
- **Information Density**: Maximum useful data without overwhelming users
- **Scan Efficiency**: Quick visual scanning for sales teams
- **Action Accessibility**: Minimal clicks to complete common tasks
- **Professional Aesthetics**: Enterprise-grade visual design
- **Performance**: Fast loading and responsive interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or as a foundation for your own CRM application.
import React, { useState } from 'react';
import { 
  Package, 
  Store, 
  Truck, 
  CreditCard, 
  MessageSquare, 
  BarChart, 
  Menu, 
  X, 
  LogOut, 
  User,
  Bell,
  Search
} from 'lucide-react';
import '../styles/DashboardLayout.css'; // Import your CSS file

const DashboardLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const navItems = [
    { title: 'Order Management', icon: <Package className="w-5 h-5" />, path: '/orders' },
    { title: 'Shop Partner Dashboard', icon: <Store className="w-5 h-5" />, path: '/partners' },
    { title: 'Delivery Management', icon: <Truck className="w-5 h-5" />, path: '/delivery' },
    { title: 'Payment & Commission', icon: <CreditCard className="w-5 h-5" />, path: '/payments' },
    { title: 'Customer Support', icon: <MessageSquare className="w-5 h-5" />, path: '/support' },
    { title: 'Reports & Analytics', icon: <BarChart className="w-5 h-5" />, path: '/analytics' },
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  
  // Get current path for highlighting active nav item
  const currentPath = window.location.pathname;
  
  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="sidebar-backdrop show" 
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`sidebar ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'} ${mobileSidebarOpen ? 'open' : ''}`}
      >
        <div className="sidebar-header">
          <h1 className={`sidebar-logo ${!sidebarOpen && 'hidden'}`}>Admin Panel</h1>
          <button 
            onClick={toggleSidebar} 
            className="sidebar-toggle"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.path}
                className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className={`nav-text ${!sidebarOpen && 'hidden'}`}>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <User className="w-5 h-5" />
            </div>
            <div className={`user-details ${!sidebarOpen && 'hidden'}`}>
              <p className="user-name">Admin User</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="logout-button"
          >
            <LogOut className="logout-icon" />
            <span className={!sidebarOpen ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu-button" onClick={toggleMobileSidebar}>
              <Menu className="w-6 h-6" />
            </button>
            
            <h1 className="page-title">Dashboard</h1>
            
            <div className="breadcrumb">
              <div className="breadcrumb-item">
                <a href="/dashboard" className="breadcrumb-link">Home</a>
              </div>
              <span className="breadcrumb-separator">/</span>
              <div className="breadcrumb-item">
                <span className="breadcrumb-current">Dashboard</span>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <div className="relative max-w-xs mr-4 hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            <button className="header-icon-button">
              <Bell className="w-5 h-5" />
              <span className="notification-badge"></span>
            </button>
            
            <button className="header-icon-button ml-2">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="page-content">
          {children || <DashboardHome />}
        </main>
      </div>
    </div>
  );
};

// Updated DashboardHome component with proper class names for the new styling

// Updated DashboardHome component with matching structure between orders and vendors

const DashboardHome = () => {
    const stats = [
      { title: 'Total Orders', value: '1,248', change: '+12.5%', changeType: 'positive' },
      { title: 'Active Vendors', value: '64', change: '+4.2%', changeType: 'positive' },
      { title: 'Pending Deliveries', value: '36', change: '-2.4%', changeType: 'negative' },
      { title: 'Revenue', value: '$24,560', change: '+18.7%', changeType: 'positive' },
    ];
    
    return (
      <div className="space-y-6">
        <div className="overview">
          <h2>Overview</h2>
        
          <div className="dashboard-cards">
            {stats.map((stat, index) => (
              <div key={index} className="dashboard-card">
                <h3 className="card-title">{stat.title}</h3>
                <p className="card-value">{stat.value}</p>
                <div className={`card-change ${stat.changeType === 'positive' ? 'card-change-positive' : 'card-change-negative'}`}>
                  <span>{stat.change} since last month</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-grid">
          <div className="grid-col-8">
            <div className="dashboard-widget">
              <div className="widget-header">
                <h3 className="widget-title">Recent Orders</h3>
                <div className="widget-actions">
                  <button className="widget-action-button">View All</button>
                </div>
              </div>
              <div className="widget-content">
                <div className="order-list">
                  <div className="order-item completed">
                    <div className="order-info">
                      <div className="order-icon">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="order-details">
                        <h3>Order #12345</h3>
                        <div className="order-meta">
                          April 18, 2025 <span className="order-price">$120.00</span>
                        </div>
                      </div>
                    </div>
                    <button className="order-status-button status-completed">Completed</button>
                  </div>
                  
                  <div className="order-item in-transit">
                    <div className="order-info">
                      <div className="order-icon">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="order-details">
                        <h3>Order #12344</h3>
                        <div className="order-meta">
                          April 18, 2025 <span className="order-price">$85.50</span>
                        </div>
                      </div>
                    </div>
                    <button className="order-status-button status-in-transit">In Transit</button>
                  </div>
                  
                  <div className="order-item processing">
                    <div className="order-info">
                      <div className="order-icon">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="order-details">
                        <h3>Order #12343</h3>
                        <div className="order-meta">
                          April 17, 2025 <span className="order-price">$246.00</span>
                        </div>
                      </div>
                    </div>
                    <button className="order-status-button status-processing">Processing</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid-col-4">
            <div className="dashboard-widget">
              <div className="widget-header">
                <h3 className="widget-title">Top Vendors</h3>
                <div className="widget-actions">
                  <button className="widget-action-button">View All</button>
                </div>
              </div>
              <div className="widget-content">
                <div className="vendor-list">
                  <div className="vendor-item">
                    <div className="vendor-info">
                      <div className="vendor-icon">
                        <Store className="h-5 w-5" />
                      </div>
                      <div className="vendor-details">
                        <h3>Fresh Foods Market</h3>
                        <div className="vendor-meta">98 orders this month</div>
                      </div>
                    </div>
                    <div className="vendor-revenue">$3,240</div>
                  </div>
                  
                  <div className="vendor-item">
                    <div className="vendor-info">
                      <div className="vendor-icon">
                        <Store className="h-5 w-5" />
                      </div>
                      <div className="vendor-details">
                        <h3>Urban Eats</h3>
                        <div className="vendor-meta">76 orders this month</div>
                      </div>
                    </div>
                    <div className="vendor-revenue">$2,860</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardLayout;
export { DashboardHome };
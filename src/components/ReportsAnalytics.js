import React, { useState } from 'react';
import { 
  BarChart, 
  Calendar, 
  Download, 
  Filter, 
  Settings, 
  PieChart,
  TrendingUp,
  Map,
  Table,
  Clock,
  ShoppingBag,
  Users,
  DollarSign,
  FileText
} from 'lucide-react';
import '../styles/ReportsAnalytics.css'; // Import your CSS file for styling

const ReportsAnalytics = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for date range
  const [dateRange, setDateRange] = useState('this-month');
  
  // Mock data for dashboard metrics
  const dashboardMetrics = {
    revenue: {
      total: 24560.45,
      change: 18.7,
      changeType: 'increase'
    },
    orders: {
      total: 1248,
      change: 12.5,
      changeType: 'increase'
    },
    customers: {
      total: 856,
      change: 8.3,
      changeType: 'increase'
    },
    aov: {
      total: 78.42,
      change: 5.2,
      changeType: 'increase'
    },
    topSellingProducts: [
      { id: 'P001', name: 'Organic Apples', sales: 154, revenue: 769.46 },
      { id: 'P002', name: 'Free Range Eggs', sales: 128, revenue: 639.72 },
      { id: 'P003', name: 'Artisan Bread', sales: 98, revenue: 392.02 },
      { id: 'P004', name: 'Fresh Salmon', sales: 87, revenue: 1390.13 },
      { id: 'P005', name: 'Organic Chicken', sales: 76, revenue: 987.24 }
    ],
    topPerformingVendors: [
      { id: 'V001', name: 'Fresh Foods Market', orders: 98, revenue: 3240.85 },
      { id: 'V002', name: 'Urban Eats', orders: 76, revenue: 2860.32 },
      { id: 'V003', name: 'Health & Wellness Market', orders: 65, revenue: 1750.45 }
    ],
    recentOrders: [
      { id: 'ORD-12345', customer: 'John Smith', status: 'Delivered', total: 56.80, date: '2025-04-18T14:30:00' },
      { id: 'ORD-12346', customer: 'Emma Davis', status: 'In Transit', total: 42.95, date: '2025-04-18T10:15:00' },
      { id: 'ORD-12347', customer: 'Michael Brown', status: 'Processing', total: 22.96, date: '2025-04-18T11:45:00' },
      { id: 'ORD-12348', customer: 'Lisa Johnson', status: 'Pending', total: 21.45, date: '2025-04-18T13:20:00' }
    ],
    salesByCategory: [
      { category: 'Grocery', value: 45.8 },
      { category: 'Restaurant', value: 32.4 },
      { category: 'Health Foods', value: 14.6 },
      { category: 'Other', value: 7.2 }
    ],
    salesByLocation: [
      { location: 'Downtown', value: 35.2 },
      { location: 'Midtown', value: 28.7 },
      { location: 'Uptown', value: 18.5 },
      { location: 'Suburbs', value: 17.6 }
    ],
    salesByTime: [
      { hour: '6-9 AM', value: 12.5 },
      { hour: '9-12 PM', value: 18.7 },
      { hour: '12-3 PM', value: 25.4 },
      { hour: '3-6 PM', value: 22.8 },
      { hour: '6-9 PM', value: 15.2 },
      { hour: '9-12 AM', value: 5.4 }
    ]
  };
  
  // Mock data for reports list
  const availableReports = [
    { 
      id: 'REP001', 
      name: 'Sales Performance Report', 
      description: 'Comprehensive overview of sales performance across all channels and products',
      lastGenerated: '2025-04-15',
      frequency: 'Weekly',
      category: 'Sales'
    },
    { 
      id: 'REP002', 
      name: 'Vendor Performance Report', 
      description: 'Analysis of vendor performance metrics including order fulfillment rates and customer ratings',
      lastGenerated: '2025-04-16',
      frequency: 'Monthly',
      category: 'Vendors'
    },
    { 
      id: 'REP003', 
      name: 'Customer Acquisition Report', 
      description: 'Tracks new customer acquisition rates, sources, and related costs',
      lastGenerated: '2025-04-10',
      frequency: 'Monthly',
      category: 'Customers'
    },
    { 
      id: 'REP004', 
      name: 'Delivery Performance Report', 
      description: 'Analysis of delivery times, success rates, and customer satisfaction',
      lastGenerated: '2025-04-17',
      frequency: 'Weekly',
      category: 'Delivery'
    },
    { 
      id: 'REP005', 
      name: 'Product Profitability Report', 
      description: 'Detailed breakdown of product profitability including margins and costs',
      lastGenerated: '2025-04-01',
      frequency: 'Monthly',
      category: 'Products'
    },
    { 
      id: 'REP006', 
      name: 'Order Cancellation Analysis', 
      description: 'Analysis of order cancellations, refunds, and underlying reasons',
      lastGenerated: '2025-04-10',
      frequency: 'Monthly',
      category: 'Orders'
    }
  ];
  
  // Function to format currency
 // Change this in your React component
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to handle download report
  const handleDownloadReport = (reportId) => {
    alert(`Downloading report ${reportId}...`);
    // In a real app, this would trigger a download of a CSV or PDF report
  };
  
  // Function to generate report
  const handleGenerateReport = (reportId) => {
    alert(`Generating report ${reportId}...`);
    // In a real app, this would trigger a report generation process
  };
  
  // Render Dashboard tab content
  const renderDashboard = () => {
    return (
      <div className="dashboard-content">
        <div className="metrics-cards">
          <div className="metric-card">
            <div className="metric-icon revenue">
              <DollarSign size={24} />
            </div>
            <div className="metric-content">
              <h3>Total Revenue</h3>
              <div className="metric-value">{formatCurrency(dashboardMetrics.revenue.total)}</div>
              <div className={`metric-change ${dashboardMetrics.revenue.changeType}`}>
                {dashboardMetrics.revenue.changeType === 'increase' ? '↑' : '↓'} {dashboardMetrics.revenue.change}% from last period
              </div>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon orders">
              <ShoppingBag size={24} />
            </div>
            <div className="metric-content">
              <h3>Total Orders</h3>
              <div className="metric-value">{dashboardMetrics.orders.total.toLocaleString()}</div>
              <div className={`metric-change ${dashboardMetrics.orders.changeType}`}>
                {dashboardMetrics.orders.changeType === 'increase' ? '↑' : '↓'} {dashboardMetrics.orders.change}% from last period
              </div>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon customers">
              <Users size={24} />
            </div>
            <div className="metric-content">
              <h3>Total Customers</h3>
              <div className="metric-value">{dashboardMetrics.customers.total.toLocaleString()}</div>
              <div className={`metric-change ${dashboardMetrics.customers.changeType}`}>
                {dashboardMetrics.customers.changeType === 'increase' ? '↑' : '↓'} {dashboardMetrics.customers.change}% from last period
              </div>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon aov">
              <TrendingUp size={24} />
            </div>
            <div className="metric-content">
              <h3>Average Order Value</h3>
              <div className="metric-value">{formatCurrency(dashboardMetrics.aov.total)}</div>
              <div className={`metric-change ${dashboardMetrics.aov.changeType}`}>
                {dashboardMetrics.aov.changeType === 'increase' ? '↑' : '↓'} {dashboardMetrics.aov.change}% from last period
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-widgets">
          <div className="dashboard-widget sales-chart">
            <div className="widget-header">
              <h3>Sales Performance</h3>
              <div className="widget-actions">
                <select className="widget-select">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly" selected>Monthly</option>
                </select>
                <button className="widget-action-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="widget-content">
              <div className="chart-placeholder">
                <div className="bar-chart-placeholder">
                  <div className="chart-bar" style={{ height: '65%' }}></div>
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '55%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                </div>
                <div className="chart-labels">
                  <span>Chart would be displayed here with actual data</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-widget category-chart">
            <div className="widget-header">
              <h3>Sales by Category</h3>
              <div className="widget-actions">
                <button className="widget-action-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="widget-content">
              <div className="chart-placeholder">
                <div className="pie-chart-placeholder">
                  <div className="pie-segment segment-1" style={{transform: 'rotate(0deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)'}}></div>
                  <div className="pie-segment segment-2" style={{transform: 'rotate(165deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 75% 50%)'}}></div>
                  <div className="pie-segment segment-3" style={{transform: 'rotate(280deg)', clipPath: 'polygon(50% 50%, 50% 0%, 75% 0%, 75% 25%)'}}></div>
                  <div className="pie-segment segment-4" style={{transform: 'rotate(330deg)', clipPath: 'polygon(50% 50%, 50% 0%, 60% 0%, 60% 15%)'}}></div>
                </div>
                <div className="chart-legend">
                  {dashboardMetrics.salesByCategory.map((item, index) => (
                    <div className="legend-item" key={index}>
                      <span className={`legend-color segment-${index + 1}`}></span>
                      <span className="legend-label">{item.category}</span>
                      <span className="legend-value">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-widget top-products">
            <div className="widget-header">
              <h3>Top Selling Products</h3>
              <div className="widget-actions">
                <button className="widget-action-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="widget-content">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardMetrics.topSellingProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>{formatCurrency(product.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-widget top-vendors">
            <div className="widget-header">
              <h3>Top Performing Vendors</h3>
              <div className="widget-actions">
                <button className="widget-action-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="widget-content">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardMetrics.topPerformingVendors.map((vendor, index) => (
                    <tr key={index}>
                      <td>{vendor.name}</td>
                      <td>{vendor.orders}</td>
                      <td>{formatCurrency(vendor.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-widget location-chart">
            <div className="widget-header">
              <h3>Sales by Location</h3>
              <div className="widget-actions">
                <button className="widget-action-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="widget-content">
              <div className="map-placeholder">
                <Map size={24} />
                <span>Map visualization would be displayed here</span>
              </div>
              <div className="chart-legend">
                {dashboardMetrics.salesByLocation.map((item, index) => (
                  <div className="legend-item" key={index}>
                    <span className={`legend-color location-${index + 1}`}></span>
                    <span className="legend-label">{item.location}</span>
                    <span className="legend-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="dashboard-widget time-chart">
            <div className="widget-header">
              <h3>Sales by Time of Day</h3>
              <div className="widget-actions">
                <button className="widget-action-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="widget-content">
              <div className="chart-placeholder">
                <div className="bar-chart-placeholder horizontal">
                  {dashboardMetrics.salesByTime.map((item, index) => (
                    <div className="chart-row" key={index}>
                      <span className="chart-label">{item.hour}</span>
                      <div className="chart-bar-container">
                        <div className="chart-bar" style={{ width: `${item.value * 3}%` }}></div>
                        <span className="chart-value">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-widget recent-orders">
            <div className="widget-header">
              <h3>Recent Orders</h3>
              <div className="widget-actions">
                <button className="widget-action-button">View All</button>
              </div>
            </div>
            <div className="widget-content">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardMetrics.recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>{formatDate(order.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render Reports tab content
  const renderReports = () => {
    return (
      <div className="reports-content">
        <div className="reports-header">
          <div className="reports-filters">
            <div className="filter-group">
              <label>Category</label>
              <select className="filter-select">
                <option value="all">All Categories</option>
                <option value="sales">Sales</option>
                <option value="vendors">Vendors</option>
                <option value="customers">Customers</option>
                <option value="delivery">Delivery</option>
                <option value="products">Products</option>
                <option value="orders">Orders</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Frequency</label>
              <select className="filter-select">
                <option value="all">All Frequencies</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <button className="create-report-button">
            + Create Custom Report
          </button>
        </div>
        
        <div className="reports-grid">
          {availableReports.map((report, index) => (
            <div className="report-card" key={index}>
              <div className="report-header">
                <h3 className="report-name">{report.name}</h3>
                <div className="report-category">
                  <span className={`category-badge ${report.category.toLowerCase()}`}>
                    {report.category}
                  </span>
                </div>
              </div>
              <div className="report-description">
                {report.description}
              </div>
              <div className="report-metadata">
                <div className="metadata-item">
                  <span className="metadata-label">Last Generated:</span>
                  <span className="metadata-value">{report.lastGenerated}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Frequency:</span>
                  <span className="metadata-value">{report.frequency}</span>
                </div>
              </div>
              <div className="report-actions">
                <button 
                  className="download-button"
                  onClick={() => handleDownloadReport(report.id)}
                >
                  <Download size={16} />
                  Download Report
                </button>
                <button 
                  className="generate-button"
                  onClick={() => handleGenerateReport(report.id)}
                >
                  Generate New
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render Analytics tab content
  const renderAnalytics = () => {
    return (
      <div className="analytics-content">
        <div className="analytics-header">
          <h2>Custom Analytics</h2>
          <p>Build and save custom analytics views</p>
        </div>
        
        <div className="analytics-builder">
          <div className="builder-sidebar">
            <div className="builder-section">
              <h3>Data Sources</h3>
              <div className="data-sources">
                <div className="data-source-item">
                  <input type="checkbox" id="orders-data" />
                  <label htmlFor="orders-data">Orders</label>
                </div>
                <div className="data-source-item">
                  <input type="checkbox" id="products-data" />
                  <label htmlFor="products-data">Products</label>
                </div>
                <div className="data-source-item">
                  <input type="checkbox" id="customers-data" />
                  <label htmlFor="customers-data">Customers</label>
                </div>
                <div className="data-source-item">
                  <input type="checkbox" id="vendors-data" />
                  <label htmlFor="vendors-data">Vendors</label>
                </div>
                <div className="data-source-item">
                  <input type="checkbox" id="delivery-data" />
                  <label htmlFor="delivery-data">Delivery</label>
                </div>
              </div>
            </div>
            
            <div className="builder-section">
              <h3>Dimensions</h3>
              <div className="dimensions">
                <div className="dimension-item">
                  <select className="dimension-select">
                    <option value="">Select Dimension</option>
                    <option value="date">Date</option>
                    <option value="category">Category</option>
                    <option value="vendor">Vendor</option>
                    <option value="customer">Customer</option>
                    <option value="location">Location</option>
                  </select>
                  <button className="remove-button">×</button>
                </div>
                <button className="add-dimension-button">
                  + Add Dimension
                </button>
              </div>
            </div>
            
            <div className="builder-section">
              <h3>Metrics</h3>
              <div className="metrics">
                <div className="metric-item">
                  <select className="metric-select">
                    <option value="">Select Metric</option>
                    <option value="revenue">Revenue</option>
                    <option value="orders">Order Count</option>
                    <option value="aov">Average Order Value</option>
                    <option value="items">Items Sold</option>
                    <option value="customers">Customer Count</option>
                  </select>
                  <button className="remove-button">×</button>
                </div>
                <button className="add-metric-button">
                  + Add Metric
                </button>
              </div>
            </div>
            
            <div className="builder-section">
              <h3>Filters</h3>
              <div className="filters">
                <div className="filter-item">
                  <select className="filter-field-select">
                    <option value="">Select Field</option>
                    <option value="date">Date</option>
                    <option value="category">Category</option>
                    <option value="vendor">Vendor</option>
                    <option value="status">Status</option>
                    <option value="customer_type">Customer Type</option>
                  </select>
                  <select className="filter-operator-select">
                    <option value="equals">Equals</option>
                    <option value="not_equals">Not Equals</option>
                    <option value="greater_than">Greater Than</option>
                    <option value="less_than">Less Than</option>
                    <option value="contains">Contains</option>
                    <option value="not_contains">Not Contains</option>
                  </select>
                  <input type="text" className="filter-value-input" placeholder="Value" />
                  <button className="remove-button">×</button>
                </div>
                <button className="add-filter-button">
                  + Add Filter
                </button>
              </div>
            </div>
            
            <div className="builder-actions">
              <button className="apply-button">
                Apply Changes
              </button>
              <button className="save-button">
                Save View
              </button>
            </div>
          </div>
          
          <div className="analytics-preview">
            <div className="preview-header">
              <h3>Preview</h3>
              <div className="view-actions">
                <select className="view-type-select">
                  <option value="table">Table</option>
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
                <button className="download-preview-button">
                  <Download size={16} />
                </button>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-placeholder">
                <Table size={32} />
                <p>Configure data sources, dimensions, and metrics to preview results</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="saved-analytics">
          <div className="saved-header">
            <h3>Saved Analytics Views</h3>
            <button className="view-all-button">
              View All
            </button>
          </div>
          <div className="saved-items">
            <div className="saved-item">
              <div className="saved-item-preview bar-chart"></div>
              <div className="saved-item-info">
                <h4>Monthly Sales by Category</h4>
                <p>Last updated: April 18, 2025</p>
              </div>
              <button className="open-item-button">Open</button>
            </div>
            <div className="saved-item">
              <div className="saved-item-preview pie-chart"></div>
              <div className="saved-item-info">
                <h4>Customer Acquisition by Source</h4>
                <p>Last updated: April 17, 2025</p>
              </div>
              <button className="open-item-button">Open</button>
            </div>
            <div className="saved-item">
              <div className="saved-item-preview line-chart"></div>
              <div className="saved-item-info">
                <h4>Delivery Performance Trends</h4>
                <p>Last updated: April 16, 2025</p>
              </div>
              <button className="open-item-button">Open</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render Settings tab content
  const renderSettings = () => {
    return (
      <div className="settings-content">
        <div className="settings-header">
          <h2>Report & Analytics Settings</h2>
          <p>Configure your reporting preferences and scheduled reports</p>
        </div>
        
        <div className="settings-grid">
          <div className="settings-card">
            <h3>Default Date Range</h3>
            <div className="setting-options">
              <div className="setting-option">
                <input type="radio" id="today" name="default-date-range" />
                <label htmlFor="today">Today</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="yesterday" name="default-date-range" />
                <label htmlFor="yesterday">Yesterday</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="this-week" name="default-date-range" />
                <label htmlFor="this-week">This Week</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="last-week" name="default-date-range" />
                <label htmlFor="last-week">Last Week</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="this-month" name="default-date-range" checked />
                <label htmlFor="this-month">This Month</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="last-month" name="default-date-range" />
                <label htmlFor="last-month">Last Month</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="custom" name="default-date-range" />
                <label htmlFor="custom">Custom</label>
              </div>
            </div>
          </div>
          
          <div className="settings-card">
            <h3>Default Dashboard View</h3>
            <div className="setting-options">
              <div className="setting-option">
                <input type="radio" id="revenue-focus" name="default-dashboard" checked />
                <label htmlFor="revenue-focus">Revenue Focus</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="orders-focus" name="default-dashboard" />
                <label htmlFor="orders-focus">Orders Focus</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="vendors-focus" name="default-dashboard" />
                <label htmlFor="vendors-focus">Vendors Focus</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="customers-focus" name="default-dashboard" />
                <label htmlFor="customers-focus">Customers Focus</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="custom-dashboard" name="default-dashboard" />
                <label htmlFor="custom-dashboard">Custom Dashboard</label>
              </div>
            </div>
          </div>
          
          <div className="settings-card">
            <h3>Email Reports</h3>
            <div className="email-settings">
              <div className="form-group">
                <label>Send reports to email</label>
                <input type="email" placeholder="Enter email address" value="admin@example.com" />
              </div>
              <div className="form-group">
                <label>Add additional recipients (comma separated)</label>
                <input type="text" placeholder="email1@example.com, email2@example.com" />
              </div>
              <div className="setting-options">
                <div className="setting-option">
                  <input type="checkbox" id="daily-summary" checked />
                  <label htmlFor="daily-summary">Daily Summary Report</label>
                </div>
                <div className="setting-option">
                  <input type="checkbox" id="weekly-summary" checked />
                  <label htmlFor="weekly-summary">Weekly Summary Report</label>
                </div>
                <div className="setting-option">
                  <input type="checkbox" id="monthly-summary" checked />
                  <label htmlFor="monthly-summary">Monthly Summary Report</label>
                </div>
                <div className="setting-option">
                  <input type="checkbox" id="low-inventory" />
                  <label htmlFor="low-inventory">Low Inventory Alerts</label>
                </div>
                <div className="setting-option">
                  <input type="checkbox" id="sales-alerts" />
                  <label htmlFor="sales-alerts">Sales Performance Alerts</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="settings-card">
            <h3>Data Export Format</h3>
            <div className="setting-options">
              <div className="setting-option">
                <input type="radio" id="csv" name="export-format" checked />
                <label htmlFor="csv">CSV</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="excel" name="export-format" />
                <label htmlFor="excel">Excel</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="pdf" name="export-format" />
                <label htmlFor="pdf">PDF</label>
              </div>
              <div className="setting-option">
                <input type="radio" id="json" name="export-format" />
                <label htmlFor="json">JSON</label>
              </div>
            </div>
          </div>
          
          <div className="settings-card scheduled-reports">
            <h3>Scheduled Reports</h3>
            <table className="scheduled-reports-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Frequency</th>
                  <th>Recipients</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sales Performance Report</td>
                  <td>Weekly (Mondays)</td>
                  <td>admin@example.com</td>
                  <td>
                    <button className="edit-schedule-button">Edit</button>
                    <button className="delete-schedule-button">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Vendor Performance Report</td>
                  <td>Monthly (1st day)</td>
                  <td>admin@example.com, manager@example.com</td>
                  <td>
                    <button className="edit-schedule-button">Edit</button>
                    <button className="delete-schedule-button">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Customer Acquisition Report</td>
                  <td>Monthly (1st day)</td>
                  <td>admin@example.com</td>
                  <td>
                    <button className="edit-schedule-button">Edit</button>
                    <button className="delete-schedule-button">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="add-schedule-button">
              + Schedule New Report
            </button>
          </div>
        </div>
        
        <div className="settings-actions">
          <button className="save-settings-button">Save Settings</button>
          <button className="reset-settings-button">Reset to Default</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="reports-analytics">
      <h1>Reports & Analytics</h1>
      
      <div className="analytics-tabs">
        <button 
          className={`analytics-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart size={18} />
          Dashboard
        </button>
        <button 
          className={`analytics-tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <FileText size={18} />
          Reports
        </button>
        <button 
          className={`analytics-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <PieChart size={18} />
          Analytics
        </button>
        <button 
          className={`analytics-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
      
      <div className="date-filter">
        <Calendar size={18} className="calendar-icon" />
        <select 
          className="date-select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="this-week">This Week</option>
          <option value="last-week">Last Week</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
      
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'reports' && renderReports()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
};

export default ReportsAnalytics;
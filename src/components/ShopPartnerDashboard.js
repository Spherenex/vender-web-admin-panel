import React, { useState } from 'react';
import { 
  Store, 
  Map, 
  Star, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ChevronRight,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import '../styles/ShopPartnerDashboard.css'; // Import your CSS file for styling

const ShopPartnerDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for selected shop
  const [selectedShop, setSelectedShop] = useState(null);
  
  // Mock data for shops
  const shops = [
    {
      id: 'S001',
      name: 'Fresh Foods Market',
      location: { address: '230 Broadway, New York, NY', lat: 40.7138, lng: -74.0070 },
      rating: 4.8,
      reviews: 256,
      category: 'Grocery',
      joinDate: '2024-07-15',
      status: 'active',
      earnings: {
        currentMonth: 12580.45,
        previousMonth: 11250.30,
        total: 58945.75
      },
      orders: {
        pending: 3,
        processing: 5,
        completed: 89,
        cancelled: 2
      },
      performanceMetrics: {
        orderAcceptanceRate: 98.5,
        preparationTime: 12.4, // minutes
        customerSatisfaction: 4.7
      },
      topProducts: [
        { name: 'Organic Apples', sales: 154, revenue: 769.46 },
        { name: 'Free Range Eggs', sales: 128, revenue: 639.72 },
        { name: 'Artisan Bread', sales: 98, revenue: 392.02 }
      ],
      recentActivity: [
        { type: 'order_received', time: '2025-04-18T14:30:00', details: 'New order #12345 received' },
        { type: 'order_completed', time: '2025-04-18T13:15:00', details: 'Order #12343 marked as completed' },
        { type: 'review_received', time: '2025-04-18T11:22:00', details: 'New 5-star review received' },
        { type: 'payout_processed', time: '2025-04-17T09:00:00', details: 'Weekly payout of $2,450.78 processed' }
      ]
    },
    {
      id: 'S002',
      name: 'Urban Eats',
      location: { address: '500 Park Ave, New York, NY', lat: 40.7348, lng: -74.0280 },
      rating: 4.6,
      reviews: 189,
      category: 'Restaurant',
      joinDate: '2024-08-22',
      status: 'active',
      earnings: {
        currentMonth: 9875.20,
        previousMonth: 8950.10,
        total: 42680.35
      },
      orders: {
        pending: 2,
        processing: 4,
        completed: 72,
        cancelled: 1
      },
      performanceMetrics: {
        orderAcceptanceRate: 97.2,
        preparationTime: 18.7, // minutes
        customerSatisfaction: 4.5
      },
      topProducts: [
        { name: 'Artisan Pizza', sales: 112, revenue: 1679.88 },
        { name: 'Caesar Salad', sales: 87, revenue: 782.13 },
        { name: 'Grilled Chicken Sandwich', sales: 76, revenue: 683.24 }
      ],
      recentActivity: [
        { type: 'order_received', time: '2025-04-18T15:10:00', details: 'New order #12347 received' },
        { type: 'order_completed', time: '2025-04-18T14:05:00', details: 'Order #12342 marked as completed' },
        { type: 'issue_reported', time: '2025-04-18T12:30:00', details: 'Customer reported missing items in order #12340' },
        { type: 'payout_processed', time: '2025-04-17T09:00:00', details: 'Weekly payout of $1,875.45 processed' }
      ]
    },
    {
      id: 'S003',
      name: 'Health & Wellness Market',
      location: { address: '350 Madison Ave, New York, NY', lat: 40.7508, lng: -73.9772 },
      rating: 4.5,
      reviews: 128,
      category: 'Health Foods',
      joinDate: '2024-09-05',
      status: 'inactive',
      earnings: {
        currentMonth: 5240.30,
        previousMonth: 6120.85,
        total: 28450.60
      },
      orders: {
        pending: 0,
        processing: 0,
        completed: 65,
        cancelled: 0
      },
      performanceMetrics: {
        orderAcceptanceRate: 95.8,
        preparationTime: 11.2, // minutes
        customerSatisfaction: 4.4
      },
      topProducts: [
        { name: 'Protein Smoothie', sales: 89, revenue: 534.00 },
        { name: 'Organic Vitamins', sales: 67, revenue: 1005.00 },
        { name: 'Vegan Protein Bars', sales: 58, revenue: 290.00 }
      ],
      recentActivity: [
        { type: 'shop_deactivated', time: '2025-04-15T17:00:00', details: 'Shop temporarily deactivated due to inventory update' },
        { type: 'order_completed', time: '2025-04-15T14:45:00', details: 'Order #12335 marked as completed' },
        { type: 'inventory_updated', time: '2025-04-15T11:30:00', details: '25 new products added to inventory' },
        { type: 'payout_processed', time: '2025-04-10T09:00:00', details: 'Weekly payout of $1,250.45 processed' }
      ]
    }
  ];
  
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
  
  // Function to get shop performance status
  const getShopPerformanceStatus = (metrics) => {
    if (metrics.orderAcceptanceRate > 95 && metrics.customerSatisfaction > 4.5) {
      return 'excellent';
    } else if (metrics.orderAcceptanceRate > 90 && metrics.customerSatisfaction > 4.0) {
      return 'good';
    } else if (metrics.orderAcceptanceRate > 85 && metrics.customerSatisfaction > 3.5) {
      return 'average';
    } else {
      return 'needs-improvement';
    }
  };
  
  // If a shop is selected, show detailed view
  if (selectedShop) {
    const shop = shops.find(s => s.id === selectedShop);
    
    return (
      <div className="shop-partner-dashboard">
        <div className="shop-detail-header">
          <button className="back-button" onClick={() => setSelectedShop(null)}>
            &larr; Back to Shops
          </button>
          <h1>{shop.name}</h1>
          <div className={`shop-status ${shop.status}`}>
            {shop.status === 'active' ? 'Active' : 'Inactive'}
          </div>
        </div>
        
        <div className="shop-tabs">
          <button 
            className={`shop-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`shop-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`shop-tab ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button 
            className={`shop-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`shop-tab ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            Earnings
          </button>
          <button 
            className={`shop-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div className="shop-detail-content">
            <div className="shop-overview-grid">
              <div className="shop-detail-card shop-info">
                <h2>Shop Information</h2>
                <div className="shop-info-grid">
                  <div className="info-item">
                    <span className="info-label">Category</span>
                    <span className="info-value">{shop.category}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rating</span>
                    <span className="info-value">
                      {shop.rating} <Star size={14} className="star-icon" />
                      <span className="reviews-count">({shop.reviews} reviews)</span>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address</span>
                    <span className="info-value">{shop.location.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Joined</span>
                    <span className="info-value">{new Date(shop.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="shop-actions">
                  <button className="shop-action-button">
                    <Map size={16} />
                    View on Map
                  </button>
                  <button className="shop-action-button">
                    <Settings size={16} />
                    Edit Info
                  </button>
                  <button className={`shop-status-toggle ${shop.status === 'active' ? 'deactivate' : 'activate'}`}>
                    {shop.status === 'active' ? 'Deactivate Shop' : 'Activate Shop'}
                  </button>
                </div>
              </div>
              
              <div className="shop-detail-card earnings-summary">
                <h2>Earnings Summary</h2>
                <div className="earnings-grid">
                  <div className="earnings-item">
                    <span className="earnings-label">Current Month</span>
                    <span className="earnings-value">{formatCurrency(shop.earnings.currentMonth)}</span>
                    <span className="earnings-change positive">
                      +{((shop.earnings.currentMonth - shop.earnings.previousMonth) / shop.earnings.previousMonth * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="earnings-item">
                    <span className="earnings-label">Previous Month</span>
                    <span className="earnings-value">{formatCurrency(shop.earnings.previousMonth)}</span>
                  </div>
                  <div className="earnings-item total">
                    <span className="earnings-label">Total Earnings</span>
                    <span className="earnings-value">{formatCurrency(shop.earnings.total)}</span>
                  </div>
                </div>
                
                <div className="view-more">
                  <button className="view-more-button" onClick={() => setActiveTab('earnings')}>
                    View Detailed Earnings
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="shop-detail-card orders-summary">
                <h2>Orders Summary</h2>
                <div className="orders-grid">
                  <div className="order-stat-item">
                    <div className="order-stat pending">
                      <Clock className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders.pending}</span>
                    </div>
                    <span className="order-stat-label">Pending</span>
                  </div>
                  <div className="order-stat-item">
                    <div className="order-stat processing">
                      <TrendingUp className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders.processing}</span>
                    </div>
                    <span className="order-stat-label">Processing</span>
                  </div>
                  <div className="order-stat-item">
                    <div className="order-stat completed">
                      <CheckCircle className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders.completed}</span>
                    </div>
                    <span className="order-stat-label">Completed</span>
                  </div>
                  <div className="order-stat-item">
                    <div className="order-stat cancelled">
                      <AlertTriangle className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders.cancelled}</span>
                    </div>
                    <span className="order-stat-label">Cancelled</span>
                  </div>
                </div>
                
                <div className="view-more">
                  <button className="view-more-button" onClick={() => setActiveTab('orders')}>
                    View All Orders
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="shop-detail-card performance-metrics">
                <h2>Performance Metrics</h2>
                <div className={`performance-status ${getShopPerformanceStatus(shop.performanceMetrics)}`}>
                  {getShopPerformanceStatus(shop.performanceMetrics).charAt(0).toUpperCase() + getShopPerformanceStatus(shop.performanceMetrics).slice(1).replace('-', ' ')}
                </div>
                
                <div className="metrics-list">
                  <div className="metric-item">
                    <span className="metric-label">Order Acceptance Rate</span>
                    <div className="metric-value-container">
                      <span className="metric-value">{shop.performanceMetrics.orderAcceptanceRate}%</span>
                      <div className="metric-bar-container">
                        <div 
                          className="metric-bar" 
                          style={{ width: `${shop.performanceMetrics.orderAcceptanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Avg. Preparation Time</span>
                    <div className="metric-value-container">
                      <span className="metric-value">{shop.performanceMetrics.preparationTime} mins</span>
                      <div className="metric-bar-container">
                        <div 
                          className="metric-bar" 
                          style={{ width: `${(shop.performanceMetrics.preparationTime / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Customer Satisfaction</span>
                    <div className="metric-value-container">
                      <span className="metric-value">
                        {shop.performanceMetrics.customerSatisfaction}
                        <Star size={14} className="star-icon" />
                      </span>
                      <div className="metric-bar-container">
                        <div 
                          className="metric-bar" 
                          style={{ width: `${(shop.performanceMetrics.customerSatisfaction / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="view-more">
                  <button className="view-more-button" onClick={() => setActiveTab('performance')}>
                    View Detailed Performance
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="shop-detail-card top-products">
                <h2>Top Products</h2>
                <div className="products-list">
                  {shop.topProducts.map((product, index) => (
                    <div className="product-item" key={index}>
                      <div className="product-rank">{index + 1}</div>
                      <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        <span className="product-sales">{product.sales} sold</span>
                      </div>
                      <span className="product-revenue">{formatCurrency(product.revenue)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="view-more">
                  <button className="view-more-button" onClick={() => setActiveTab('products')}>
                    View All Products
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="shop-detail-card recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-timeline">
                  {shop.recentActivity.map((activity, index) => (
                    <div className="activity-item" key={index}>
                      <div className={`activity-icon ${activity.type}`}></div>
                      <div className="activity-content">
                        <span className="activity-details">{activity.details}</span>
                        <span className="activity-time">{formatDate(activity.time)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="shop-detail-content">
            <h2>Orders Management</h2>
            <p className="tab-placeholder">Orders management content would go here, showing all orders for {shop.name} with filtering options by status.</p>
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div className="shop-detail-content">
            <h2>Performance Analytics</h2>
            <p className="tab-placeholder">Detailed performance metrics and analytics would go here, showing trends over time for {shop.name}.</p>
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className="shop-detail-content">
            <h2>Products Management</h2>
            <p className="tab-placeholder">Product catalog management would go here, allowing you to view and edit all products for {shop.name}.</p>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="shop-detail-content">
            <h2>Earnings & Payouts</h2>
            <p className="tab-placeholder">Earnings history, payout records, and financial analytics would go here for {shop.name}.</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="shop-detail-content">
            <h2>Shop Settings</h2>
            <p className="tab-placeholder">Shop settings and configuration options would go here for {shop.name}.</p>
          </div>
        )}
      </div>
    );
  }
  
  // List view of all shops
  return (
    <div className="shop-partner-dashboard">
      <h1>Shop Partner Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Store />
          </div>
          <div className="stat-content">
            <span className="stat-value">{shops.length}</span>
            <span className="stat-label">Total Shops</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Store />
          </div>
          <div className="stat-content">
            <span className="stat-value">{shops.filter(shop => shop.status === 'active').length}</span>
            <span className="stat-label">Active Shops</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {shops.reduce((total, shop) => total + 
                (shop.orders.pending + shop.orders.processing + shop.orders.completed + shop.orders.cancelled), 0)}
            </span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {formatCurrency(shops.reduce((total, shop) => total + shop.earnings.total, 0))}
            </span>
            <span className="stat-label">Total Revenue</span>
          </div>
        </div>
      </div>
      
      <div className="shops-container">
        <div className="shops-header">
          <h2>All Shop Partners</h2>
          <button className="add-shop-button">+ Add New Shop</button>
        </div>
        
        <div className="shops-grid">
          {shops.map(shop => (
            <div className={`shop-card ${shop.status}`} key={shop.id}>
              <div className="shop-card-header">
                <h3 className="shop-name">{shop.name}</h3>
                <div className={`shop-status ${shop.status}`}>
                  {shop.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
              
              <div className="shop-card-content">
                <div className="shop-rating">
                  <Star className="rating-star" />
                  <span className="rating-value">{shop.rating}</span>
                  <span className="reviews-count">({shop.reviews} reviews)</span>
                </div>
                
                <div className="shop-location">
                  <Map className="location-icon" />
                  <span>{shop.location.address}</span>
                </div>
                
                <div className="shop-category">
                  <span className="category-tag">{shop.category}</span>
                </div>
                
                <div className="shop-metrics">
                  <div className="metric">
                    <span className="metric-label">Orders</span>
                    <span className="metric-value">
                      {shop.orders.pending + shop.orders.processing + shop.orders.completed + shop.orders.cancelled}
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Earnings</span>
                    <span className="metric-value">{formatCurrency(shop.earnings.currentMonth)}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Performance</span>
                    <span className={`performance-indicator ${getShopPerformanceStatus(shop.performanceMetrics)}`}>
                      {getShopPerformanceStatus(shop.performanceMetrics).charAt(0).toUpperCase() + getShopPerformanceStatus(shop.performanceMetrics).slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="shop-card-footer">
                <button 
                  className="view-shop-button"
                  onClick={() => setSelectedShop(shop.id)}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
                
                <button className={`shop-toggle-button ${shop.status === 'active' ? 'deactivate' : 'activate'}`}>
                  {shop.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPartnerDashboard;
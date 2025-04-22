// import React, { useState } from 'react';
// import { 
//   Store, 
//   Map, 
//   Star, 
//   Package, 
//   DollarSign, 
//   TrendingUp, 
//   ChevronRight,
//   Settings,
//   Clock,
//   CheckCircle,
//   AlertTriangle
// } from 'lucide-react';
// import '../styles/ShopPartnerDashboard.css'; // Import your CSS file for styling

// const ShopPartnerDashboard = () => {
//   // State for active tab
//   const [activeTab, setActiveTab] = useState('overview');
  
//   // State for selected shop
//   const [selectedShop, setSelectedShop] = useState(null);
  
//   // Mock data for shops
//   const shops = [
//     {
//       id: 'S001',
//       name: 'Fresh Foods Market',
//       location: { address: '230 Broadway, New York, NY', lat: 40.7138, lng: -74.0070 },
//       rating: 4.8,
//       reviews: 256,
//       category: 'Grocery',
//       joinDate: '2024-07-15',
//       status: 'active',
//       earnings: {
//         currentMonth: 12580.45,
//         previousMonth: 11250.30,
//         total: 58945.75
//       },
//       orders: {
//         pending: 3,
//         processing: 5,
//         completed: 89,
//         cancelled: 2
//       },
//       performanceMetrics: {
//         orderAcceptanceRate: 98.5,
//         preparationTime: 12.4, // minutes
//         customerSatisfaction: 4.7
//       },
//       topProducts: [
//         { name: 'Organic Apples', sales: 154, revenue: 769.46 },
//         { name: 'Free Range Eggs', sales: 128, revenue: 639.72 },
//         { name: 'Artisan Bread', sales: 98, revenue: 392.02 }
//       ],
//       recentActivity: [
//         { type: 'order_received', time: '2025-04-18T14:30:00', details: 'New order #12345 received' },
//         { type: 'order_completed', time: '2025-04-18T13:15:00', details: 'Order #12343 marked as completed' },
//         { type: 'review_received', time: '2025-04-18T11:22:00', details: 'New 5-star review received' },
//         { type: 'payout_processed', time: '2025-04-17T09:00:00', details: 'Weekly payout of ₹2,450.78 processed' }
//       ]
//     },
//     {
//       id: 'S002',
//       name: 'Urban Eats',
//       location: { address: '500 Park Ave, New York, NY', lat: 40.7348, lng: -74.0280 },
//       rating: 4.6,
//       reviews: 189,
//       category: 'Restaurant',
//       joinDate: '2024-08-22',
//       status: 'active',
//       earnings: {
//         currentMonth: 9875.20,
//         previousMonth: 8950.10,
//         total: 42680.35
//       },
//       orders: {
//         pending: 2,
//         processing: 4,
//         completed: 72,
//         cancelled: 1
//       },
//       performanceMetrics: {
//         orderAcceptanceRate: 97.2,
//         preparationTime: 18.7, // minutes
//         customerSatisfaction: 4.5
//       },
//       topProducts: [
//         { name: 'Artisan Pizza', sales: 112, revenue: 1679.88 },
//         { name: 'Caesar Salad', sales: 87, revenue: 782.13 },
//         { name: 'Grilled Chicken Sandwich', sales: 76, revenue: 683.24 }
//       ],
//       recentActivity: [
//         { type: 'order_received', time: '2025-04-18T15:10:00', details: 'New order #12347 received' },
//         { type: 'order_completed', time: '2025-04-18T14:05:00', details: 'Order #12342 marked as completed' },
//         { type: 'issue_reported', time: '2025-04-18T12:30:00', details: 'Customer reported missing items in order #12340' },
//         { type: 'payout_processed', time: '2025-04-17T09:00:00', details: 'Weekly payout of ₹1,875.45 processed' }
//       ]
//     },
//     {
//       id: 'S003',
//       name: 'Health & Wellness Market',
//       location: { address: '350 Madison Ave, New York, NY', lat: 40.7508, lng: -73.9772 },
//       rating: 4.5,
//       reviews: 128,
//       category: 'Health Foods',
//       joinDate: '2024-09-05',
//       status: 'inactive',
//       earnings: {
//         currentMonth: 5240.30,
//         previousMonth: 6120.85,
//         total: 28450.60
//       },
//       orders: {
//         pending: 0,
//         processing: 0,
//         completed: 65,
//         cancelled: 0
//       },
//       performanceMetrics: {
//         orderAcceptanceRate: 95.8,
//         preparationTime: 11.2, // minutes
//         customerSatisfaction: 4.4
//       },
//       topProducts: [
//         { name: 'Protein Smoothie', sales: 89, revenue: 534.00 },
//         { name: 'Organic Vitamins', sales: 67, revenue: 1005.00 },
//         { name: 'Vegan Protein Bars', sales: 58, revenue: 290.00 }
//       ],
//       recentActivity: [
//         { type: 'shop_deactivated', time: '2025-04-15T17:00:00', details: 'Shop temporarily deactivated due to inventory update' },
//         { type: 'order_completed', time: '2025-04-15T14:45:00', details: 'Order #12335 marked as completed' },
//         { type: 'inventory_updated', time: '2025-04-15T11:30:00', details: '25 new products added to inventory' },
//         { type: 'payout_processed', time: '2025-04-10T09:00:00', details: 'Weekly payout of ₹1,250.45 processed' }
//       ]
//     }
//   ];
  
//   // Function to format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2
//     }).format(amount);
//   };
  
//   // Function to format date
//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
  
//   // Function to get shop performance status
//   const getShopPerformanceStatus = (metrics) => {
//     if (metrics.orderAcceptanceRate > 95 && metrics.customerSatisfaction > 4.5) {
//       return 'excellent';
//     } else if (metrics.orderAcceptanceRate > 90 && metrics.customerSatisfaction > 4.0) {
//       return 'good';
//     } else if (metrics.orderAcceptanceRate > 85 && metrics.customerSatisfaction > 3.5) {
//       return 'average';
//     } else {
//       return 'needs-improvement';
//     }
//   };
  
//   // If a shop is selected, show detailed view
//   if (selectedShop) {
//     const shop = shops.find(s => s.id === selectedShop);
    
//     return (
//       <div className="shop-partner-dashboard">
//         <div className="shop-detail-header">
//           <button className="back-button" onClick={() => setSelectedShop(null)}>
//             &larr; Back to Shops
//           </button>
//           <h1>{shop.name}</h1>
//           <div className={`shop-status ${shop.status}`}>
//             {shop.status === 'active' ? 'Active' : 'Inactive'}
//           </div>
//         </div>
        
//         <div className="shop-tabs">
//           <button 
//             className={`shop-tab ${activeTab === 'overview' ? 'active' : ''}`}
//             onClick={() => setActiveTab('overview')}
//           >
//             Overview
//           </button>
//           <button 
//             className={`shop-tab ${activeTab === 'orders' ? 'active' : ''}`}
//             onClick={() => setActiveTab('orders')}
//           >
//             Orders
//           </button>
//           <button 
//             className={`shop-tab ${activeTab === 'performance' ? 'active' : ''}`}
//             onClick={() => setActiveTab('performance')}
//           >
//             Performance
//           </button>
//           <button 
//             className={`shop-tab ${activeTab === 'products' ? 'active' : ''}`}
//             onClick={() => setActiveTab('products')}
//           >
//             Products
//           </button>
//           <button 
//             className={`shop-tab ${activeTab === 'earnings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('earnings')}
//           >
//             Earnings
//           </button>
//           <button 
//             className={`shop-tab ${activeTab === 'settings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('settings')}
//           >
//             Settings
//           </button>
//         </div>
        
//         {activeTab === 'overview' && (
//           <div className="shop-detail-content">
//             <div className="shop-overview-grid">
//               <div className="shop-detail-card shop-info">
//                 <h2>Shop Information</h2>
//                 <div className="shop-info-grid">
//                   <div className="info-item">
//                     <span className="info-label">Category</span>
//                     <span className="info-value">{shop.category}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Rating</span>
//                     <span className="info-value">
//                       {shop.rating} <Star size={14} className="star-icon" />
//                       <span className="reviews-count">({shop.reviews} reviews)</span>
//                     </span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Address</span>
//                     <span className="info-value">{shop.location.address}</span>
//                   </div>
//                   <div className="info-item">
//                     <span className="info-label">Joined</span>
//                     <span className="info-value">{new Date(shop.joinDate).toLocaleDateString()}</span>
//                   </div>
//                 </div>
                
//                 <div className="shop-actions">
//                   <button className="shop-action-button">
//                     <Map size={16} />
//                     View on Map
//                   </button>
//                   <button className="shop-action-button">
//                     <Settings size={16} />
//                     Edit Info
//                   </button>
//                   <button className={`shop-status-toggle ${shop.status === 'active' ? 'deactivate' : 'activate'}`}>
//                     {shop.status === 'active' ? 'Deactivate Shop' : 'Activate Shop'}
//                   </button>
//                 </div>
//               </div>
              
//               <div className="shop-detail-card earnings-summary">
//                 <h2>Earnings Summary</h2>
//                 <div className="earnings-grid">
//                   <div className="earnings-item">
//                     <span className="earnings-label">Current Month</span>
//                     <span className="earnings-value">{formatCurrency(shop.earnings.currentMonth)}</span>
//                     <span className="earnings-change positive">
//                       +{((shop.earnings.currentMonth - shop.earnings.previousMonth) / shop.earnings.previousMonth * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                   <div className="earnings-item">
//                     <span className="earnings-label">Previous Month</span>
//                     <span className="earnings-value">{formatCurrency(shop.earnings.previousMonth)}</span>
//                   </div>
//                   <div className="earnings-item total">
//                     <span className="earnings-label">Total Earnings</span>
//                     <span className="earnings-value">{formatCurrency(shop.earnings.total)}</span>
//                   </div>
//                 </div>
                
//                 <div className="view-more">
//                   <button className="view-more-button" onClick={() => setActiveTab('earnings')}>
//                     View Detailed Earnings
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="shop-detail-card orders-summary">
//                 <h2>Orders Summary</h2>
//                 <div className="orders-grid">
//                   <div className="order-stat-item">
//                     <div className="order-stat pending">
//                       <Clock className="order-stat-icon" />
//                       <span className="order-stat-value">{shop.orders.pending}</span>
//                     </div>
//                     <span className="order-stat-label">Pending</span>
//                   </div>
//                   <div className="order-stat-item">
//                     <div className="order-stat processing">
//                       <TrendingUp className="order-stat-icon" />
//                       <span className="order-stat-value">{shop.orders.processing}</span>
//                     </div>
//                     <span className="order-stat-label">Processing</span>
//                   </div>
//                   <div className="order-stat-item">
//                     <div className="order-stat completed">
//                       <CheckCircle className="order-stat-icon" />
//                       <span className="order-stat-value">{shop.orders.completed}</span>
//                     </div>
//                     <span className="order-stat-label">Completed</span>
//                   </div>
//                   <div className="order-stat-item">
//                     <div className="order-stat cancelled">
//                       <AlertTriangle className="order-stat-icon" />
//                       <span className="order-stat-value">{shop.orders.cancelled}</span>
//                     </div>
//                     <span className="order-stat-label">Cancelled</span>
//                   </div>
//                 </div>
                
//                 <div className="view-more">
//                   <button className="view-more-button" onClick={() => setActiveTab('orders')}>
//                     View All Orders
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="shop-detail-card performance-metrics">
//                 <h2>Performance Metrics</h2>
//                 <div className={`performance-status ${getShopPerformanceStatus(shop.performanceMetrics)}`}>
//                   {getShopPerformanceStatus(shop.performanceMetrics).charAt(0).toUpperCase() + getShopPerformanceStatus(shop.performanceMetrics).slice(1).replace('-', ' ')}
//                 </div>
                
//                 <div className="metrics-list">
//                   <div className="metric-item">
//                     <span className="metric-label">Order Acceptance Rate</span>
//                     <div className="metric-value-container">
//                       <span className="metric-value">{shop.performanceMetrics.orderAcceptanceRate}%</span>
//                       <div className="metric-bar-container">
//                         <div 
//                           className="metric-bar" 
//                           style={{ width: `₹{shop.performanceMetrics.orderAcceptanceRate}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="metric-item">
//                     <span className="metric-label">Avg. Preparation Time</span>
//                     <div className="metric-value-container">
//                       <span className="metric-value">{shop.performanceMetrics.preparationTime} mins</span>
//                       <div className="metric-bar-container">
//                         <div 
//                           className="metric-bar" 
//                           style={{ width: `₹{(shop.performanceMetrics.preparationTime / 30) * 100}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="metric-item">
//                     <span className="metric-label">Customer Satisfaction</span>
//                     <div className="metric-value-container">
//                       <span className="metric-value">
//                         {shop.performanceMetrics.customerSatisfaction}
//                         <Star size={14} className="star-icon" />
//                       </span>
//                       <div className="metric-bar-container">
//                         <div 
//                           className="metric-bar" 
//                           style={{ width: `₹{(shop.performanceMetrics.customerSatisfaction / 5) * 100}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="view-more">
//                   <button className="view-more-button" onClick={() => setActiveTab('performance')}>
//                     View Detailed Performance
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="shop-detail-card top-products">
//                 <h2>Top Products</h2>
//                 <div className="products-list">
//                   {shop.topProducts.map((product, index) => (
//                     <div className="product-item" key={index}>
//                       <div className="product-rank">{index + 1}</div>
//                       <div className="product-info">
//                         <span className="product-name">{product.name}</span>
//                         <span className="product-sales">{product.sales} sold</span>
//                       </div>
//                       <span className="product-revenue">{formatCurrency(product.revenue)}</span>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="view-more">
//                   <button className="view-more-button" onClick={() => setActiveTab('products')}>
//                     View All Products
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="shop-detail-card recent-activity">
//                 <h2>Recent Activity</h2>
//                 <div className="activity-timeline">
//                   {shop.recentActivity.map((activity, index) => (
//                     <div className="activity-item" key={index}>
//                       <div className={`activity-icon ${activity.type}`}></div>
//                       <div className="activity-content">
//                         <span className="activity-details">{activity.details}</span>
//                         <span className="activity-time">{formatDate(activity.time)}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {activeTab === 'orders' && (
//           <div className="shop-detail-content">
//             <h2>Orders Management</h2>
//             <p className="tab-placeholder">Orders management content would go here, showing all orders for {shop.name} with filtering options by status.</p>
//           </div>
//         )}
        
//         {activeTab === 'performance' && (
//           <div className="shop-detail-content">
//             <h2>Performance Analytics</h2>
//             <p className="tab-placeholder">Detailed performance metrics and analytics would go here, showing trends over time for {shop.name}.</p>
//           </div>
//         )}
        
//         {activeTab === 'products' && (
//           <div className="shop-detail-content">
//             <h2>Products Management</h2>
//             <p className="tab-placeholder">Product catalog management would go here, allowing you to view and edit all products for {shop.name}.</p>
//           </div>
//         )}
        
//         {activeTab === 'earnings' && (
//           <div className="shop-detail-content">
//             <h2>Earnings & Payouts</h2>
//             <p className="tab-placeholder">Earnings history, payout records, and financial analytics would go here for {shop.name}.</p>
//           </div>
//         )}
        
//         {activeTab === 'settings' && (
//           <div className="shop-detail-content">
//             <h2>Shop Settings</h2>
//             <p className="tab-placeholder">Shop settings and configuration options would go here for {shop.name}.</p>
//           </div>
//         )}
//       </div>
//     );
//   }
  
//   // List view of all shops
//   return (
//     <div className="shop-partner-dashboard">
//       <h1>Shop Partner Dashboard</h1>
      
//       <div className="dashboard-stats">
//         <div className="stat-card">
//           <div className="stat-icon">
//             <Store />
//           </div>
//           <div className="stat-content">
//             <span className="stat-value">{shops.length}</span>
//             <span className="stat-label">Total Shops</span>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <Store />
//           </div>
//           <div className="stat-content">
//             <span className="stat-value">{shops.filter(shop => shop.status === 'active').length}</span>
//             <span className="stat-label">Active Shops</span>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <Package />
//           </div>
//           <div className="stat-content">
//             <span className="stat-value">
//               {shops.reduce((total, shop) => total + 
//                 (shop.orders.pending + shop.orders.processing + shop.orders.completed + shop.orders.cancelled), 0)}
//             </span>
//             <span className="stat-label">Total Orders</span>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <DollarSign />
//           </div>
//           <div className="stat-content">
//             <span className="stat-value">
//               {formatCurrency(shops.reduce((total, shop) => total + shop.earnings.total, 0))}
//             </span>
//             <span className="stat-label">Total Revenue</span>
//           </div>
//         </div>
//       </div>
      
//       <div className="shops-container">
//         <div className="shops-header">
//           <h2>All Shop Partners</h2>
//           <button className="add-shop-button">+ Add New Shop</button>
//         </div>
        
//         <div className="shops-grid">
//           {shops.map(shop => (
//             <div className={`shop-card ${shop.status}`} key={shop.id}>
//               <div className="shop-card-header">
//                 <h3 className="shop-name">{shop.name}</h3>
//                 <div className={`shop-status ${shop.status}`}>
//                   {shop.status === 'active' ? 'Active' : 'Inactive'}
//                 </div>
//               </div>
              
//               <div className="shop-card-content">
//                 <div className="shop-rating">
//                   <Star className="rating-star" />
//                   <span className="rating-value">{shop.rating}</span>
//                   <span className="reviews-count">({shop.reviews} reviews)</span>
//                 </div>
                
//                 <div className="shop-location">
//                   <Map className="location-icon" />
//                   <span>{shop.location.address}</span>
//                 </div>
                
//                 <div className="shop-category">
//                   <span className="category-tag">{shop.category}</span>
//                 </div>
                
//                 <div className="shop-metrics">
//                   <div className="metric">
//                     <span className="metric-label">Orders</span>
//                     <span className="metric-value">
//                       {shop.orders.pending + shop.orders.processing + shop.orders.completed + shop.orders.cancelled}
//                     </span>
//                   </div>
//                   <div className="metric">
//                     <span className="metric-label">Earnings</span>
//                     <span className="metric-value">{formatCurrency(shop.earnings.currentMonth)}</span>
//                   </div>
//                   <div className="metric">
//                     <span className="metric-label">Performance</span>
//                     <span className={`performance-indicator ${getShopPerformanceStatus(shop.performanceMetrics)}`}>
//                       {getShopPerformanceStatus(shop.performanceMetrics).charAt(0).toUpperCase() + getShopPerformanceStatus(shop.performanceMetrics).slice(1).replace('-', ' ')}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="shop-card-footer">
//                 <button 
//                   className="view-shop-button"
//                   onClick={() => setSelectedShop(shop.id)}
//                 >
//                   View Details
//                   <ChevronRight size={16} />
//                 </button>
                
//                 <button className={`shop-toggle-button ${shop.status === 'active' ? 'deactivate' : 'activate'}`}>
//                   {shop.status === 'active' ? 'Deactivate' : 'Activate'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopPartnerDashboard;
import React, { useState} from 'react';
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
  AlertTriangle,
  UserPlus,
 
  RefreshCw,

  X
} from 'lucide-react';
// Importing the CSS is assumed
import '../styles/ShopPartnerDashboard.css';

const ShopPartnerDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for selected shop
  const [selectedShop, setSelectedShop] = useState(null);
  
  // State for vendors
  const [vendors, setVendors] = useState([
    { id: 'V001', name: 'Rahul Singh', rating: 4.8, specialty: 'Grocery', available: true, orders: 245 },
    { id: 'V002', name: 'Priya Sharma', rating: 4.6, specialty: 'Restaurant', available: true, orders: 189 },
    { id: 'V003', name: 'Amit Kumar', rating: 4.7, specialty: 'Health Foods', available: false, orders: 156 },
    { id: 'V004', name: 'Deepika Patel', rating: 4.5, specialty: 'Grocery', available: true, orders: 132 },
    { id: 'V005', name: 'Vikram Malhotra', rating: 4.9, specialty: 'Restaurant', available: true, orders: 201 }
  ]);
  
  // State for notification
  const [notification, setNotification] = useState(null);
  
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for shops with additional order details
  const [shops, setShops] = useState([
    {
      id: 'S001',
      name: 'Fresh Foods Market',
      location: { address: '230 Broadway, New Delhi, India', lat: 28.6139, lng: 77.2090 },
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
      ordersList: [
        { id: 'ORD1001', customer: 'Akash Gupta', amount: 750.50, status: 'pending', items: 3, time: '2025-04-22T10:15:00', assignedVendor: null },
        { id: 'ORD1002', customer: 'Neha Reddy', amount: 1250.75, status: 'processing', items: 5, time: '2025-04-22T09:30:00', assignedVendor: 'V001' },
        { id: 'ORD1003', customer: 'Raj Malhotra', amount: 450.25, status: 'pending', items: 2, time: '2025-04-22T08:45:00', assignedVendor: null },
        { id: 'ORD1004', customer: 'Sunita Verma', amount: 2100.00, status: 'processing', items: 7, time: '2025-04-21T18:20:00', assignedVendor: 'V004' }
      ],
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
        { type: 'payout_processed', time: '2025-04-17T09:00:00', details: 'Weekly payout of ₹2,450.78 processed' }
      ]
    },
    {
      id: 'S002',
      name: 'Urban Eats',
      location: { address: '500 Park Ave, Mumbai, India', lat: 19.0760, lng: 72.8777 },
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
      ordersList: [
        { id: 'ORD2001', customer: 'Vikram Shah', amount: 950.00, status: 'pending', items: 2, time: '2025-04-22T11:05:00', assignedVendor: null },
        { id: 'ORD2002', customer: 'Aarti Joshi', amount: 1450.50, status: 'processing', items: 3, time: '2025-04-22T10:20:00', assignedVendor: 'V002' },
        { id: 'ORD2003', customer: 'Sanjeev Kumar', amount: 850.25, status: 'processing', items: 2, time: '2025-04-21T19:15:00', assignedVendor: 'V005' }
      ],
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
        { type: 'payout_processed', time: '2025-04-17T09:00:00', details: 'Weekly payout of ₹1,875.45 processed' }
      ]
    },
    {
      id: 'S003',
      name: 'Health & Wellness Market',
      location: { address: '350 Madison Ave, Bangalore, India', lat: 12.9716, lng: 77.5946 },
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
      ordersList: [],
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
        { type: 'payout_processed', time: '2025-04-10T09:00:00', details: 'Weekly payout of ₹1,250.45 processed' }
      ]
    }
  ]);
  
  // Function to format currency with rupee symbol
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
    return new Date(dateString).toLocaleDateString('en-IN', options);
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
  
  // Function to handle order cancellation with real-time updates
  const handleCancelOrder = (shopId, orderId) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShops(prevShops => {
        return prevShops.map(shop => {
          if (shop.id === shopId) {
            // Find the order and update its status
            const updatedOrdersList = shop.ordersList.map(order => 
              order.id === orderId ? { ...order, status: 'cancelled', assignedVendor: null } : order
            );
            
            // Count orders by status in the updated list
            const pendingCount = updatedOrdersList.filter(order => order.status === 'pending').length;
            const processingCount = updatedOrdersList.filter(order => order.status === 'processing').length;
            const completedCount = updatedOrdersList.filter(order => order.status === 'completed').length;
            const cancelledCount = updatedOrdersList.filter(order => order.status === 'cancelled').length;
            
            // Return updated shop object
            return {
              ...shop,
              ordersList: updatedOrdersList,
              orders: {
                pending: pendingCount,
                processing: processingCount,
                completed: completedCount,
                cancelled: cancelledCount
              },
              recentActivity: [
                {
                  type: 'order_cancelled',
                  time: new Date().toISOString(),
                  details: `Order ${orderId} has been cancelled`
                },
                ...shop.recentActivity.slice(0, 3)
              ]
            };
          }
          return shop;
        });
      });
      
      // Show notification
      setNotification({
        message: `Order ${orderId} has been cancelled successfully`,
        type: 'success'
      });
      
      setIsLoading(false);
      
      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 800); // Simulate network delay
  };
  
  // Function to handle vendor assignment with real-time updates
  const handleAssignVendor = (shopId, orderId, vendorId) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShops(prevShops => {
        return prevShops.map(shop => {
          if (shop.id === shopId) {
            // Find the order and update its assigned vendor
            const updatedOrdersList = shop.ordersList.map(order => 
              order.id === orderId ? { ...order, assignedVendor: vendorId } : order
            );
            
            // Return updated shop object with new activity
            return {
              ...shop,
              ordersList: updatedOrdersList,
              recentActivity: [
                {
                  type: 'vendor_assigned',
                  time: new Date().toISOString(),
                  details: `Vendor assigned to order ${orderId}`
                },
                ...shop.recentActivity.slice(0, 3)
              ]
            };
          }
          return shop;
        });
      });
      
      // Also update vendor availability
      setVendors(prevVendors => {
        return prevVendors.map(vendor => 
          vendor.id === vendorId ? { ...vendor, available: false } : vendor
        );
      });
      
      // Show notification
      setNotification({
        message: `Vendor has been assigned to order ${orderId} successfully`,
        type: 'success'
      });
      
      setIsLoading(false);
      
      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 800); // Simulate network delay
  };
  
  // Function to handle changing shop status
  const handleToggleShopStatus = (shopId) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShops(prevShops => {
        return prevShops.map(shop => {
          if (shop.id === shopId) {
            const newStatus = shop.status === 'active' ? 'inactive' : 'active';
            
            return {
              ...shop,
              status: newStatus,
              recentActivity: [
                {
                  type: newStatus === 'active' ? 'shop_activated' : 'shop_deactivated',
                  time: new Date().toISOString(),
                  details: `Shop ${newStatus === 'active' ? 'activated' : 'deactivated'}`
                },
                ...shop.recentActivity.slice(0, 3)
              ]
            };
          }
          return shop;
        });
      });
      
      // Show notification
      setNotification({
        message: `Shop status updated successfully`,
        type: 'success'
      });
      
      setIsLoading(false);
      
      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 800); // Simulate network delay
  };
  
  // If a shop is selected, show detailed view
  if (selectedShop) {
    const shop = shops.find(s => s.id === selectedShop);
    
    return (
      <div className="shop-partner-dashboard">
        {/* Notification Component */}
        {notification && (
          <div className={`notification notification-${notification.type}`}>
            <span>{notification.message}</span>
            <button className="notification-close" onClick={() => setNotification(null)}>
              <X size={16} />
            </button>
          </div>
        )}
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <RefreshCw size={40} className="spinning" />
            </div>
          </div>
        )}
        
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
            className={`shop-tab ${activeTab === 'vendors' ? 'active' : ''}`}
            onClick={() => setActiveTab('vendors')}
          >
            Vendors
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
                  <button 
                    className={`shop-status-toggle ${shop.status === 'active' ? 'deactivate' : 'activate'}`}
                    onClick={() => handleToggleShopStatus(shop.id)}
                  >
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
            <div className="orders-management">
              <div className="orders-filters">
                <div className="filter-group">
                  <label>Status:</label>
                  <select className="filter-select">
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Date Range:</label>
                  <select className="filter-select">
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <button className="filter-button">
                  <RefreshCw size={14} />
                  Refresh
                </button>
              </div>
              
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Items</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Vendor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shop.ordersList.map((order) => (
                      <tr key={order.id} className={`order-row order-${order.status}`}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{formatCurrency(order.amount)}</td>
                        <td>{order.items}</td>
                        <td>{formatDate(order.time)}</td>
                        <td>
                          <span className={`order-status-badge ${order.status}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          {order.assignedVendor ? (
                            <span className="vendor-assigned">
                              {vendors.find(v => v.id === order.assignedVendor)?.name || 'Unknown'}
                            </span>
                          ) : (
                            <span className="vendor-unassigned">Not Assigned</span>
                          )}
                        </td>
                        <td className="order-actions">
                          {order.status === 'pending' && (
                            <>
                              <button 
                                className="assign-vendor-button" 
                                onClick={() => setActiveTab('vendors')}
                                title="Assign Vendor"
                              >
                                <UserPlus size={16} />
                              </button>
                              <button 
                                className="cancel-order-button" 
                                onClick={() => handleCancelOrder(shop.id, order.id)}
                                title="Cancel Order"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                          {order.status === 'processing' && (
                            <button 
                              className="cancel-order-button" 
                              onClick={() => handleCancelOrder(shop.id, order.id)}
                              title="Cancel Order"
                            >
                              <X size={16} />
                            </button>
                          )}
                          {(order.status === 'completed' || order.status === 'cancelled') && (
                            <button className="view-details-button" title="View Details">
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {shop.ordersList.length === 0 && (
                      <tr>
                        <td colSpan="8" className="no-orders">
                          No orders found for this shop
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'vendors' && (
          <div className="shop-detail-content">
            <h2>Vendor Assignment</h2>
            <div className="vendors-management">
              <div className="vendor-assignment-section">
                <div className="pending-orders">
                  <h3>Pending Orders</h3>
                  {shop.ordersList.filter(order => order.status === 'pending' || order.status === 'processing').length > 0 ? (
                    <div className="pending-orders-list">
                      {shop.ordersList
                        .filter(order => order.status === 'pending' || order.status === 'processing')
                        .map(order => (
                          <div className="pending-order-card" key={order.id}>
                            <div className="order-header">
                              <div className="order-id">{order.id}</div>
                              <div className={`order-status ${order.status}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </div>
                            </div>
                            <div className="order-details">
                              <div className="order-detail-item">
                                <span className="detail-label">Customer:</span>
                                <span className="detail-value">{order.customer}</span>
                              </div>
                              <div className="order-detail-item">
                                <span className="detail-label">Amount:</span>
                                <span className="detail-value">{formatCurrency(order.amount)}</span>
                              </div>
                              <div className="order-detail-item">
                                <span className="detail-label">Items:</span>
                                <span className="detail-value">{order.items}</span>
                              </div>
                              <div className="order-detail-item">
                                <span className="detail-label">Time:</span>
                                <span className="detail-value">{formatDate(order.time)}</span>
                              </div>
                            </div>
                            <div className="order-vendor-assignment">
                              <h4>Assign Vendor</h4>
                              {order.assignedVendor ? (
                                <div className="assigned-vendor">
                                  <div className="vendor-info">
                                    <span className="vendor-name">
                                      {vendors.find(v => v.id === order.assignedVendor)?.name || 'Unknown'}
                                    </span>
                                    <span className="vendor-rating">
                                      {vendors.find(v => v.id === order.assignedVendor)?.rating || '-'} <Star size={14} />
                                    </span>
                                  </div>
                                  <button 
                                    className="reassign-button"
                                    onClick={() => handleAssignVendor(shop.id, order.id, null)}
                                  >
                                    Reassign
                                  </button>
                                </div>
                              ) : (
                                <div className="vendor-selection">
                                  <div className="vendor-select-list">
                                    {vendors
                                      .filter(vendor => vendor.available && vendor.specialty === shop.category)
                                      .map(vendor => (
                                        <div className="vendor-select-item" key={vendor.id}>
                                          <div className="vendor-select-info">
                                            <span className="vendor-name">{vendor.name}</span>
                                            <div className="vendor-meta">
                                              <span className="vendor-rating">
                                                {vendor.rating} <Star size={14} />
                                              </span>
                                              <span className="vendor-orders">
                                                {vendor.orders} orders
                                              </span>
                                            </div>
                                          </div>
                                          <button 
                                            className="assign-button"
                                            onClick={() => handleAssignVendor(shop.id, order.id, vendor.id)}
                                          >
                                            Assign
                                          </button>
                                        </div>
                                      ))}
                                    {vendors.filter(vendor => vendor.available && vendor.specialty === shop.category).length === 0 && (
                                      <div className="no-vendors">
                                        No available vendors matching shop category.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="no-pending-orders">
                      No pending or processing orders to assign vendors to.
                    </div>
                  )}
                </div>
                
                <div className="vendor-management">
                  <h3>Available Vendors</h3>
                  <div className="vendors-filter">
                    <div className="filter-group">
                      <label>Specialty:</label>
                      <select className="filter-select">
                        <option value="all">All Specialties</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Health Foods">Health Foods</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label>Availability:</label>
                      <select className="filter-select">
                        <option value="all">All</option>
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="vendors-list">
                    {vendors.map(vendor => (
                      <div className={`vendor-card ${vendor.available ? 'available' : 'busy'}`} key={vendor.id}>
                        <div className="vendor-card-header">
                          <h4 className="vendor-name">{vendor.name}</h4>
                          <div className={`vendor-status ${vendor.available ? 'available' : 'busy'}`}>
                            {vendor.available ? 'Available' : 'Busy'}
                          </div>
                        </div>
                        <div className="vendor-card-content">
                          <div className="vendor-info-item">
                            <span className="info-label">Specialty</span>
                            <span className="info-value">{vendor.specialty}</span>
                          </div>
                          <div className="vendor-info-item">
                            <span className="info-label">Rating</span>
                            <span className="info-value">
                              {vendor.rating} <Star size={14} />
                            </span>
                          </div>
                          <div className="vendor-info-item">
                            <span className="info-label">Orders Completed</span>
                            <span className="info-value">{vendor.orders}</span>
                          </div>
                        </div>
                        <div className="vendor-card-footer">
                          <button className="vendor-action-button">
                            View Profile
                          </button>
                          {vendor.available ? (
                            <div className="vendor-actions">
                              <button 
                                className="vendor-assign-button"
                                disabled={shop.ordersList.filter(order => order.status === 'pending' && !order.assignedVendor).length === 0}
                              >
                                Assign to Order
                              </button>
                            </div>
                          ) : (
                            <div className="vendor-busy-status">
                              Currently on assignment
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
      {/* Notification Component */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span>{notification.message}</span>
          <button className="notification-close" onClick={() => setNotification(null)}>
            <X size={16} />
          </button>
        </div>
      )}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <RefreshCw size={40} className="spinning" />
          </div>
        </div>
      )}
      
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
                
                <button 
                  className={`shop-toggle-button ${shop.status === 'active' ? 'deactivate' : 'activate'}`}
                  onClick={() => handleToggleShopStatus(shop.id)}
                >
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
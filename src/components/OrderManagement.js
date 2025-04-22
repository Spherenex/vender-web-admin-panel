import React, { useState } from 'react';
import { 
  Package, 
  Filter, 
  Search,
  MapPin,
  Star,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  RefreshCw
} from 'lucide-react';
import '../styles/OrderManagement.css'; // Import your CSS file for styling

const OrderManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected order (for viewing details)
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Mock data for orders
  const orders = [
    {
      id: 'ORD-12345',
      customerName: 'John Smith',
      customerLocation: { lat: 40.7128, lng: -74.0060, address: '123 Broadway, New York, NY' },
      items: [
        { id: 'ITEM1', name: 'Fresh Apples', quantity: 2, price: 5.99 },
        { id: 'ITEM2', name: 'Organic Milk', quantity: 1, price: 4.50 }
      ],
      total: 16.48,
      status: 'delivered',
      date: '2025-04-17T14:30:00',
      vendor: {
        id: 'V001',
        name: 'Fresh Foods Market',
        rating: 4.8,
        location: { lat: 40.7138, lng: -74.0070, address: '230 Broadway, New York, NY' },
        distance: '0.3 miles'
      },
      deliveryPerson: {
        id: 'D001',
        name: 'Mike Johnson',
        rating: 4.7,
        currentLocation: { lat: 40.7128, lng: -74.0060 }
      },
      timeline: [
        { status: 'order_placed', time: '2025-04-17T14:30:00', note: 'Order placed successfully' },
        { status: 'order_confirmed', time: '2025-04-17T14:35:00', note: 'Order confirmed by vendor' },
        { status: 'processing', time: '2025-04-17T14:40:00', note: 'Order being prepared' },
        { status: 'out_for_delivery', time: '2025-04-17T15:00:00', note: 'Order picked up by delivery person' },
        { status: 'delivered', time: '2025-04-17T15:30:00', note: 'Order delivered successfully' }
      ]
    },
    {
      id: 'ORD-12346',
      customerName: 'Emma Davis',
      customerLocation: { lat: 40.7328, lng: -74.0260, address: '456 Park Ave, New York, NY' },
      items: [
        { id: 'ITEM3', name: 'Whole Grain Bread', quantity: 1, price: 3.99 },
        { id: 'ITEM4', name: 'Free Range Eggs', quantity: 1, price: 5.99 },
        { id: 'ITEM5', name: 'Avocados', quantity: 3, price: 1.99 }
      ],
      total: 17.95,
      status: 'out_for_delivery',
      date: '2025-04-18T10:15:00',
      vendor: {
        id: 'V002',
        name: 'Urban Eats',
        rating: 4.6,
        location: { lat: 40.7348, lng: -74.0280, address: '500 Park Ave, New York, NY' },
        distance: '0.5 miles'
      },
      deliveryPerson: {
        id: 'D002',
        name: 'Sarah Wilson',
        rating: 4.9,
        currentLocation: { lat: 40.7338, lng: -74.0270 }
      },
      timeline: [
        { status: 'order_placed', time: '2025-04-18T10:15:00', note: 'Order placed successfully' },
        { status: 'order_confirmed', time: '2025-04-18T10:20:00', note: 'Order confirmed by vendor' },
        { status: 'processing', time: '2025-04-18T10:30:00', note: 'Order being prepared' },
        { status: 'out_for_delivery', time: '2025-04-18T10:45:00', note: 'Order picked up by delivery person' }
      ]
    },
    {
      id: 'ORD-12347',
      customerName: 'Michael Brown',
      customerLocation: { lat: 40.7528, lng: -74.0360, address: '789 5th Ave, New York, NY' },
      items: [
        { id: 'ITEM6', name: 'Fresh Salmon', quantity: 1, price: 15.99 },
        { id: 'ITEM7', name: 'Asparagus Bundle', quantity: 1, price: 4.99 },
        { id: 'ITEM8', name: 'Lemon', quantity: 2, price: 0.99 }
      ],
      total: 22.96,
      status: 'processing',
      date: '2025-04-18T11:45:00',
      vendor: {
        id: 'V001',
        name: 'Fresh Foods Market',
        rating: 4.8,
        location: { lat: 40.7538, lng: -74.0380, address: '800 5th Ave, New York, NY' },
        distance: '0.2 miles'
      },
      deliveryPerson: null,
      timeline: [
        { status: 'order_placed', time: '2025-04-18T11:45:00', note: 'Order placed successfully' },
        { status: 'order_confirmed', time: '2025-04-18T11:50:00', note: 'Order confirmed by vendor' },
        { status: 'processing', time: '2025-04-18T12:00:00', note: 'Order being prepared' }
      ]
    },
    {
      id: 'ORD-12348',
      customerName: 'Lisa Johnson',
      customerLocation: { lat: 40.7628, lng: -74.0460, address: '321 West St, New York, NY' },
      items: [
        { id: 'ITEM9', name: 'Organic Chicken', quantity: 1, price: 12.99 },
        { id: 'ITEM10', name: 'Sweet Potatoes', quantity: 3, price: 1.49 },
        { id: 'ITEM11', name: 'Broccoli', quantity: 1, price: 2.99 }
      ],
      total: 21.45,
      status: 'pending',
      date: '2025-04-18T13:20:00',
      vendor: null, // Not assigned yet
      deliveryPerson: null,
      timeline: [
        { status: 'order_placed', time: '2025-04-18T13:20:00', note: 'Order placed successfully' }
      ]
    },
    {
      id: 'ORD-12349',
      customerName: 'Robert Taylor',
      customerLocation: { lat: 40.7728, lng: -74.0560, address: '555 Hudson St, New York, NY' },
      items: [
        { id: 'ITEM12', name: 'Artisan Pizza', quantity: 2, price: 14.99 },
        { id: 'ITEM13', name: 'Caesar Salad', quantity: 1, price: 8.99 },
        { id: 'ITEM14', name: 'Sparkling Water', quantity: 2, price: 1.99 }
      ],
      total: 42.95,
      status: 'cancelled',
      refundStatus: 'processed',
      date: '2025-04-18T09:10:00',
      vendor: {
        id: 'V002',
        name: 'Urban Eats',
        rating: 4.6,
        location: { lat: 40.7748, lng: -74.0580, address: '600 Hudson St, New York, NY' },
        distance: '0.4 miles'
      },
      deliveryPerson: null,
      timeline: [
        { status: 'order_placed', time: '2025-04-18T09:10:00', note: 'Order placed successfully' },
        { status: 'order_confirmed', time: '2025-04-18T09:15:00', note: 'Order confirmed by vendor' },
        { status: 'cancelled', time: '2025-04-18T09:30:00', note: 'Order cancelled by customer' },
        { status: 'refund_initiated', time: '2025-04-18T09:35:00', note: 'Refund initiated' },
        { status: 'refund_processed', time: '2025-04-18T10:30:00', note: 'Refund processed successfully' }
      ],
      cancellationReason: 'Changed mind about order items'
    }
  ];
  
  // Filter orders based on active tab and search term
  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Function to get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock className="status-icon pending" />;
      case 'processing':
        return <RefreshCw className="status-icon processing" />;
      case 'out_for_delivery':
        return <Truck className="status-icon out-for-delivery" />;
      case 'delivered':
        return <CheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <XCircle className="status-icon cancelled" />;
      default:
        return <Clock className="status-icon" />;
    }
  };
  
  // Function to get formatted status text
  const getStatusText = (status) => {
    switch(status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  // Function to handle order assignment
  const assignOrder = (orderId) => {
    alert(`Order ${orderId} would be assigned to the highest rated vendor in the closest location.`);
    // In a real app, this would make an API call to assign the order
  };
  
  // Function to handle cancel order
  const cancelOrder = (orderId) => {
    const confirmed = window.confirm(`Are you sure you want to cancel order ${orderId}? This will initiate a refund process.`);
    if (confirmed) {
      alert(`Order ${orderId} has been cancelled and refund has been initiated.`);
      // In a real app, this would make an API call to cancel the order and initiate refund
    }
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
  
  // Render the detail view if an order is selected
  if (selectedOrder) {
    const order = orders.find(o => o.id === selectedOrder);
    
    return (
      <div className="order-management">
        <div className="order-detail-header">
          <button className="back-button" onClick={() => setSelectedOrder(null)}>
            &larr; Back to Orders
          </button>
          <h1>Order Details: {order.id}</h1>
          <div className="order-status-badge">
            {getStatusIcon(order.status)}
            <span>{getStatusText(order.status)}</span>
          </div>
        </div>
        
        <div className="order-detail-container">
          <div className="order-detail-card customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.customerLocation.address}</p>
            <p><strong>Order Date:</strong> {formatDate(order.date)}</p>
          </div>
          
          <div className="order-detail-card vendor-info">
            <h2>Vendor Information</h2>
            {order.vendor ? (
              <>
                <p><strong>Name:</strong> {order.vendor.name}</p>
                <p><strong>Rating:</strong> {order.vendor.rating} <Star size={14} className="star-icon" /></p>
                <p><strong>Address:</strong> {order.vendor.address}</p>
                <p><strong>Distance:</strong> {order.vendor.distance}</p>
              </>
            ) : (
              <div className="no-vendor">
                <p>No vendor assigned yet</p>
                <button className="assign-vendor-button" onClick={() => assignOrder(order.id)}>
                  Assign Vendor
                </button>
              </div>
            )}
          </div>
          
          <div className="order-detail-card delivery-info">
            <h2>Delivery Information</h2>
            {order.deliveryPerson ? (
              <>
                <p><strong>Delivery Person:</strong> {order.deliveryPerson.name}</p>
                <p><strong>Rating:</strong> {order.deliveryPerson.rating} <Star size={14} className="star-icon" /></p>
                {order.status === 'out_for_delivery' && (
                  <div className="tracking-link">
                    <button className="track-button">
                      Track Live Location
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>Delivery not assigned yet</p>
            )}
          </div>
          
          <div className="order-detail-card order-items">
            <h2>Order Items</h2>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>₹{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"><strong>Total</strong></td>
                  <td><strong>₹{order.total.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="order-detail-card order-timeline">
            <h2>Order Timeline</h2>
            <div className="timeline">
              {order.timeline.map((event, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3>{getStatusText(event.status)}</h3>
                    <p className="timeline-time">{formatDate(event.time)}</p>
                    <p className="timeline-note">{event.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <div className="order-actions">
              <button className="cancel-order-button" onClick={() => cancelOrder(order.id)}>
                Cancel Order & Initiate Refund
              </button>
            </div>
          )}
          
          {order.status === 'cancelled' && (
            <div className="refund-info order-detail-card">
              <h2>Refund Information</h2>
              <p><strong>Cancellation Reason:</strong> {order.cancellationReason}</p>
              <p><strong>Refund Status:</strong> {order.refundStatus === 'processed' ? 'Refund Processed' : 'Refund Pending'}</p>
              {order.timeline
                .filter(event => event.status.includes('refund'))
                .map((event, index) => (
                  <p key={index}><strong>{getStatusText(event.status)}:</strong> {formatDate(event.time)}</p>
                ))
              }
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Render the list view
  return (
    <div className="order-management">
      <h1>Order Management</h1>
      
      <div className="order-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            type="text"
            placeholder="Search orders by ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${activeTab === 'processing' ? 'active' : ''}`}
            onClick={() => setActiveTab('processing')}
          >
            Processing
          </button>
          <button 
            className={`filter-tab ${activeTab === 'out_for_delivery' ? 'active' : ''}`}
            onClick={() => setActiveTab('out_for_delivery')}
          >
            Out for Delivery
          </button>
          <button 
            className={`filter-tab ${activeTab === 'delivered' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-tab ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div className="order-id">
                  <Package className="order-icon" />
                  {order.id}
                </div>
                <div className={`order-status ${order.status}`}>
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </div>
              </div>
              
              <div className="order-card-body">
                <div className="order-info">
                  <div className="customer-details">
                    <p className="customer-name">{order.customerName}</p>
                    <p className="order-date">{formatDate(order.date)}</p>
                  </div>
                  
                  <div className="order-amount">
                    <p className="amount">₹{order.total.toFixed(2)}</p>
                    <p className="items-count">{order.items.length} items</p>
                  </div>
                </div>
                
                <div className="location-info">
                  <div className="location">
                    <MapPin className="location-icon" />
                    <span>{order.customerLocation.address}</span>
                  </div>
                  
                  {order.vendor && (
                    <div className="vendor-info">
                      <span className="vendor-name">{order.vendor.name}</span>
                      <div className="vendor-rating">
                        <Star className="rating-icon" />
                        <span>{order.vendor.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="order-card-footer">
                <button 
                  className="view-details-button"
                  onClick={() => setSelectedOrder(order.id)}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
                
                {order.status === 'pending' && !order.vendor && (
                  <button 
                    className="assign-vendor-button"
                    onClick={() => assignOrder(order.id)}
                  >
                    Assign Vendor
                  </button>
                )}
                
                {(order.status === 'pending' || order.status === 'processing') && (
                  <button 
                    className="cancel-order-button"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders-found">
            <p>No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
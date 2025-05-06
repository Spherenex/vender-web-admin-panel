


import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Filter, 
  Search,
  MapPin,
  Star,
  Trash2,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  RefreshCw,
  Utensils
} from 'lucide-react';
import { ref, onValue, update, get, remove  } from 'firebase/database';
import { db } from '../firebase/config';
import '../styles/OrderManagement.css';

const OrderManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected order
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // State for orders
  const [orders, setOrders] = useState([]);
  
  // State for loading
  const [loading, setLoading] = useState(true);
  
  // State for error
  const [error, setError] = useState('');

  // Map to store order ID mappings (Firebase ID -> Display ID)
  const [orderIdMap, setOrderIdMap] = useState({});

  // Function to fetch top active vendors from Firebase
  const fetchTopVendors = async (count = 3) => {
    try {
      const shopsRef = ref(db, 'shops');
      const snapshot = await get(shopsRef);
      const shopsData = snapshot.val();
      
      if (!shopsData) return [];
      
      // Convert to array and filter active shops
      const shopsArray = Object.keys(shopsData)
        .map(key => ({
          id: key,
          ...shopsData[key],
          location: shopsData[key].location || { address: 'Unknown', lat: 0, lng: 0 },
          distance: 'Unknown',
          specialties: shopsData[key].category ? [shopsData[key].category] : ['General'],
          isAvailable: shopsData[key].status === 'active'
        }))
        .filter(shop => shop.status === 'active');
      
      // Sort by rating (highest first)
      const sortedShops = shopsArray.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      // Get the top N available shops
      const topShops = sortedShops.slice(0, count);
      
      return topShops;
    } catch (error) {
      console.error('Error fetching top vendors:', error);
      return [];
    }
  };

  // Function to automatically assign a vendor to an order
  const autoAssignVendor = async (order) => {
    if (order.status !== 'pending' || order.vendor) {
      return order;
    }

    try {
      const topVendors = await fetchTopVendors(3);
      if (topVendors.length === 0) {
        console.warn('No active vendors available for order assignment');
        return order;
      }

      const selectedVendor = topVendors[Math.floor(Math.random() * topVendors.length)];
      
      const orderRef = ref(db, `orders/${order.id}`);
      
      const updatedTimeline = [
        ...order.timeline,
        {
          status: 'order_confirmed',
          time: new Date().toISOString(),
          note: `Order automatically assigned to ${selectedVendor.name}`
        },
        {
          status: 'processing',
          time: new Date().toISOString(),
          note: 'Order being prepared'
        }
      ];
      
      await update(orderRef, {
        vendor: selectedVendor,
        status: 'processing',
        timeline: updatedTimeline
      });
      
      console.log(`Order ${order.id} auto-assigned to ${selectedVendor.name}`);
      
      return {
        ...order,
        vendor: selectedVendor,
        status: 'processing',
        timeline: updatedTimeline
      };
    } catch (error) {
      console.error('Error auto-assigning vendor:', error);
      return order;
    }
  };

  // Function to automatically update order status based on time elapsed
  const autoUpdateOrderStatus = (order) => {
    if (!order.vendor || order.status === 'cancelled' || order.status === 'delivered') {
      return order;
    }

    const processingEvent = order.timeline.find(event => event.status === 'processing');
    if (!processingEvent) return order;

    const processingTime = new Date(processingEvent.time);
    const currentTime = new Date();
    const minutesElapsed = Math.floor((currentTime - processingTime) / (1000 * 60));
    
    const updatedTimeline = [...order.timeline];
    let statusChanged = false;
    
    if (minutesElapsed >= 15 && order.status === 'processing') {
      if (!updatedTimeline.find(event => event.status === 'prepared')) {
        updatedTimeline.push({
          status: 'prepared',
          time: new Date(processingTime.getTime() + 15 * 60 * 1000).toISOString(),
          note: 'Order prepared by vendor'
        });
      }
      
      if (!updatedTimeline.find(event => event.status === 'out_for_delivery')) {
        updatedTimeline.push({
          status: 'out_for_delivery',
          time: new Date(processingTime.getTime() + 16 * 60 * 1000).toISOString(),
          note: 'Order picked up by delivery person'
        });
        
        if (!order.deliveryPerson) {
          order.deliveryPerson = {
            id: 'D-AUTO',
            name: 'Auto Assigned Driver',
            rating: 4.8,
            currentLocation: { lat: 40.7128, lng: -74.0060 }
          };
        }
      }
      
      statusChanged = true;
      order.status = 'out_for_delivery';
    }
    
    if (minutesElapsed >= 40 && (order.status === 'processing' || order.status === 'out_for_delivery')) {
      if (!updatedTimeline.find(event => event.status === 'delivered')) {
        updatedTimeline.push({
          status: 'delivered',
          time: new Date(processingTime.getTime() + 40 * 60 * 1000).toISOString(),
          note: 'Order delivered successfully'
        });
      }
      
      statusChanged = true;
      order.status = 'delivered';
    }
    
    if (statusChanged) {
      const orderRef = ref(db, `orders/${order.id}`);
      update(orderRef, {
        status: order.status,
        timeline: updatedTimeline,
        deliveryPerson: order.deliveryPerson
      }).catch(err => console.error('Error updating order status:', err));
      
      return {
        ...order,
        timeline: updatedTimeline
      };
    }
    
    return order;
  };

  // Generate simplified order IDs for display
  const generateOrderIdMap = (orders) => {
    const idMap = {};
    orders.forEach((order, index) => {
      idMap[order.id] = `ORD-${index + 1}`;
    });
    setOrderIdMap(idMap);
  };

  // Fetch orders from Realtime Database in real-time
  useEffect(() => {
    const ordersRef = ref(db, 'orders');
    setLoading(true);
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const ordersData = data ? Object.keys(data).map(key => {
        const order = {
          id: key,
          ...data[key],
          timeline: data[key].timeline || [
            { 
              status: 'order_placed', 
              time: data[key].orderDate || new Date().toISOString(), // Fallback to current time
              note: 'Order placed successfully' 
            }
          ]
        };
        // Validate and clean timeline entries
        order.timeline = order.timeline.map(event => ({
          ...event,
          time: event.time || new Date().toISOString() // Ensure time is always defined
        }));
        return order;
      }) : [];
      
      setOrders(ordersData);
      generateOrderIdMap(ordersData);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auto-assign vendors and update order statuses
  useEffect(() => {
    if (orders.length === 0) return;
    
    const processOrders = async () => {
      let updatedOrders = [...orders];
      let hasChanges = false;
      
      for (let i = 0; i < updatedOrders.length; i++) {
        if (updatedOrders[i].status === 'pending' && !updatedOrders[i].vendor) {
          const updatedOrder = await autoAssignVendor(updatedOrders[i]);
          if (updatedOrder !== updatedOrders[i]) {
            updatedOrders[i] = updatedOrder;
            hasChanges = true;
          }
        }
      }
      
      updatedOrders = updatedOrders.map(order => {
        const updatedOrder = autoUpdateOrderStatus(order);
        if (updatedOrder !== order) hasChanges = true;
        return updatedOrder;
      });
      
      if (hasChanges) {
        setOrders(updatedOrders);
      }
    };
    
    processOrders();
    
    const interval = setInterval(processOrders, 60000);
    
    return () => clearInterval(interval);
  }, [orders]);

  // Delete order from Firebase
  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(`Are you sure you want to delete order ${orderIdMap[orderId] || orderId}? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      const orderRef = ref(db, `orders/${orderId}`);
      await remove(orderRef);
      alert(`Order ${orderIdMap[orderId] || orderId} has been deleted.`);
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Failed to delete order. Please try again.');
    }
  };

  // Filter orders based on active tab and search term
  const filteredOrders = orders.filter(order => {
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    if (searchTerm && 
        !(orderIdMap[order.id] || '').toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.customer?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="status-icon pending" />;
      case 'processing': return <RefreshCw className="status-icon processing" />;
      case 'prepared': return <Utensils className="status-icon prepared" />;
      case 'out_for_delivery': return <Truck className="status-icon out-for-delivery" />;
      case 'delivered': return <CheckCircle className="status-icon delivered" />;
      case 'cancelled': return <XCircle className="status-icon cancelled" />;
      default: return <Clock className="status-icon" />;
    }
  };

  // Status text formatting
  const getStatusText = (status) => {
    if (!status) return 'Unknown'; // Safeguard for undefined status
    switch(status) {
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'prepared': return 'Prepared';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      case 'order_placed': return 'Order Placed';
      case 'order_confirmed': return 'Order Confirmed';
      case 'refund_initiated': return 'Refund Initiated';
      case 'refund_processed': return 'Refund Processed';
      default: return status.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
  };

  // This function is for manually assigning an order
  const assignOrder = async (orderId) => {
    try {
      const topVendors = await fetchTopVendors(3);
      if (topVendors.length === 0) {
        alert('No active vendors available for assignment');
        return;
      }
      
      const selectedVendor = topVendors[Math.floor(Math.random() * topVendors.length)];

      const orderRef = ref(db, `orders/${orderId}`);
      await update(orderRef, {
        vendor: selectedVendor,
        status: 'processing',
        timeline: [
          ...orders.find(o => o.id === orderId).timeline,
          {
            status: 'order_confirmed',
            time: new Date().toISOString(),
            note: `Order assigned to ${selectedVendor.name}`
          },
          {
            status: 'processing',
            time: new Date().toISOString(),
            note: 'Order being prepared'
          }
        ]
      });
      alert(`Order ${orderIdMap[orderId] || orderId} assigned to ${selectedVendor.name}.`);
    } catch (err) {
      console.error('Error assigning order:', err);
      alert('Failed to assign order. Please try again.');
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm(`Are you sure you want to cancel order ${orderIdMap[orderId] || orderId}? This will initiate a refund process.`);
    if (!confirmed) return;

    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Order not found in state');
      }

      // Validate and clean timeline entries
      const cleanedTimeline = order.timeline.map(event => ({
        ...event,
        time: event.time || new Date().toISOString() // Ensure time is always defined
      }));

      const orderRef = ref(db, `orders/${orderId}`);
      await update(orderRef, {
        status: 'cancelled',
        refundStatus: 'initiated',
        cancellationReason: 'Cancelled by admin',
        timeline: [
          ...cleanedTimeline,
          {
            status: 'cancelled',
            time: new Date().toISOString(),
            note: 'Order cancelled by admin'
          },
          {
            status: 'refund_initiated',
            time: new Date().toISOString(),
            note: 'Refund initiated'
          }
        ]
      });
      alert(`Order ${orderIdMap[orderId] || orderId} has been cancelled and refund initiated.`);
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert(`Failed to cancel order: ${err.message}`);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Detail view for selected order
  if (selectedOrder) {
    const order = orders.find(o => o.id === selectedOrder);
    
    if (!order) return <div className="order-management">Order not found</div>;

    return (
      <div className="order-management">
        <div className="order-detail-header">
          <button className="back-button" onClick={() => setSelectedOrder(null)}>
            ← Back to Orders
          </button>
          <h1>Order Details: {orderIdMap[order.id] || order.id}</h1>
          <div className="order-status-badge">
            {getStatusIcon(order.status)}
            <span>{getStatusText(order.status)}</span>
          </div>
        </div>

        <div className="order-detail-container">
          <div className="order-detail-card customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {order.customer?.fullName}</p>
            <p><strong>Address:</strong> {`${order.customer?.address}, ${order.customer?.city}, ${order.customer?.pincode}`}</p>
            <p><strong>Email:</strong> {order.customer?.email}</p>
            <p><strong>Phone:</strong> {order.customer?.phone}</p>
            <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
          </div>

          <div className="order-detail-card vendor-info">
            <h2>Vendor Information</h2>
            {order.vendor ? (
              <>
                <p><strong>Name:</strong> {order.vendor.name}</p>
                <p><strong>Rating:</strong> {order.vendor.rating || 'N/A'} <Star size={14} className="star-icon" /></p>
                <p><strong>Address:</strong> {order.vendor.location?.address}</p>
                <p><strong>Distance:</strong> {order.vendor.distance}</p>
              </>
            ) : (
              <div className="no-vendor">
                <p>No vendor assigned yet. Auto-assignment in progress...</p>
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
                {order.items?.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.quantity * item.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"><strong>Subtotal</strong></td>
                  <td><strong>{formatCurrency(order.subtotal)}</strong></td>
                </tr>
                <tr>
                  <td colSpan="3"><strong>Delivery Fee</strong></td>
                  <td><strong>{formatCurrency(order.deliveryCharge)}</strong></td>
                </tr>
                <tr>
                  <td colSpan="3"><strong>Tax</strong></td>
                  <td><strong>{formatCurrency(order.tax)}</strong></td>
                </tr>
                <tr>
                  <td colSpan="3"><strong>Total</strong></td>
                  <td><strong>{formatCurrency(order.totalAmount)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="order-detail-card order-timeline">
            <h2>Order Timeline</h2>
            <div className="timeline">
              {order.timeline?.map((event, index) => (
                event.status ? (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3>{getStatusText(event.status)}</h3>
                      <p className="timeline-time">{formatDate(event.time)}</p>
                      <p className="timeline-note">{event.note}</p>
                    </div>
                  </div>
                ) : (
                  console.warn(`Invalid timeline event at index ${index} for order ${order.id}:`, event) || null
                )
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
              <p><strong>Cancellation Reason:</strong> {order.cancellationReason || 'Not specified'}</p>
              <p><strong>Refund Status:</strong> {order.refundStatus === 'processed' ? 'Refund Processed' : 'Refund Pending'}</p>
              {order.timeline
                .filter(event => event.status && event.status.includes('refund'))
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

  // Main orders table view
  return (
    <div className="order-management">
      <h1>Order Management</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading orders...</div>}

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
          {/* <button 
            className={`filter-tab ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button> */}
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Index</th> {/* Added Index column */}
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Vendor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order.id} className={`order-row ${order.status}`}>
                  <td>{index}</td> {/* Display the 0-based index */}
                  <td className="order-id-cell">
                    <div className="order-id-with-status">
                      <Package className="order-icon" />
                      <span className="order-id-text">{orderIdMap[order.id] || order.id}</span>
                      <div className={`order-status-indicator ${order.status}`}>
                        {getStatusIcon(order.status)}
                        <span className="status-text">{getStatusText(order.status)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="customer-cell">
                    <div className="customer-name">{order.customer?.fullName}</div>
                  </td>
                  <td className="date-cell">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="amount-cell">
                    <div className="order-amount">{formatCurrency(order.totalAmount)}</div>
                    <div className="items-count">{order.items?.length} items</div>
                  </td>
                  <td className="address-cell">
                    <div className="location">
                      <MapPin className="location-icon" />
                      <span className="address-text">{`${order.customer?.address}, ${order.customer?.city}`}</span>
                    </div>
                  </td>
                  <td className="vendor-cell">
                    {order.vendor ? (
                      <div className="vendor-info">
                        <div className="vendor-name">{order.vendor.name}</div>
                        <div className="vendor-rating">
                          <Star className="rating-icon" />
                          <span>{order.vendor.rating || 'N/A'}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="no-vendor-text">Auto-assigning...</span>
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="order-actions-container">
                      <button 
                        className="view-details-button"
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        View Details
                      </button>
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button 
                          className="cancel-order-button"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      )}
                      <button 
                        className="delete-order-button"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders-found">
          <p>{loading ? 'Loading...' : 'No orders found matching your criteria.'}</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
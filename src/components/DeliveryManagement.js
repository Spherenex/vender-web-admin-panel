

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  User, 
  Clock, 
  Package,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Phone
} from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import '../styles/DeliveryManagement.css';

const DeliveryManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderIdMap, setOrderIdMap] = useState({}); // Added state for order ID mapping

  // Function to generate simplified order IDs for display
  const generateOrderIdMap = (orders) => {
    const idMap = {};
    orders.forEach((order, index) => {
      idMap[order.id] = `ORD-${index + 1}`; // e.g., ORD-1, ORD-2
    });
    setOrderIdMap(idMap);
  };

  // Fetch orders from Firebase and transform into deliveries
  useEffect(() => {
    const ordersRef = ref(db, 'orders');
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const ordersData = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          timeline: data[key].timeline || [
            { status: 'order_placed', time: data[key].orderDate || new Date().toISOString(), note: 'Order placed successfully' }
          ]
        })) : [];

        // Generate order ID mapping
        generateOrderIdMap(ordersData);

        // Transform orders into deliveries
        const transformedDeliveries = ordersData
          .filter(order => {
            if (order.status === 'pending') return false;
            if (!order.customer || !order.customer.fullName) {
              console.warn(`Skipping order ${order.id}: Missing customer data`, order);
              return false;
            }
            return true;
          })
          .map(order => {
            let deliveryStatus;
            if (order.status === 'cancelled') {
              deliveryStatus = 'failed';
            } else if (order.status === 'delivered') {
              deliveryStatus = 'delivered';
            } else if (order.status === 'out_for_delivery') {
              deliveryStatus = 'in_progress';
            } else if (order.status === 'processing' || order.status === 'prepared') {
              deliveryStatus = 'assigned';
            } else {
              deliveryStatus = 'pending';
            }

            const assignedTime = order.timeline.find(event => event.status === 'order_confirmed')?.time || order.orderDate;
            const pickedUpTime = order.timeline.find(event => event.status === 'out_for_delivery')?.time;
            const deliveredTime = order.timeline.find(event => event.status === 'delivered')?.time;

            const route = order.vendor ? {
              distance: order.vendor.distance || '1.0 miles',
              estimatedTime: `${Math.round(parseFloat(order.vendor.distance || 1) * 10)} minutes`
            } : null;

            return {
              id: `DEL-${order.id}`,
              orderId: order.id,
              displayOrderId: orderIdMap[order.id] || `ORD-${ordersData.findIndex(o => o.id === order.id) + 1}`, // Fallback in case map isn't ready
              customerName: order.customer.fullName,
              customerAddress: `${order.customer.address || 'N/A'}, ${order.customer.city || 'N/A'}, ${order.customer.pincode || 'N/A'}`,
              customerPhone: order.customer.phone || 'Not provided',
              shopName: order.vendor?.name || null,
              shopAddress: order.vendor?.location?.address || null,
              items: order.items?.length || 0,
              status: deliveryStatus,
              deliveryPerson: order.deliveryPerson || null,
              timestamps: {
                assigned: assignedTime,
                pickedUp: pickedUpTime,
                delivered: deliveredTime
              },
              deliveryNotes: 'Contact customer upon arrival',
              route: route,
              failureReason: order.status === 'cancelled' ? order.cancellationReason || 'Order cancelled' : null
            };
          });

        setDeliveries(transformedDeliveries);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deliveries:', err);
        setError('Failed to load deliveries.');
        setDeliveries([]);
        setLoading(false);
      }
    }, (err) => {
      console.error('Error fetching deliveries:', err);
      setError('Failed to load deliveries.');
      setDeliveries([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter deliveries based on active tab and search term
  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab !== 'all' && delivery.status !== activeTab) {
      return false;
    }
    if (searchTerm && 
        !delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !delivery.displayOrderId.toLowerCase().includes(searchTerm.toLowerCase()) && // Updated to use displayOrderId
        !delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not yet';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending Assignment';
      case 'assigned': return 'Assigned';
      case 'in_progress': return 'In Progress';
      case 'delivered': return 'Delivered';
      case 'failed': return 'Delivery Failed';
      default: return status;
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="status-icon pending" />;
      case 'assigned': return <User className="status-icon assigned" />;
      case 'in_progress': return <Truck className="status-icon in-progress" />;
      case 'delivered': return <CheckCircle className="status-icon delivered" />;
      case 'failed': return <AlertTriangle className="status-icon failed" />;
      default: return <Clock className="status-icon" />;
    }
  };

  // Function to assign delivery person
  const assignDeliveryPerson = (deliveryId) => {
    alert(`Delivery ${deliveryId} would be assigned to the closest available delivery person.`);
    // In a real app, this would update the Firebase database
  };

  // If a delivery is selected, show detailed view
  if (selectedDelivery) {
    const delivery = deliveries.find(d => d.id === selectedDelivery);
    if (!delivery) return <div className="delivery-management">Delivery not found</div>;

    return (
      <div className="delivery-management">
        <div className="delivery-detail-header">
          <button className="back-button" onClick={() => setSelectedDelivery(null)}>
            ← Back to Deliveries
          </button>
          <h1>Delivery Details: {delivery.id}</h1>
          <div className={`delivery-status ${delivery.status}`}>
            {getStatusIcon(delivery.status)}
            <span>{getStatusText(delivery.status)}</span>
          </div>
        </div>
        
        <div className="delivery-detail-grid">
          <div className="delivery-detail-card order-info">
            <h2>Order Information</h2>
            <p><strong>Order ID:</strong> {orderIdMap[delivery.orderId] || delivery.displayOrderId}</p>
            <p><strong>Shop:</strong> {delivery.shopName || 'Not assigned yet'}</p>
            <p><strong>Shop Address:</strong> {delivery.shopAddress || 'Not available'}</p>
            <p><strong>Items:</strong> {delivery.items}</p>
          </div>
          
          <div className="delivery-detail-card customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {delivery.customerName}</p>
            <p><strong>Address:</strong> {delivery.customerAddress}</p>
            <p><strong>Phone:</strong> {delivery.customerPhone}</p>
            <p><strong>Delivery Notes:</strong> {delivery.deliveryNotes}</p>
          </div>
          
          <div className="delivery-detail-card delivery-person">
            <h2>Delivery Person</h2>
            {delivery.deliveryPerson ? (
              <>
                <div className="delivery-person-header">
                  <div className="delivery-person-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="delivery-person-info">
                    <h3>{delivery.deliveryPerson.name}</h3>
                    <div className="delivery-person-rating">
                      <span className="rating-value">{delivery.deliveryPerson.rating}</span>
                      <span className="rating-text">rating</span>
                    </div>
                  </div>
                  <a href={`tel:${delivery.deliveryPerson.phone}`} className="call-button">
                    <Phone size={16} />
                    Call
                  </a>
                </div>
                <div className="delivery-person-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Deliveries</span>
                    <span className="stat-value">{delivery.deliveryPerson.totalDeliveries || 'N/A'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Phone</span>
                    <span className="stat-value">{delivery.deliveryPerson.phone || 'Not provided'}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-delivery-person">
                <p>No delivery person assigned yet</p>
                <button 
                  className="assign-person-button"
                  onClick={() => assignDeliveryPerson(delivery.id)}
                >
                  Assign Delivery Person
                </button>
              </div>
            )}
          </div>
          
          <div className="delivery-detail-card delivery-route">
            <h2>Delivery Route</h2>
            {delivery.route ? (
              <>
                <div className="route-info">
                  <div className="route-stat">
                    <span className="route-label">Distance</span>
                    <span className="route-value">{delivery.route.distance}</span>
                  </div>
                  <div className="route-stat">
                    <span className="route-label">Est. Delivery Time</span>
                    <span className="route-value">{delivery.route.estimatedTime}</span>
                  </div>
                </div>
                <div className="route-map-placeholder">
                  <MapPin className="map-pin-icon" />
                  <span>Map would be displayed here</span>
                </div>
                {delivery.status === 'in_progress' && (
                  <button className="track-live-button">
                    Track Live Location
                  </button>
                )}
              </>
            ) : (
              <p>Route will be available once delivery is assigned</p>
            )}
          </div>
          
          <div className="delivery-detail-card delivery-timeline">
            <h2>Delivery Timeline</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Assigned to Delivery Person</h3>
                  <p>{formatDate(delivery.timestamps.assigned)}</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Picked Up from Shop</h3>
                  <p>{formatDate(delivery.timestamps.pickedUp)}</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Delivered to Customer</h3>
                  <p>{formatDate(delivery.timestamps.delivered)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {delivery.status === 'failed' && (
            <div className="delivery-detail-card failure-info">
              <h2>Delivery Failure Information</h2>
              <div className="failure-reason">
                <AlertTriangle className="failure-icon" />
                <p>{delivery.failureReason}</p>
              </div>
              <div className="failure-actions">
                <button className="reschedule-button">
                  Reschedule Delivery
                </button>
                <button className="cancel-delivery-button">
                  Cancel Order & Initiate Refund
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-management">
      <h1>Delivery Management</h1>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading deliveries...</div>}
      
      <div className="delivery-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            type="text"
            placeholder="Search by delivery ID, order ID, or customer name..."
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
            All Deliveries
          </button>
          <button 
            className={`filter-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${activeTab === 'assigned' ? 'active' : ''}`}
            onClick={() => setActiveTab('assigned')}
          >
            Assigned
          </button>
          <button 
            className={`filter-tab ${activeTab === 'in_progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in_progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-tab ${activeTab === 'delivered' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-tab ${activeTab === 'failed' ? 'active' : ''}`}
            onClick={() => setActiveTab('failed')}
          >
            Failed
          </button>
        </div>
      </div>
      
      <div className="deliveries-list">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map(delivery => (
            <div className={`delivery-card ${delivery.status}`} key={delivery.id}>
              <div className="delivery-card-header">
                <div className="delivery-id">
                  <Truck className="delivery-icon" />
                  {delivery.id}
                </div>
                <div className={`delivery-status ${delivery.status}`}>
                  {getStatusIcon(delivery.status)}
                  {getStatusText(delivery.status)}
                </div>
              </div>
              
              <div className="delivery-card-content">
                <div className="delivery-summary">
                  <div className="order-info">
                    <span className="label">Order ID:</span>
                    <span className="value">{orderIdMap[delivery.orderId] || delivery.displayOrderId}</span>
                  </div>
                  <div className="customer-info">
                    <span className="label">Customer:</span>
                    <span className="value">{delivery.customerName}</span>
                  </div>
                </div>
                
                <div className="location-info">
                  <div className="pickup-location">
                    <div className="location-marker pickup"></div>
                    <div className="location-details">
                      <span className="location-type">Pickup</span>
                      <span className="location-name">{delivery.shopName || 'Not assigned'}</span>
                      <span className="location-address">{delivery.shopAddress || 'Not available'}</span>
                    </div>
                  </div>
                  <div className="location-divider"></div>
                  <div className="dropoff-location">
                    <div className="location-marker dropoff"></div>
                    <div className="location-details">
                      <span className="location-type">Dropoff</span>
                      <span className="location-name">{delivery.customerName}</span>
                      <span className="location-address">{delivery.customerAddress}</span>
                    </div>
                  </div>
                </div>
                
                <div className="delivery-info">
                  {delivery.deliveryPerson ? (
                    <div className="delivery-person-brief">
                      <User className="person-icon" />
                      <div className="person-details">
                        <span className="person-name">{delivery.deliveryPerson.name}</span>
                        <span className="person-rating">{delivery.deliveryPerson.rating} ★</span>
                      </div>
                    </div>
                  ) : (
                    <div className="no-person">No delivery person assigned</div>
                  )}
                  
                  {delivery.route && (
                    <div className="route-brief">
                      <div className="route-distance">
                        <span className="label">Distance:</span>
                        <span className="value">{delivery.route.distance}</span>
                      </div>
                      <div className="estimated-time">
                        <span className="label">Est. Time:</span>
                        <span className="value">{delivery.route.estimatedTime}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="delivery-card-footer">
                <button 
                  className="view-details-button"
                  onClick={() => setSelectedDelivery(delivery.id)}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
                
                {delivery.status === 'pending' && (
                  <button 
                    className="assign-delivery-button"
                    onClick={() => assignDeliveryPerson(delivery.id)}
                  >
                    Assign Delivery Person
                  </button>
                )}
                
                {delivery.status === 'in_progress' && (
                  <button className="track-button">
                    Live Tracking
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-deliveries-found">
            <p>{loading ? 'Loading...' : 'No deliveries found matching your criteria.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;
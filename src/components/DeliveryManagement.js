import React, { useState } from 'react';
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
import '../styles/DeliveryManagement.css'; // Import your CSS file for styling

const DeliveryManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected delivery
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  
  // Mock data for deliveries
  const deliveries = [
    {
      id: 'DEL-12345',
      orderId: 'ORD-12345',
      customerName: 'John Smith',
      customerAddress: '123 Broadway, New York, NY',
      customerPhone: '+1 (555) 123-4567',
      shopName: 'Fresh Foods Market',
      shopAddress: '230 Broadway, New York, NY',
      items: 3,
      status: 'delivered',
      deliveryPerson: {
        id: 'D001',
        name: 'Mike Johnson',
        phone: '+1 (555) 987-6543',
        rating: 4.8,
        totalDeliveries: 587
      },
      timestamps: {
        assigned: '2025-04-17T14:40:00',
        pickedUp: '2025-04-17T15:00:00',
        delivered: '2025-04-17T15:30:00'
      },
      deliveryNotes: 'Leave at door, no contact delivery',
      route: {
        distance: '2.3 miles',
        estimatedTime: '15 minutes'
      }
    },
    {
      id: 'DEL-12346',
      orderId: 'ORD-12346',
      customerName: 'Emma Davis',
      customerAddress: '456 Park Ave, New York, NY',
      customerPhone: '+1 (555) 234-5678',
      shopName: 'Urban Eats',
      shopAddress: '500 Park Ave, New York, NY',
      items: 3,
      status: 'in_progress',
      deliveryPerson: {
        id: 'D002',
        name: 'Sarah Wilson',
        phone: '+1 (555) 876-5432',
        rating: 4.9,
        totalDeliveries: 435
      },
      timestamps: {
        assigned: '2025-04-18T10:30:00',
        pickedUp: '2025-04-18T10:45:00',
        delivered: null
      },
      deliveryNotes: 'Call customer upon arrival',
      route: {
        distance: '1.7 miles',
        estimatedTime: '12 minutes'
      }
    },
    {
      id: 'DEL-12347',
      orderId: 'ORD-12347',
      customerName: 'Michael Brown',
      customerAddress: '789 5th Ave, New York, NY',
      customerPhone: '+1 (555) 345-6789',
      shopName: 'Fresh Foods Market',
      shopAddress: '800 5th Ave, New York, NY',
      items: 3,
      status: 'assigned',
      deliveryPerson: {
        id: 'D003',
        name: 'Alex Rodriguez',
        phone: '+1 (555) 765-4321',
        rating: 4.7,
        totalDeliveries: 321
      },
      timestamps: {
        assigned: '2025-04-18T12:00:00',
        pickedUp: null,
        delivered: null
      },
      deliveryNotes: 'Deliver to doorman',
      route: {
        distance: '0.8 miles',
        estimatedTime: '8 minutes'
      }
    },
    {
      id: 'DEL-12348',
      orderId: 'ORD-12349',
      customerName: 'Robert Taylor',
      customerAddress: '555 Hudson St, New York, NY',
      customerPhone: '+1 (555) 456-7890',
      shopName: 'Urban Eats',
      shopAddress: '600 Hudson St, New York, NY',
      items: 3,
      status: 'failed',
      deliveryPerson: {
        id: 'D004',
        name: 'Jessica Lee',
        phone: '+1 (555) 654-3210',
        rating: 4.6,
        totalDeliveries: 274
      },
      timestamps: {
        assigned: '2025-04-18T09:15:00',
        pickedUp: '2025-04-18T09:25:00',
        delivered: null
      },
      deliveryNotes: 'Building with doorman',
      failureReason: 'Customer not available after multiple attempts',
      route: {
        distance: '1.2 miles',
        estimatedTime: '10 minutes'
      }
    },
    {
      id: 'DEL-12349',
      orderId: 'ORD-12348',
      customerName: 'Lisa Johnson',
      customerAddress: '321 West St, New York, NY',
      customerPhone: '+1 (555) 567-8901',
      shopName: null, // Not assigned to a shop yet
      shopAddress: null,
      items: 3,
      status: 'pending',
      deliveryPerson: null, // Not assigned to a delivery person yet
      timestamps: {
        assigned: null,
        pickedUp: null,
        delivered: null
      },
      deliveryNotes: 'Apartment 5B, buzz 5B for entry',
      route: null // No route yet
    }
  ];
  
  // Filter deliveries based on active tab and search term
  const filteredDeliveries = deliveries.filter(delivery => {
    // Filter by status
    if (activeTab !== 'all' && delivery.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
      case 'pending':
        return 'Pending Assignment';
      case 'assigned':
        return 'Assigned';
      case 'in_progress':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
      case 'failed':
        return 'Delivery Failed';
      default:
        return status;
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock className="status-icon pending" />;
      case 'assigned':
        return <User className="status-icon assigned" />;
      case 'in_progress':
        return <Truck className="status-icon in-progress" />;
      case 'delivered':
        return <CheckCircle className="status-icon delivered" />;
      case 'failed':
        return <AlertTriangle className="status-icon failed" />;
      default:
        return <Clock className="status-icon" />;
    }
  };
  
  // Function to assign delivery person
  const assignDeliveryPerson = (deliveryId) => {
    alert(`Delivery ${deliveryId} would be assigned to the closest available delivery person.`);
    // In a real app, this would make an API call to assign the delivery
  };
  
  // If a delivery is selected, show detailed view
  if (selectedDelivery) {
    const delivery = deliveries.find(d => d.id === selectedDelivery);
    
    return (
      <div className="delivery-management">
        <div className="delivery-detail-header">
          <button className="back-button" onClick={() => setSelectedDelivery(null)}>
            &larr; Back to Deliveries
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
            <p><strong>Order ID:</strong> {delivery.orderId}</p>
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
                    <span className="stat-value">{delivery.deliveryPerson.totalDeliveries}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Phone</span>
                    <span className="stat-value">{delivery.deliveryPerson.phone}</span>
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
  
  // Render the list view
  return (
    <div className="delivery-management">
      <h1>Delivery Management</h1>
      
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
                    <span className="value">{delivery.orderId}</span>
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
            <p>No deliveries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;
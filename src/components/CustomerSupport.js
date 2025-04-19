import React, { useState } from 'react';
import { 
  MessageSquare, 
  User, 
  Search, 
  Filter,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  Send,
  Paperclip,
  Package,
  ArrowRight
} from 'lucide-react';
import '../styles/CustomerSupport.css'; // Import your CSS file for styling

const CustomerSupport = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected ticket
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Mock data for support tickets
  const tickets = [
    {
      id: 'TKT-12345',
      subject: 'Order not delivered on time',
      status: 'open',
      priority: 'high',
      category: 'delivery',
      createdAt: '2025-04-17T10:30:00',
      updatedAt: '2025-04-18T14:20:00',
      customer: {
        id: 'C001',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567'
      },
      order: {
        id: 'ORD-12345',
        date: '2025-04-16T15:00:00',
        items: 3,
        total: 56.80
      },
      assignedTo: {
        id: 'A001',
        name: 'Alex Johnson',
        avatar: null
      },
      messages: [
        {
          id: 'MSG-12345-1',
          sender: 'customer',
          content: 'My order was supposed to be delivered yesterday but I still have not received it. Can you check what is happening?',
          timestamp: '2025-04-17T10:30:00',
          attachments: []
        },
        {
          id: 'MSG-12345-2',
          sender: 'support',
          content: 'I apologize for the inconvenience. Let me check the status of your order right away. I can see your order has been delayed due to high volume. I will contact the delivery team and get back to you as soon as possible.',
          timestamp: '2025-04-17T10:45:00',
          attachments: []
        },
        {
          id: 'MSG-12345-3',
          sender: 'support',
          content: 'I have spoken with the delivery team and they have assured me your order will be delivered today before 5 PM. I will make sure to follow up on this. Please let me know if you do not receive it by then.',
          timestamp: '2025-04-17T11:10:00',
          attachments: []
        },
        {
          id: 'MSG-12345-4',
          sender: 'customer',
          content: 'Thank you for looking into this. I will wait until 5 PM today.',
          timestamp: '2025-04-17T11:15:00',
          attachments: []
        },
        {
          id: 'MSG-12345-5',
          sender: 'system',
          content: 'Order has been marked as delivered.',
          timestamp: '2025-04-17T16:30:00',
          attachments: []
        },
        {
          id: 'MSG-12345-6',
          sender: 'support',
          content: 'I can see that your order has been delivered. I hope everything is to your satisfaction. Is there anything else I can help you with?',
          timestamp: '2025-04-18T09:00:00',
          attachments: []
        },
        {
          id: 'MSG-12345-7',
          sender: 'customer',
          content: 'Yes, I received the order but one of the items is damaged. Can I get a replacement or refund for that item?',
          timestamp: '2025-04-18T14:20:00',
          attachments: [
            { id: 'ATT-1', name: 'damaged_item.jpg', type: 'image/jpeg', size: '1.2 MB' }
          ]
        }
      ]
    },
    {
      id: 'TKT-12346',
      subject: 'Refund request for order #ORD-12349',
      status: 'closed',
      priority: 'medium',
      category: 'refund',
      createdAt: '2025-04-18T09:15:00',
      updatedAt: '2025-04-18T11:30:00',
      customer: {
        id: 'C004',
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        phone: '+1 (555) 456-7890'
      },
      order: {
        id: 'ORD-12349',
        date: '2025-04-18T08:30:00',
        items: 3,
        total: 42.95
      },
      assignedTo: {
        id: 'A002',
        name: 'Sarah Williams',
        avatar: null
      },
      messages: [
        {
          id: 'MSG-12346-1',
          sender: 'customer',
          content: 'I need to cancel my order and get a refund because I changed my mind about the items. Is this possible?',
          timestamp: '2025-04-18T09:15:00',
          attachments: []
        },
        {
          id: 'MSG-12346-2',
          sender: 'support',
          content: 'Hello Robert, thank you for reaching out. Yes, we can process a refund for your order since it is within our 1-hour cancellation window. I will initiate the refund process immediately.',
          timestamp: '2025-04-18T09:25:00',
          attachments: []
        },
        {
          id: 'MSG-12346-3',
          sender: 'system',
          content: 'Refund for order #ORD-12349 has been initiated.',
          timestamp: '2025-04-18T09:30:00',
          attachments: []
        },
        {
          id: 'MSG-12346-4',
          sender: 'support',
          content: 'I have initiated the refund for your order. It should be processed within 3-5 business days, depending on your payment method. Is there anything else I can assist you with?',
          timestamp: '2025-04-18T09:35:00',
          attachments: []
        },
        {
          id: 'MSG-12346-5',
          sender: 'customer',
          content: 'No, that is all. Thank you for your quick help!',
          timestamp: '2025-04-18T09:40:00',
          attachments: []
        },
        {
          id: 'MSG-12346-6',
          sender: 'system',
          content: 'Refund for order #ORD-12349 has been processed successfully.',
          timestamp: '2025-04-18T10:30:00',
          attachments: []
        },
        {
          id: 'MSG-12346-7',
          sender: 'support',
          content: 'Great news! Your refund has been processed successfully. The amount should appear in your account soon. Thank you for your patience and understanding. Is there anything else I can help you with?',
          timestamp: '2025-04-18T10:35:00',
          attachments: []
        },
        {
          id: 'MSG-12346-8',
          sender: 'customer',
          content: 'That was fast! No further questions, thank you.',
          timestamp: '2025-04-18T11:30:00',
          attachments: []
        }
      ]
    },
    {
      id: 'TKT-12347',
      subject: 'Question about dietary restrictions',
      status: 'pending',
      priority: 'low',
      category: 'product',
      createdAt: '2025-04-18T12:10:00',
      updatedAt: '2025-04-18T12:10:00',
      customer: {
        id: 'C003',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1 (555) 345-6789'
      },
      order: null,
      assignedTo: null,
      messages: [
        {
          id: 'MSG-12347-1',
          sender: 'customer',
          content: 'I have a severe nut allergy. Can you tell me which of your products are completely nut-free? Specifically, I am interested in your bakery items.',
          timestamp: '2025-04-18T12:10:00',
          attachments: []
        }
      ]
    },
    {
      id: 'TKT-12348',
      subject: 'Payment failed for order #ORD-12348',
      status: 'open',
      priority: 'high',
      category: 'payment',
      createdAt: '2025-04-18T13:25:00',
      updatedAt: '2025-04-18T13:45:00',
      customer: {
        id: 'C005',
        name: 'Lisa Johnson',
        email: 'lisa.johnson@example.com',
        phone: '+1 (555) 567-8901'
      },
      order: {
        id: 'ORD-12348',
        date: '2025-04-18T13:20:00',
        items: 3,
        total: 21.45
      },
      assignedTo: {
        id: 'A001',
        name: 'Alex Johnson',
        avatar: null
      },
      messages: [
        {
          id: 'MSG-12348-1',
          sender: 'system',
          content: 'Payment failed for order #ORD-12348. Reason: Card payment declined by issuer.',
          timestamp: '2025-04-18T13:25:00',
          attachments: []
        },
        {
          id: 'MSG-12348-2',
          sender: 'support',
          content: 'Hello Lisa, I noticed that the payment for your recent order failed. The message from your bank states that the card was declined. Would you like to try a different payment method?',
          timestamp: '2025-04-18T13:35:00',
          attachments: []
        },
        {
          id: 'MSG-12348-3',
          sender: 'customer',
          content: 'Oh, I did not realize that. Let me check with my bank first and I will get back to you.',
          timestamp: '2025-04-18T13:45:00',
          attachments: []
        }
      ]
    }
  ];
  
  // Filter tickets based on active tab and search term
  const filteredTickets = tickets.filter(ticket => {
    // Filter by status
    if (activeTab !== 'all' && ticket.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      // Check ticket ID
      if (ticket.id.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check subject
      if (ticket.subject.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check customer name
      if (ticket.customer.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check order ID
      if (ticket.order && ticket.order.id.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      return false;
    }
    
    return true;
  });
  
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
  
  // Function to get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'open':
        return (
          <span className="status-badge open">
            <Clock size={14} />
            Open
          </span>
        );
      case 'pending':
        return (
          <span className="status-badge pending">
            <Clock size={14} />
            Pending
          </span>
        );
      case 'closed':
        return (
          <span className="status-badge closed">
            <CheckCircle size={14} />
            Closed
          </span>
        );
      default:
        return (
          <span className="status-badge">{status}</span>
        );
    }
  };
  
  // Function to get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return (
          <span className="priority-badge high">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="priority-badge medium">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="priority-badge low">
            Low
          </span>
        );
      default:
        return (
          <span className="priority-badge">{priority}</span>
        );
    }
  };
  
  // Function to get category badge
  const getCategoryBadge = (category) => {
    switch(category) {
      case 'delivery':
        return (
          <span className="category-badge delivery">
            Delivery
          </span>
        );
      case 'refund':
        return (
          <span className="category-badge refund">
            Refund
          </span>
        );
      case 'product':
        return (
          <span className="category-badge product">
            Product
          </span>
        );
      case 'payment':
        return (
          <span className="category-badge payment">
            Payment
          </span>
        );
      default:
        return (
          <span className="category-badge">{category}</span>
        );
    }
  };
  
  // Function to handle assignment
  const handleAssign = (ticketId) => {
    alert(`Assigning ticket ${ticketId} to a support agent.`);
    // In a real app, this would open a modal to select an agent
  };
  
  // State for new message in ticket details
  const [newMessage, setNewMessage] = useState('');
  
  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    alert(`Sending message: ${newMessage}`);
    setNewMessage('');
    // In a real app, this would call an API to send the message
  };
  
  // If a ticket is selected, show detailed view
  if (selectedTicket) {
    const ticket = tickets.find(t => t.id === selectedTicket);
    
    return (
      <div className="customer-support">
        <div className="ticket-detail-header">
          <button className="back-button" onClick={() => setSelectedTicket(null)}>
            &larr; Back to Tickets
          </button>
          <h1>{ticket.subject}</h1>
          <div className="ticket-badges">
            {getStatusBadge(ticket.status)}
            {getPriorityBadge(ticket.priority)}
            {getCategoryBadge(ticket.category)}
          </div>
        </div>
        
        <div className="ticket-detail-container">
          <div className="ticket-info-sidebar">
            <div className="info-section">
              <h3>Ticket Information</h3>
              <div className="info-item">
                <span className="info-label">Ticket ID</span>
                <span className="info-value">{ticket.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Created</span>
                <span className="info-value">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Updated</span>
                <span className="info-value">{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3>Customer Information</h3>
              <div className="customer-profile">
                <div className="profile-avatar">
                  <User className="avatar-icon" />
                </div>
                <div className="profile-details">
                  <h4>{ticket.customer.name}</h4>
                  <div className="contact-info">
                    <a href={`mailto:${ticket.customer.email}`} className="contact-item">
                      <Mail size={14} />
                      {ticket.customer.email}
                    </a>
                    <a href={`tel:${ticket.customer.phone}`} className="contact-item">
                      <Phone size={14} />
                      {ticket.customer.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {ticket.order && (
              <div className="info-section">
                <h3>Order Information</h3>
                <div className="order-info">
                  <div className="info-item">
                    <span className="info-label">Order ID</span>
                    <span className="info-value">{ticket.order.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date</span>
                    <span className="info-value">{formatDate(ticket.order.date)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Items</span>
                    <span className="info-value">{ticket.order.items}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total</span>
                    <span className="info-value">${ticket.order.total.toFixed(2)}</span>
                  </div>
                  <button className="view-order-button">
                    <Package size={14} />
                    View Order Details
                  </button>
                </div>
              </div>
            )}
            
            <div className="info-section">
              <h3>Assigned Agent</h3>
              {ticket.assignedTo ? (
                <div className="agent-info">
                  <div className="agent-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="agent-details">
                    <h4>{ticket.assignedTo.name}</h4>
                    <button className="reassign-button">
                      Reassign
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-agent">
                  <p>No agent assigned</p>
                  <button 
                    className="assign-button"
                    onClick={() => handleAssign(ticket.id)}
                  >
                    Assign Agent
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="conversation-container">
            <div className="conversation-header">
              <h2>Conversation</h2>
              <div className="conversation-actions">
                <button className="action-button">
                  Add Note
                </button>
                <button className="action-button">
                  Forward
                </button>
                <button className="action-button">
                  Print
                </button>
              </div>
            </div>
            
            <div className="messages-container">
              {ticket.messages.map(message => (
                <div 
                  className={`message ${message.sender}`} 
                  key={message.id}
                >
                  <div className="message-header">
                    <span className="sender-name">
                      {message.sender === 'customer' ? ticket.customer.name :
                       message.sender === 'support' ? (ticket.assignedTo ? ticket.assignedTo.name : 'Support Agent') :
                       'System'}
                    </span>
                    <span className="message-time">{formatDate(message.timestamp)}</span>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="attachments">
                      {message.attachments.map(attachment => (
                        <div className="attachment" key={attachment.id}>
                          <Paperclip size={14} />
                          <span className="attachment-name">{attachment.name}</span>
                          <span className="attachment-size">({attachment.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="reply-container">
              <textarea
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="reply-input"
              ></textarea>
              <div className="reply-actions">
                <button className="attach-button">
                  <Paperclip size={18} />
                  Attach File
                </button>
                <button 
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render the list view
  return (
    <div className="customer-support">
      <h1>Customer Support</h1>
      
      <div className="support-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            type="text"
            placeholder="Search tickets by ID, subject, or customer name..."
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
            All Tickets
          </button>
          <button 
            className={`filter-tab ${activeTab === 'open' ? 'active' : ''}`}
            onClick={() => setActiveTab('open')}
          >
            Open
          </button>
          <button 
            className={`filter-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-tab ${activeTab === 'closed' ? 'active' : ''}`}
            onClick={() => setActiveTab('closed')}
          >
            Closed
          </button>
        </div>
        
        <button className="new-ticket-button">
          + New Ticket
        </button>
      </div>
      
      <div className="tickets-list">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div className={`ticket-card ${ticket.status}`} key={ticket.id}>
              <div className="ticket-card-header">
                <div className="ticket-id">
                  <MessageSquare className="ticket-icon" />
                  {ticket.id}
                </div>
                <div className="ticket-badges">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
              
              <div className="ticket-card-content">
                <h3 className="ticket-subject">{ticket.subject}</h3>
                
                <div className="ticket-metadata">
                  <div className="customer-info">
                    <span className="customer-name">
                      <User size={14} className="customer-icon" />
                      {ticket.customer.name}
                    </span>
                    {ticket.order && (
                      <span className="order-id">
                        <Package size={14} className="order-icon" />
                        {ticket.order.id}
                      </span>
                    )}
                  </div>
                  
                  <div className="ticket-dates">
                    <span className="date-item">
                      <span className="date-label">Created:</span>
                      <span className="date-value">{formatDate(ticket.createdAt)}</span>
                    </span>
                    <span className="date-item">
                      <span className="date-label">Updated:</span>
                      <span className="date-value">{formatDate(ticket.updatedAt)}</span>
                    </span>
                  </div>
                </div>
                
                <div className="category-assignee">
                  <div className="category">{getCategoryBadge(ticket.category)}</div>
                  <div className="assignee">
                    {ticket.assignedTo ? (
                      <div className="assignee-info">
                        <span className="assignee-label">Assigned to:</span>
                        <span className="assignee-name">{ticket.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="unassigned">Unassigned</span>
                    )}
                  </div>
                </div>
                
                <div className="message-preview">
                  <span className="preview-text">
                    {ticket.messages[ticket.messages.length - 1].content.length > 100 
                      ? ticket.messages[ticket.messages.length - 1].content.substring(0, 100) + '...' 
                      : ticket.messages[ticket.messages.length - 1].content}
                  </span>
                  <span className="message-count">
                    {ticket.messages.length} {ticket.messages.length === 1 ? 'message' : 'messages'}
                  </span>
                </div>
              </div>
              
              <div className="ticket-card-footer">
                <button 
                  className="view-ticket-button"
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  View Ticket
                  <ChevronRight size={16} />
                </button>
                
                {!ticket.assignedTo && ticket.status !== 'closed' && (
                  <button 
                    className="assign-ticket-button"
                    onClick={() => handleAssign(ticket.id)}
                  >
                    Assign
                  </button>
                )}
                
                {ticket.status === 'open' && (
                  <button className="resolve-button">
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-tickets-found">
            <p>No tickets found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;
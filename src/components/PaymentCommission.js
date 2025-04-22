import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  ChevronDown, 
  Download, 
  Filter, 
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  FileText,
  BarChart,
  Wallet,
  ArrowUp,
  ArrowDown,
  Store,
  Settings
} from 'lucide-react';
import '../styles/PaymentCommission.css'; // Import your CSS file for styling

const PaymentCommission = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('transactions');
  
  // State for active transaction type filter
  const [transactionType, setTransactionType] = useState('all');
  
  // State for date range
  const [dateRange, setDateRange] = useState('this-month');
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for transactions
  const transactions = [
    {
      id: 'TRX-12345',
      type: 'order_payment',
      amount: 56.80,
      commission: 5.68,
      vendorPayout: 51.12,
      date: '2025-04-17T14:00:00',
      status: 'completed',
      customer: {
        id: 'C001',
        name: 'John Smith'
      },
      vendor: {
        id: 'V001',
        name: 'Fresh Foods Market'
      },
      order: {
        id: 'ORD-12345',
        items: 3
      },
      paymentMethod: {
        type: 'credit_card',
        details: '**** 4242'
      }
    },
    {
      id: 'TRX-12346',
      type: 'order_payment',
      amount: 42.95,
      commission: 4.30,
      vendorPayout: 38.65,
      date: '2025-04-18T10:15:00',
      status: 'completed',
      customer: {
        id: 'C002',
        name: 'Emma Davis'
      },
      vendor: {
        id: 'V002',
        name: 'Urban Eats'
      },
      order: {
        id: 'ORD-12346',
        items: 3
      },
      paymentMethod: {
        type: 'paypal',
        details: 'emma.davis@example.com'
      }
    },
    {
      id: 'TRX-12347',
      type: 'order_payment',
      amount: 22.96,
      commission: 2.30,
      vendorPayout: 20.66,
      date: '2025-04-18T11:45:00',
      status: 'processing',
      customer: {
        id: 'C003',
        name: 'Michael Brown'
      },
      vendor: {
        id: 'V001',
        name: 'Fresh Foods Market'
      },
      order: {
        id: 'ORD-12347',
        items: 3
      },
      paymentMethod: {
        type: 'credit_card',
        details: '**** 5678'
      }
    },
    {
      id: 'TRX-12348',
      type: 'vendor_payout',
      amount: 1245.87,
      commission: 0,
      vendorPayout: 1245.87,
      date: '2025-04-17T09:00:00',
      status: 'completed',
      customer: null,
      vendor: {
        id: 'V001',
        name: 'Fresh Foods Market'
      },
      order: null,
      paymentMethod: {
        type: 'bank_transfer',
        details: 'Weekly payout - ending Apr 16'
      }
    },
    {
      id: 'TRX-12349',
      type: 'vendor_payout',
      amount: 876.25,
      commission: 0,
      vendorPayout: 876.25,
      date: '2025-04-17T09:00:00',
      status: 'completed',
      customer: null,
      vendor: {
        id: 'V002',
        name: 'Urban Eats'
      },
      order: null,
      paymentMethod: {
        type: 'bank_transfer',
        details: 'Weekly payout - ending Apr 16'
      }
    },
    {
      id: 'TRX-12350',
      type: 'refund',
      amount: 42.95,
      commission: -4.30,
      vendorPayout: -38.65,
      date: '2025-04-18T09:30:00',
      status: 'completed',
      customer: {
        id: 'C004',
        name: 'Robert Taylor'
      },
      vendor: {
        id: 'V002',
        name: 'Urban Eats'
      },
      order: {
        id: 'ORD-12349',
        items: 3
      },
      paymentMethod: {
        type: 'credit_card',
        details: '**** 9876'
      }
    },
    {
      id: 'TRX-12351',
      type: 'order_payment',
      amount: 21.45,
      commission: 2.15,
      vendorPayout: 19.30,
      date: '2025-04-18T13:20:00',
      status: 'failed',
      customer: {
        id: 'C005',
        name: 'Lisa Johnson'
      },
      vendor: null,
      order: {
        id: 'ORD-12348',
        items: 3
      },
      paymentMethod: {
        type: 'credit_card',
        details: '**** 3456'
      },
      failureReason: 'Card payment declined by issuer'
    }
  ];
  
  // Mock data for financial summary
  const financialSummary = {
    totalRevenue: 143.16,
    totalCommission: 12.13,
    totalVendorPayouts: 110.43,
    refundsAmount: 42.95,
    successRate: 85.7,
    paymentMethods: {
      creditCard: 67.4,
      paypal: 21.5,
      applePay: 11.1
    },
    byVendor: [
      { name: 'Fresh Foods Market', revenue: 79.76, commission: 7.98 },
      { name: 'Urban Eats', revenue: 42.95, commission: 4.30 },
    ],
    pendingPayouts: 2122.12
  };
  
  // Mock data for commission settings
  const commissionSettings = {
    defaultRate: 10.0,
    vendorSpecific: [
      { id: 'V001', name: 'Fresh Foods Market', rate: 8.5 },
      { id: 'V002', name: 'Urban Eats', rate: 7.5 },
      { id: 'V003', name: 'Health & Wellness Market', rate: 9.0 }
    ],
    payoutSchedule: 'weekly',
    minimumPayoutAmount: 50.0,
    processingFees: 'admin',
    categories: [
      { name: 'Grocery', rate: 10.0 },
      { name: 'Restaurant', rate: 15.0 },
      { name: 'Health Foods', rate: 12.0 }
    ]
  };
  
  // Filter transactions based on type, date range, and search term
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by transaction type
    if (transactionType !== 'all' && transaction.type !== transactionType) {
      return false;
    }
    
    // Filter by date range
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    
    if (dateRange === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (transactionDate < today) {
        return false;
      }
    } else if (dateRange === 'this-week') {
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      if (transactionDate < startOfWeek) {
        return false;
      }
    } else if (dateRange === 'this-month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      if (transactionDate < startOfMonth) {
        return false;
      }
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      // Check if search term is in transaction ID
      if (transaction.id.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check if search term is in customer name
      if (transaction.customer && transaction.customer.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check if search term is in vendor name
      if (transaction.vendor && transaction.vendor.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check if search term is in order ID
      if (transaction.order && transaction.order.id.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      return false;
    }
    
    return true;
  });
  
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
  
  // Function to get transaction type display text
  const getTransactionTypeText = (type) => {
    switch(type) {
      case 'order_payment':
        return 'Order Payment';
      case 'vendor_payout':
        return 'Vendor Payout';
      case 'refund':
        return 'Refund';
      default:
        return type;
    }
  };
  
  // Function to get transaction status display elements
  const getTransactionStatus = (status) => {
    switch(status) {
      case 'completed':
        return (
          <span className="status-badge completed">
            <CheckCircle size={14} />
            Completed
          </span>
        );
      case 'processing':
        return (
          <span className="status-badge processing">
            <RefreshCw size={14} />
            Processing
          </span>
        );
      case 'failed':
        return (
          <span className="status-badge failed">
            <XCircle size={14} />
            Failed
          </span>
        );
      default:
        return (
          <span className="status-badge">{status}</span>
        );
    }
  };
  
  // Function to get payment method icon
  const getPaymentMethodIcon = (type) => {
    switch(type) {
      case 'credit_card':
        return <CreditCard size={16} />;
      case 'paypal':
        return <Wallet size={16} />;
      case 'bank_transfer':
        return <DollarSign size={16} />;
      default:
        return <CreditCard size={16} />;
    }
  };
  
  // Function to handle download report
  const handleDownloadReport = () => {
    alert('Downloading financial report...');
    // In a real app, this would trigger a download of a CSV or PDF report
  };
  
  // Render the appropriate content based on active tab
  return (
    <div className="payment-commission">
      <h1>Payment & Commission</h1>
      
      <div className="payment-tabs">
        <button 
          className={`payment-tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <CreditCard size={18} />
          Transactions
        </button>
        <button 
          className={`payment-tab ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          <BarChart size={18} />
          Financial Summary
        </button>
        <button 
          className={`payment-tab ${activeTab === 'commission' ? 'active' : ''}`}
          onClick={() => setActiveTab('commission')}
        >
          <Settings size={18} />
          Commission Settings
        </button>
      </div>
      
      {activeTab === 'transactions' && (
        <div className="transactions-section">
          <div className="transactions-header">
            <div className="search-filter-container">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-container">
                <div className="filter-group">
                  <label>Transaction Type</label>
                  <select 
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Transactions</option>
                    <option value="order_payment">Order Payments</option>
                    <option value="vendor_payout">Vendor Payouts</option>
                    <option value="refund">Refunds</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Date Range</label>
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="today">Today</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="all-time">All Time</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button className="download-button" onClick={handleDownloadReport}>
              <Download size={16} />
              Export
            </button>
          </div>
          
          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Commission</th>
                  <th>Vendor Payout</th>
                  <th>Party</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(transaction => (
                    <tr key={transaction.id} className={`transaction-row ${transaction.type}`}>
                      <td className="transaction-id">
                        <span>{transaction.id}</span>
                        {transaction.order && (
                          <span className="order-id">{transaction.order.id}</span>
                        )}
                      </td>
                      <td>
                        <span className={`transaction-type ${transaction.type}`}>
                          {transaction.type === 'order_payment' && (
                            <ArrowDown className="transaction-type-icon income" />
                          )}
                          {transaction.type === 'vendor_payout' && (
                            <ArrowUp className="transaction-type-icon expense" />
                          )}
                          {transaction.type === 'refund' && (
                            <RefreshCw className="transaction-type-icon refund" />
                          )}
                          {getTransactionTypeText(transaction.type)}
                        </span>
                      </td>
                      <td>{formatDate(transaction.date)}</td>
                      <td className="amount-cell">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="commission-cell">
                        {formatCurrency(transaction.commission)}
                      </td>
                      <td className="payout-cell">
                        {formatCurrency(transaction.vendorPayout)}
                      </td>
                      <td>
                        {transaction.type === 'refund' || transaction.type === 'order_payment' ? (
                          <div className="party-info">
                            <div className="party-name">
                              {transaction.customer ? transaction.customer.name : 'N/A'}
                            </div>
                            <div className="payment-method">
                              {getPaymentMethodIcon(transaction.paymentMethod.type)}
                              <span>{transaction.paymentMethod.details}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="party-info">
                            <div className="party-name">
                              {transaction.vendor ? transaction.vendor.name : 'N/A'}
                            </div>
                            <div className="payment-method">
                              {getPaymentMethodIcon(transaction.paymentMethod.type)}
                              <span>{transaction.paymentMethod.details}</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        {getTransactionStatus(transaction.status)}
                        {transaction.status === 'failed' && transaction.failureReason && (
                          <div className="failure-reason">
                            {transaction.failureReason}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">
                      No transactions found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'financial' && (
        <div className="financial-section">
          <div className="financial-header">
            <div className="date-filter">
              <label>Period:</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="filter-select"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="all-time">All Time</option>
              </select>
            </div>
            
            <button className="download-button" onClick={handleDownloadReport}>
              <Download size={16} />
              Download Report
            </button>
          </div>
          
          <div className="financial-summary">
            <div className="summary-cards">
              <div className="summary-card">
                <div className="card-icon revenue">
                  <DollarSign size={24} />
                </div>
                <div className="card-content">
                  <span className="card-label">Total Revenue</span>
                  <span className="card-value">{formatCurrency(financialSummary.totalRevenue)}</span>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="card-icon commission">
                  <DollarSign size={24} />
                </div>
                <div className="card-content">
                  <span className="card-label">Total Commission</span>
                  <span className="card-value">{formatCurrency(financialSummary.totalCommission)}</span>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="card-icon payouts">
                  <Wallet size={24} />
                </div>
                <div className="card-content">
                  <span className="card-label">Vendor Payouts</span>
                  <span className="card-value">{formatCurrency(financialSummary.totalVendorPayouts)}</span>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="card-icon refunds">
                  <RefreshCw size={24} />
                </div>
                <div className="card-content">
                  <span className="card-label">Refunds</span>
                  <span className="card-value">{formatCurrency(financialSummary.refundsAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="financial-details">
              <div className="payment-methods-card detail-card">
                <h3>Payment Methods</h3>
                <div className="payment-methods-chart">
                  <div className="chart-placeholder">
                    <div className="pie-chart-placeholder">
                      <div className="pie-segment credit-card" style={{transform: 'rotate(0deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)'}}></div>
                      <div className="pie-segment paypal" style={{transform: 'rotate(240deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 75% 50%)'}}></div>
                      <div className="pie-segment apple-pay" style={{transform: 'rotate(320deg)', clipPath: 'polygon(50% 50%, 50% 0%, 75% 0%, 75% 25%)'}}></div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color credit-card"></span>
                      <span className="legend-label">Credit Card</span>
                      <span className="legend-value">{financialSummary.paymentMethods.creditCard}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color paypal"></span>
                      <span className="legend-label">PayPal</span>
                      <span className="legend-value">{financialSummary.paymentMethods.paypal}%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color apple-pay"></span>
                      <span className="legend-label">Apple Pay</span>
                      <span className="legend-value">{financialSummary.paymentMethods.applePay}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="vendor-performance-card detail-card">
                <h3>Vendor Performance</h3>
                <div className="vendor-list">
                  {financialSummary.byVendor.map((vendor, index) => (
                    <div className="vendor-item" key={index}>
                      <div className="vendor-info">
                        <Store className="vendor-icon" />
                        <span className="vendor-name">{vendor.name}</span>
                      </div>
                      <div className="vendor-metrics">
                        <div className="metric">
                          <span className="metric-label">Revenue</span>
                          <span className="metric-value">{formatCurrency(vendor.revenue)}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Commission</span>
                          <span className="metric-value">{formatCurrency(vendor.commission)}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Rate</span>
                          <span className="metric-value">{(vendor.commission / vendor.revenue * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pending-payouts-card detail-card">
                <h3>Pending Payouts</h3>
                <div className="pending-amount">
                  <span className="amount-value">{formatCurrency(financialSummary.pendingPayouts)}</span>
                  <span className="amount-label">Total pending vendor payouts</span>
                </div>
                <button className="process-payouts-button">
                  Process All Payouts
                </button>
              </div>
              
              <div className="success-rate-card detail-card">
                <h3>Transaction Success Rate</h3>
                <div className="success-rate-display">
                  <div className="rate-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="12" 
                        strokeDasharray={`${2 * Math.PI * 54 * financialSummary.successRate / 100} ${2 * Math.PI * 54 * (100 - financialSummary.successRate) / 100}`}
                        strokeDashoffset="0"
                        transform="rotate(-90, 60, 60)"
                      />
                    </svg>
                    <div className="rate-text">
                      <span className="rate-value">{financialSummary.successRate}%</span>
                    </div>
                  </div>
                  <div className="rate-info">
                    <p>Success rate of all payment transactions in the selected period.</p>
                    <button className="view-failed-button">
                      View Failed Transactions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'commission' && (
        <div className="commission-section">
          <div className="commission-header">
            <h2>Commission Settings</h2>
            <p>Configure commission rates and payout settings for vendors</p>
          </div>
          
          <div className="commission-cards">
            <div className="commission-card">
              <h3>Default Commission Rate</h3>
              <div className="rate-input-container">
                <input 
                  type="number" 
                  value={commissionSettings.defaultRate} 
                  className="rate-input"
                  readOnly
                />
                <span className="rate-symbol">%</span>
              </div>
              <p>This is the default commission rate applied to all vendors unless a specific rate is set.</p>
              <button className="edit-button">Edit Default Rate</button>
            </div>
            
            <div className="commission-card">
              <h3>Payout Schedule</h3>
              <div className="payout-option">
                <input 
                  type="radio" 
                  id="weekly" 
                  name="payout-schedule" 
                  checked={commissionSettings.payoutSchedule === 'weekly'} 
                  readOnly
                />
                <label htmlFor="weekly">Weekly</label>
              </div>
              <div className="payout-option">
                <input 
                  type="radio" 
                  id="biweekly" 
                  name="payout-schedule" 
                  checked={commissionSettings.payoutSchedule === 'biweekly'} 
                  readOnly
                />
                <label htmlFor="biweekly">Bi-weekly</label>
              </div>
              <div className="payout-option">
                <input 
                  type="radio" 
                  id="monthly" 
                  name="payout-schedule" 
                  checked={commissionSettings.payoutSchedule === 'monthly'} 
                  readOnly
                />
                <label htmlFor="monthly">Monthly</label>
              </div>
              <button className="edit-button">Edit Schedule</button>
            </div>
            
            <div className="commission-card">
              <h3>Minimum Payout</h3>
              <div className="amount-input-container">
                <span className="currency-symbol">₹</span>
                <input 
                  type="number" 
                  value={commissionSettings.minimumPayoutAmount} 
                  className="amount-input"
                  readOnly
                />
              </div>
              <p>Vendors must reach this minimum amount to receive a payout on the scheduled date.</p>
              <button className="edit-button">Edit Minimum</button>
            </div>
            
            <div className="commission-card">
              <h3>Processing Fees</h3>
              <div className="fees-option">
                <input 
                  type="radio" 
                  id="admin" 
                  name="processing-fees" 
                  checked={commissionSettings.processingFees === 'admin'} 
                  readOnly
                />
                <label htmlFor="admin">Covered by Admin</label>
              </div>
              <div className="fees-option">
                <input 
                  type="radio" 
                  id="vendor" 
                  name="processing-fees" 
                  checked={commissionSettings.processingFees === 'vendor'} 
                  readOnly
                />
                <label htmlFor="vendor">Covered by Vendor</label>
              </div>
              <div className="fees-option">
                <input 
                  type="radio" 
                  id="shared" 
                  name="processing-fees" 
                  checked={commissionSettings.processingFees === 'shared'} 
                  readOnly
                />
                <label htmlFor="shared">Shared</label>
              </div>
              <button className="edit-button">Edit Fee Policy</button>
            </div>
          </div>
          
          <div className="commission-tables">
            <div className="vendor-rates-table">
              <h3>Vendor-Specific Commission Rates</h3>
              <table>
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Commission Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionSettings.vendorSpecific.map((vendor, index) => (
                    <tr key={index}>
                      <td>{vendor.name}</td>
                      <td>{vendor.rate}%</td>
                      <td>
                        <button className="action-button edit">Edit</button>
                        <button className="action-button delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-button">+ Add Vendor-Specific Rate</button>
            </div>
            
            <div className="category-rates-table">
              <h3>Category Commission Rates</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Commission Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionSettings.categories.map((category, index) => (
                    <tr key={index}>
                      <td>{category.name}</td>
                      <td>{category.rate}%</td>
                      <td>
                        <button className="action-button edit">Edit</button>
                        <button className="action-button delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-button">+ Add Category Rate</button>
            </div>
          </div>
          
          <div className="commission-actions">
            <button className="save-button">Save All Changes</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCommission;


import React, { useState, useEffect } from 'react';
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
  Settings,
  ChevronRight
} from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import '../styles/PaymentCommission.css';

const PaymentCommission = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [transactionType, setTransactionType] = useState('all');
  const [dateRange, setDateRange] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({
    totalRevenue: 0,
    totalCommission: 0,
    totalVendorPayouts: 0,
    refundsAmount: 0,
    successRate: 0,
    paymentMethods: {
      creditCard: 0,
      paypal: 0,
      applePay: 0
    },
    byVendor: [],
    pendingPayouts: 0
  });
  const [commissionSettings, setCommissionSettings] = useState({
    defaultRate: 10.0,
    vendorSpecific: [],
    payoutSchedule: 'weekly',
    minimumPayoutAmount: 50.0,
    processingFees: 'admin',
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderIdMap, setOrderIdMap] = useState({}); // Added state for order ID mapping
  const [expandedRows, setExpandedRows] = useState({}); // Added state for expanded rows

  // Function to generate simplified order IDs for display
  const generateOrderIdMap = (orders) => {
    const idMap = {};
    orders.forEach((order, index) => {
      idMap[order.id] = `ORD-${index + 1}`; // e.g., ORD-1, ORD-2
    });
    setOrderIdMap(idMap);
  };

  // Toggle expanded row
  const toggleRow = (transactionId) => {
    setExpandedRows(prev => ({
      ...prev,
      [transactionId]: !prev[transactionId]
    }));
  };

  useEffect(() => {
    const ordersRef = ref(db, 'orders');
    const shopsRef = ref(db, 'shops');

    let ordersData = [];
    let shopsData = [];

    const ordersUnsubscribe = onValue(ordersRef, (snapshot) => {
      try {
        const data = snapshot.val();
        ordersData = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          timeline: data[key].timeline || [
            { status: 'order_placed', time: data[key].orderDate, note: 'Order placed successfully' }
          ]
        })) : [];
        processData(ordersData, shopsData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load transactions.');
        setLoading(false);
      }
    }, (err) => {
      console.error('Error fetching orders:', err);
      setError('Failed to load transactions.');
      setLoading(false);
    });

    const shopsUnsubscribe = onValue(shopsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        shopsData = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) : [];
        processData(ordersData, shopsData);
      } catch (err) {
        console.error('Error fetching shops:', err);
        setError('Failed to load transactions.');
        setLoading(false);
      }
    }, (err) => {
      console.error('Error fetching shops:', err);
      setError('Failed to load transactions.');
      setLoading(false);
    });

    const processData = (orders, shops) => {
      try {
        // Generate order ID mapping
        generateOrderIdMap(orders);

        const newTransactions = orders.flatMap(order => {
          const shop = shops.find(s => s.id === order.vendor?.id);
          const commissionRate = shop?.commissionRate || 10;
          const commission = order.totalAmount ? (order.totalAmount * commissionRate / 100) : 0;
          const vendorPayout = order.totalAmount ? (order.totalAmount - commission) : 0;

          const transactionsList = [];

          if (order.status !== 'pending') {
            transactionsList.push({
              id: `TRX-${order.id}`,
              type: 'order_payment',
              amount: order.totalAmount || 0,
              commission,
              vendorPayout,
              date: order.orderDate,
              status: order.status === 'delivered' ? 'completed' : order.status === 'cancelled' ? 'failed' : 'processing',
              customer: {
                id: order.customer?.id || 'CUST-' + order.id,
                name: order.customer?.fullName || 'Unknown'
              },
              vendor: {
                id: order.vendor?.id || 'VEND-' + order.id,
                name: shop?.name || order.vendor?.name || 'Unknown'
              },
              order: {
                id: order.id,
                displayId: orderIdMap[order.id] || `ORD-${orders.findIndex(o => o.id === order.id) + 1}`, // Use mapped ID
                items: order.items || [], // Include full items array
                totalAmount: order.totalAmount || 0
              },
              paymentMethod: {
                type: order.payment?.method || 'credit_card',
                details: order.payment?.cardLastFour ? `**** ${order.payment.cardLastFour}` : order.payment?.email || 'Unknown'
              },
              failureReason: order.status === 'cancelled' ? (order.cancellationReason || 'Order cancelled') : null
            });
          }

          if (order.status === 'cancelled' && order.totalAmount) {
            transactionsList.push({
              id: `TRX-REF-${order.id}`,
              type: 'refund',
              amount: order.totalAmount,
              commission: -commission,
              vendorPayout: -vendorPayout,
              date: order.timeline.find(event => event.status === 'cancelled')?.time || order.orderDate,
              status: 'completed',
              customer: {
                id: order.customer?.id || 'CUST-' + order.id,
                name: order.customer?.fullName || 'Unknown'
              },
              vendor: {
                id: order.vendor?.id || 'VEND-' + order.id,
                name: shop?.name || order.vendor?.name || 'Unknown'
              },
              order: {
                id: order.id,
                displayId: orderIdMap[order.id] || `ORD-${orders.findIndex(o => o.id === order.id) + 1}`, // Use mapped ID
                items: order.items || [],
                totalAmount: order.totalAmount || 0
              },
              paymentMethod: {
                type: order.payment?.method || 'credit_card',
                details: order.payment?.cardLastFour ? `**** ${order.payment.cardLastFour}` : order.payment?.email || 'Unknown'
              }
            });
          }

          return transactionsList;
        });

        const vendorPayouts = shops.map(shop => {
          const shopOrders = orders.filter(o => o.vendor?.id === shop.id && o.status === 'delivered');
          const totalPayout = shopOrders.reduce((sum, order) => {
            const commission = (order.totalAmount * (shop.commissionRate || 10) / 100);
            return sum + (order.totalAmount - commission);
          }, 0);

          if (totalPayout > 0) {
            return {
              id: `TRX-PAY-${shop.id}-${Date.now()}`,
              type: 'vendor_payout',
              amount: totalPayout,
              commission: 0,
              vendorPayout: totalPayout,
              date: new Date().toISOString(),
              status: 'completed',
              customer: null,
              vendor: {
                id: shop.id,
                name: shop.name
              },
              order: null,
              paymentMethod: {
                type: 'bank_transfer',
                details: `Weekly payout - ${new Date().toLocaleDateString()}`
              }
            };
          }
          return null;
        }).filter(p => p !== null);

        setTransactions([...newTransactions, ...vendorPayouts]);

        const totalRevenue = orders
          .filter(o => o.status === 'delivered')
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        const totalCommission = orders
          .filter(o => o.status === 'delivered')
          .reduce((sum, o) => {
            const shop = shops.find(s => s.id === o.vendor?.id);
            return sum + ((o.totalAmount * (shop?.commissionRate || 10) / 100) || 0);
          }, 0);

        const totalVendorPayouts = totalRevenue - totalCommission;

        const refundsAmount = orders
          .filter(o => o.status === 'cancelled')
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        const totalTransactions = orders.filter(o => o.status !== 'pending').length;
        const successfulTransactions = orders.filter(o => o.status === 'delivered').length;
        const successRate = totalTransactions > 0 ? ((successfulTransactions / totalTransactions) * 100).toFixed(1) : 0;

        const paymentMethodsCount = orders.reduce((acc, o) => {
          const method = o.payment?.method || 'credit_card';
          acc[method] = (acc[method] || 0) + 1;
          return acc;
        }, {});
        const totalPayments = Object.values(paymentMethodsCount).reduce((sum, count) => sum + count, 0);
        const paymentMethods = {
          creditCard: paymentMethodsCount.credit_card ? ((paymentMethodsCount.credit_card / totalPayments) * 100).toFixed(1) : 67.4,
          paypal: paymentMethodsCount.paypal ? ((paymentMethodsCount.paypal / totalPayments) * 100).toFixed(1) : 21.5,
          applePay: paymentMethodsCount.apple_pay ? ((paymentMethodsCount.apple_pay / totalPayments) * 100).toFixed(1) : 11.1
        };

        const byVendor = shops
          .filter(s => orders.some(o => o.vendor?.id === s.id))
          .map(s => {
            const shopOrders = orders.filter(o => o.vendor?.id === s.id && o.status === 'delivered');
            const revenue = shopOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
            const commission = shopOrders.reduce((sum, o) => sum + ((o.totalAmount * (s.commissionRate || 10) / 100) || 0), 0);
            return {
              name: s.name,
              revenue,
              commission
            };
          });

        const pendingPayouts = orders
          .filter(o => o.status === 'delivered' && !o.paidOut)
          .reduce((sum, o) => {
            const shop = shops.find(s => s.id === o.vendor?.id);
            const commission = (o.totalAmount * (shop?.commissionRate || 10) / 100);
            return sum + (o.totalAmount - commission);
          }, 0);

        setFinancialSummary({
          totalRevenue,
          totalCommission,
          totalVendorPayouts,
          refundsAmount,
          successRate,
          paymentMethods,
          byVendor,
          pendingPayouts
        });

        const uniqueCategories = [...new Set(shops.map(s => s.category))].map(cat => ({
          name: cat,
          rate: 10.0
        }));

        setCommissionSettings({
          defaultRate: 10.0,
          vendorSpecific: shops.map(s => ({
            id: s.id,
            name: s.name,
            rate: s.commissionRate || 10.0
          })),
          payoutSchedule: 'weekly',
          minimumPayoutAmount: 50.0,
          processingFees: 'admin',
          categories: uniqueCategories
        });

        setLoading(false);
      } catch (err) {
        console.error('Error processing data:', err);
        setError('Failed to process transactions.');
        setLoading(false);
      }
    };

    return () => {
      ordersUnsubscribe();
      shopsUnsubscribe();
    };
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionType !== 'all' && transaction.type !== transactionType) {
      return false;
    }
    
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
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      if (transaction.id.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      if (transaction.customer && transaction.customer.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      if (transaction.vendor && transaction.vendor.name.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      if (transaction.order && transaction.order.displayId.toLowerCase().includes(searchLower)) { // Updated to use displayId
        return true;
      }
      
      return false;
    }
    
    return true;
  });
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
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
  
  const handleDownloadReport = () => {
    let csvContent = '';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    if (activeTab === 'transactions') {
      const headers = [
        'Transaction ID',
        'Order ID',
        'Type',
        'Date',
        'Amount (INR)',
        'Commission (INR)',
        'Vendor Payout (INR)',
        'Party Name',
        'Payment Method',
        'Status',
        'Failure Reason'
      ];
      
      const rows = filteredTransactions.map(transaction => [
        transaction.id,
        transaction.order ? transaction.order.displayId : '', // Use displayId
        getTransactionTypeText(transaction.type),
        formatDate(transaction.date),
        transaction.amount,
        transaction.commission,
        transaction.vendorPayout,
        transaction.type === 'vendor_payout' ? (transaction.vendor?.name || 'N/A') : (transaction.customer?.name || 'N/A'),
        `${transaction.paymentMethod.type} (${transaction.paymentMethod.details})`,
        transaction.status,
        transaction.failureReason || ''
      ]);
      
      csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `transactions-report-${timestamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (activeTab === 'financial') {
      const summaryHeaders = [
        'Metric',
        'Value'
      ];
      
      const summaryRows = [
        ['Total Revenue (INR)', financialSummary.totalRevenue],
        ['Total Commission (INR)', financialSummary.totalCommission],
        ['Total Vendor Payouts (INR)', financialSummary.totalVendorPayouts],
        ['Refunds Amount (INR)', financialSummary.refundsAmount],
        ['Transaction Success Rate (%)', financialSummary.successRate],
        ['Pending Payouts (INR)', financialSummary.pendingPayouts]
      ];
      
      const paymentMethodsHeaders = [
        'Payment Method',
        'Percentage (%)'
      ];
      
      const paymentMethodsRows = [
        ['Credit Card', financialSummary.paymentMethods.creditCard],
        ['PayPal', financialSummary.paymentMethods.paypal],
        ['Apple Pay', financialSummary.paymentMethods.applePay]
      ];
      
      const vendorHeaders = [
        'Vendor Name',
        'Revenue (INR)',
        'Commission (INR)',
        'Commission Rate (%)'
      ];
      
      const vendorRows = financialSummary.byVendor.map(vendor => [
        vendor.name,
        vendor.revenue,
        vendor.commission,
        (vendor.commission / (vendor.revenue || 1) * 100).toFixed(1)
      ]);
      
      csvContent = [
        'Financial Summary',
        summaryHeaders.join(','),
        ...summaryRows.map(row => row.map(cell => `"${cell}"`).join(',')),
        '',
        'Payment Methods Distribution',
        paymentMethodsHeaders.join(','),
        ...paymentMethodsRows.map(row => row.map(cell => `"${cell}"`).join(',')),
        '',
        'Vendor Performance',
        vendorHeaders.join(','),
        ...vendorRows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `financial-summary-report-${timestamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <div className="payment-commission">
      <h1>Payment & Commission</h1>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading transactions...</div>}
      
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
                    <React.Fragment key={transaction.id}>
                      <tr 
                        className={`transaction-row ${transaction.type}`}
                        onClick={() => toggleRow(transaction.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="transaction-id">
                          <span>{transaction.id}</span>
                          {transaction.order && (
                            <span className="order-id">{transaction.order.displayId}</span>
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
                      {expandedRows[transaction.id] && transaction.order && (
                        <tr className="expanded-row">
                          <td colSpan="8">
                            <div className="expanded-content">
                              <h4>Order Details: {transaction.order.displayId}</h4>
                              <p><strong>Total Amount:</strong> {formatCurrency(transaction.order.totalAmount)}</p>
                              <p><strong>Items:</strong></p>
                              <ul>
                                {transaction.order.items.length > 0 ? (
                                  transaction.order.items.map((item, index) => (
                                    <li key={index}>
                                      {item.name || 'Item'} (Qty: {item.quantity || 1}) - {formatCurrency(item.price || 0)}
                                    </li>
                                  ))
                                ) : (
                                  <li>No items available</li>
                                )}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">
                      {loading ? 'Loading...' : 'No transactions found matching your criteria.'}
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
                      <div className="pie-segment paypal" style={{transform: `rotate(${financialSummary.paymentMethods.creditCard * 3.6}deg)`, clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 75% 50%)'}}></div>
                      <div className="pie-segment apple-pay" style={{transform: `rotate(${(financialSummary.paymentMethods.creditCard + financialSummary.paymentMethods.paypal) * 3.6}deg)`, clipPath: 'polygon(50% 50%, 50% 0%, 75% 0%, 75% 25%)'}}></div>
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
                          <span className="metric-value">{(vendor.commission / (vendor.revenue || 1) * 100).toFixed(1)}%</span>
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
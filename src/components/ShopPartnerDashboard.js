import React, { useState, useEffect } from 'react';
import {
  Package,
  Store,
  Map,
  Star,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  RefreshCw,
  X,
  Plus,
  Phone,
  User,
  FileText,
  Home,
  Upload,
  Check,
  Edit,
  Trash,
  Eye,
  Mail,
  Filter,
} from 'lucide-react';
import { ref, onValue, update, remove, push, set, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import '../styles/ShopPartnerDashboard.css';

// EditShopModal component
const EditShopModal = ({
  isOpen,
  onClose,
  editShopForm,
  handleInputChange,
  handleUpdateShop,
  shopCategories,
  fetchGoogleRating,
  isRatingLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Shop</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleUpdateShop} className="add-shop-form">
          <div className="form-section">
            <h3>Shop Information</h3>

            <div className="form-group">
              <label htmlFor="edit-name">Shop Name*</label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={editShopForm.name}
                onChange={handleInputChange}
                required
                placeholder="Enter shop name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-address">Shop Address*</label>
                <input
                  type="text"
                  id="edit-address"
                  name="address"
                  value={editShopForm.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-city">City*</label>
                <input
                  type="text"
                  id="edit-city"
                  name="city"
                  value={editShopForm.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-category">Category*</label>
                <select
                  id="edit-category"
                  name="category"
                  value={editShopForm.category}
                  onChange={handleInputChange}
                  required
                >
                  {shopCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-fetch-container">
                  <div className="rating-display">
                    {editShopForm.rating ? (
                      <span className="rating-value">
                        {editShopForm.rating} <Star size={14} className="star-icon" />
                        <span className="reviews-count">({editShopForm.reviews} reviews)</span>
                      </span>
                    ) : (
                      <span className="no-rating">Not fetched yet</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="fetch-rating-button"
                    onClick={() => fetchGoogleRating(editShopForm, 'edit')}
                    disabled={isRatingLoading}
                  >
                    {isRatingLoading ? (
                      <RefreshCw size={16} className="spinning" />
                    ) : (
                      <>
                        <RefreshCw size={16} />
                        Fetch from Google
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Meat Sector Type</h3>
              <div className="meat-sector-options">
                <div className="form-radio-group">
                  <input
                    type="radio"
                    id="edit-halal"
                    name="meatSectorType"
                    value="Halal"
                    checked={editShopForm.meatSectorType === 'Halal'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="edit-halal">Halal Cut</label>
                </div>
                <div className="form-radio-group">
                  <input
                    type="radio"
                    id="edit-jcjatka"
                    name="meatSectorType"
                    value="JC Jatka"
                    checked={editShopForm.meatSectorType === 'JC Jatka'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="edit-jcjatka">JC Jatka</label>
                </div>
                <div className="form-radio-group">
                  <input
                    type="radio"
                    id="edit-none"
                    name="meatSectorType"
                    value="None"
                    checked={editShopForm.meatSectorType === 'None'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="edit-none">Not Applicable</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Owner Information</h3>

            <div className="form-group">
              <label htmlFor="edit-owner">Shop Owner*</label>
              <input
                type="text"
                id="edit-owner"
                name="owner"
                value={editShopForm.owner}
                onChange={handleInputChange}
                required
                placeholder="Enter owner name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-phone">Phone Number*</label>
                <input
                  type="tel"
                  id="edit-phone"
                  name="phone"
                  value={editShopForm.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-email">Email*</label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={editShopForm.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-gstNumber">GST Number</label>
              <input
                type="text"
                id="edit-gstNumber"
                name="gstNumber"
                value={editShopForm.gstNumber}
                onChange={handleInputChange}
                placeholder="Enter GST number (optional)"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="update-button">
              Update Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// AddShopModal component
const AddShopModal = ({
  isOpen,
  onClose,
  newShopForm,
  handleInputChange,
  handleFileUpload,
  handleSubmitShop,
  documentUploads,
  documentPreviews,
  fetchGoogleRating,
  isRatingLoading,
  shopCategories,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Shop</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmitShop} className="add-shop-form">
          <div className="form-section">
            <h3>Shop Information</h3>

            <div className="form-group">
              <label htmlFor="name">Shop Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newShopForm.name}
                onChange={handleInputChange}
                required
                placeholder="Enter shop name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Shop Address*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newShopForm.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newShopForm.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select
                  id="category"
                  name="category"
                  value={newShopForm.category}
                  onChange={handleInputChange}
                  required
                >
                  {shopCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-fetch-container">
                  <div className="rating-display">
                    {newShopForm.rating ? (
                      <span className="rating-value">
                        {newShopForm.rating} <Star size={14} className="star-icon" />
                        <span className="reviews-count">({newShopForm.reviews} reviews)</span>
                      </span>
                    ) : (
                      <span className="no-rating">Not fetched yet</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="fetch-rating-button"
                    onClick={() => fetchGoogleRating(newShopForm, 'add')}
                    disabled={isRatingLoading}
                  >
                    {isRatingLoading ? (
                      <RefreshCw size={16} className="spinning" />
                    ) : (
                      <>
                        <RefreshCw size={16} />
                        Fetch from Google
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Meat Sector Type</h3>
              <div className="meat-sector-options">
                <div className="form-radio-group">
                  <input
                    type="radio"
                    id="halal"
                    name="meatSectorType"
                    value="Halal"
                    checked={newShopForm.meatSectorType === 'Halal'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="halal">Halal Cut</label>
                </div>
                <div className="form-radio-group">
                  <input
                    type="radio"
                    id="jcjatka"
                    name="meatSectorType"
                    value="JC Jatka"
                    checked={newShopForm.meatSectorType === 'JC Jatka'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="jcjatka">JC Jatka</label>
                </div>
                <div className="form-radio-group">
                  <input
                    type="radio"
                    id="none"
                    name="meatSectorType"
                    value="None"
                    checked={newShopForm.meatSectorType === 'None'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="none">Not Applicable</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Owner Information</h3>

            <div className="form-group">
              <label htmlFor="owner">Shop Owner*</label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={newShopForm.owner}
                onChange={handleInputChange}
                required
                placeholder="Enter owner name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newShopForm.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newShopForm.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gstNumber">GST Number</label>
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={newShopForm.gstNumber}
                onChange={handleInputChange}
                placeholder="Enter GST number (optional)"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Document Upload</h3>

            <div className="form-row document-row">
              <div className="form-group">
                <label>Business License</label>
                <div className="document-upload-container">
                  <div className="document-upload">
                    <input
                      type="file"
                      id="businessLicense"
                      name="businessLicense"
                      onChange={(e) => handleFileUpload(e, 'businessLicense')}
                      accept="image/*"
                      className="file-input"
                    />
                    <label htmlFor="businessLicense" className="file-label">
                      <Upload size={16} />
                      {documentUploads.businessLicense ? 'Change File' : 'Choose File'}
                    </label>
                    <span className="file-name">
                      {documentUploads.businessLicense
                        ? documentUploads.businessLicense.name
                        : 'No file chosen'}
                    </span>
                  </div>

                  {documentPreviews.businessLicense && (
                    <div className="document-preview">
                      <img src={documentPreviews.businessLicense} alt="Business License Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>ID Proof</label>
                <div className="document-upload-container">
                  <div className="document-upload">
                    <input
                      type="file"
                      id="idProof"
                      name="idProof"
                      onChange={(e) => handleFileUpload(e, 'idProof')}
                      accept="image/*"
                      className="file-input"
                    />
                    <label htmlFor="idProof" className="file-label">
                      <Upload size={16} />
                      {documentUploads.idProof ? 'Change File' : 'Choose File'}
                    </label>
                    <span className="file-name">
                      {documentUploads.idProof ? documentUploads.idProof.name : 'No file chosen'}
                    </span>
                  </div>

                  {documentPreviews.idProof && (
                    <div className="document-preview">
                      <img src={documentPreviews.idProof} alt="ID Proof Preview" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ShopPartnerDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');

  // State for selected shop
  const [selectedShop, setSelectedShop] = useState(null);

  // State for filter options
  const [meatSectorFilter, setMeatSectorFilter] = useState('All');

  // State for vendors (keeping existing implementation)
  const [vendors, setVendors] = useState([
    { id: 'V001', name: 'Rah TCMul Singh', rating: 4.8, specialty: 'Grocery', available: true, orders: 245 },
    { id: 'V002', name: 'Priya Sharma', rating: 4.6, specialty: 'Restaurant', available: true, orders: 189 },
    { id: 'V003', name: 'Amit Kumar', rating: 4.7, specialty: 'Health Foods', available: false, orders: 156 },
    { id: 'V004', name: 'Deepika Patel', rating: 4.5, specialty: 'Grocery', available: true, orders: 132 },
    { id: 'V005', name: 'Vikram Malhotra', rating: 4.9, specialty: 'Restaurant', available: true, orders: 201 },
  ]);

  // State for notification
  const [notification, setNotification] = useState(null);

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // State for shops
  const [shops, setShops] = useState([]);
  
  // State for filtered shops
  const [filteredShops, setFilteredShops] = useState([]);

  // State for add shop modal
  const [isAddShopModalOpen, setIsAddShopModalOpen] = useState(false);

  // State for edit shop modal
  const [isEditShopModalOpen, setIsEditShopModalOpen] = useState(false);

  // State for rating loading
  const [isRatingLoading, setIsRatingLoading] = useState(false);

  // State for new shop form
  const [newShopForm, setNewShopForm] = useState({
    name: '',
    address: '',
    city: '',
    category: 'Grocery', // Default category
    owner: '',
    phone: '',
    email: '',
    gstNumber: '',
    status: 'active',
    meatSectorType: 'None', // Default meat sector type
  });

  // State for edit shop form
  const [editShopForm, setEditShopForm] = useState({
    id: '',
    name: '',
    address: '',
    city: '',
    category: '',
    owner: '',
    phone: '',
    email: '',
    gstNumber: '',
    rating: 0,
    reviews: 0,
    meatSectorType: 'None',
  });

  // State for document uploads
  const [documentUploads, setDocumentUploads] = useState({
    businessLicense: null,
    idProof: null,
  });

  // State for document preview URLs
  const [documentPreviews, setDocumentPreviews] = useState({
    businessLicense: null,
    idProof: null,
  });

  // State for meat sector statistics
  const [meatSectorStats, setMeatSectorStats] = useState({
    Halal: 0,
    'JC Jatka': 0,
    None: 0,
  });

  // Categories for dropdown
  const shopCategories = [
    'Grocery',
    'Restaurant',
    'Pharmacy',
    'Electronics',
    'Clothing',
    'Home Goods',
    'Bakery',
    'Pet Supplies',
    'Books',
    'Health Foods',
    'Meat Shop',
    'Other',
  ];
  
  // Calculate meat sector statistics
  useEffect(() => {
    const stats = {
      Halal: shops.filter(shop => shop.meatSectorType === 'Halal').length,
      'JC Jatka': shops.filter(shop => shop.meatSectorType === 'JC Jatka').length,
      None: shops.filter(shop => shop.meatSectorType === 'None' || !shop.meatSectorType).length,
    };
    
    setMeatSectorStats(stats);
  }, [shops]);
  
  // Apply filters to shops
  useEffect(() => {
    let result = [...shops];
    
    // Apply meat sector filter
    if (meatSectorFilter !== 'All') {
      result = result.filter(shop => 
        meatSectorFilter === 'None' 
          ? shop.meatSectorType === 'None' || !shop.meatSectorType
          : shop.meatSectorType === meatSectorFilter
      );
    }
    
    setFilteredShops(result);
  }, [shops, meatSectorFilter]);

  // Fetch shops from Firebase when component mounts
  useEffect(() => {
    const shopsRef = ref(db, 'shops');

    // Set up real-time listener for shops
    const unsubscribe = onValue(
      shopsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          // Convert from object to array
          const shopsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            // Set default for shops without meat sector type
            meatSectorType: data[key].meatSectorType || 'None',
          }));

          // Sort by name
          shopsArray.sort((a, b) => a.name.localeCompare(b.name));

          setShops(shopsArray);
        } else {
          setShops([]);
        }

        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching shops:', error);
        setNotification({
          message: `Error fetching shops: ${error.message}`,
          type: 'error',
        });

        setTimeout(() => {
          setNotification(null);
        }, 3000);

        setIsLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Set up a listener for order status changes to update shop earnings
  useEffect(() => {
    const ordersRef = ref(db, 'orders');
    
    const handleOrderStatusChange = async (snapshot) => {
      const ordersData = snapshot.val();
      if (!ordersData) return;
      
      // Process each order
      for (const [orderId, order] of Object.entries(ordersData)) {
        // Check if the order was just delivered
        if (order.status === 'delivered' && order.vendor && !order.earningsProcessed) {
          // Find the vendor/shop ID from the order
          const vendorId = order.vendor.id;
          if (!vendorId) continue;
          
          await updateShopEarnings(vendorId, order);
        }
      }
    };
    
    // Set up the listener
    const unsubscribe = onValue(ordersRef, handleOrderStatusChange);
    
    // Cleanup on unmount
    return () => unsubscribe();
  }, []);
  
  // Function to update shop earnings when an order is delivered
  const updateShopEarnings = async (shopId, order) => {
    try {
      // Get current shop data
      const shopRef = ref(db, `shops/${shopId}`);
      const shopSnapshot = await get(shopRef);
      const shopData = shopSnapshot.val();
      
      if (!shopData) {
        console.error(`Shop with ID ${shopId} not found when updating earnings`);
        return;
      }
      
      // Calculate earnings (assume 10% commission or use the shop's commission rate)
      const commissionRate = shopData.commissionRate || 10;
      const orderEarnings = (order.totalAmount * (100 - commissionRate)) / 100;
      
      // Initialize earnings object if it doesn't exist
      const earnings = shopData.earnings || {
        currentMonth: 0,
        previousMonth: 0,
        total: 0
      };
      
      // Update earnings
      const updatedEarnings = {
        currentMonth: (earnings.currentMonth || 0) + orderEarnings,
        previousMonth: earnings.previousMonth || 0,
        total: (earnings.total || 0) + orderEarnings
      };
      
      // Update shop data in Firebase
      await update(shopRef, {
        earnings: updatedEarnings
      });
      
      // Mark the order as earnings processed to avoid duplicate processing
      const orderRef = ref(db, `orders/${order.id}`);
      await update(orderRef, {
        earningsProcessed: true
      });
      
      console.log(`Earnings updated for shop ${shopId}. Added ${orderEarnings} from order ${order.id}`);
    } catch (error) {
      console.error('Error updating shop earnings:', error);
    }
  };

  // Handle form input changes for new shop
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShopForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form input changes for edit shop
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditShopForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle document file uploads
  const handleFileUpload = (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store file for later upload
    setDocumentUploads({
      ...documentUploads,
      [documentType]: file,
    });

    // Create preview URL
    const previewURL = URL.createObjectURL(file);
    setDocumentPreviews({
      ...documentPreviews,
      [documentType]: previewURL,
    });
  };

  // Handle fetching Google ratings - works for both add and edit forms
  const fetchGoogleRating = async (formData, formType) => {
    const { name, address, city } = formData;

    if (!name || !address || !city) {
      setNotification({
        message: 'Shop name, address, and city are required to fetch ratings',
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return;
    }

    setIsRatingLoading(true);

    try {
      // Construct the query for Google Places API
      const query = `${name} ${address} ${city}`;
      
      // In a real implementation, you would call the Google Places API here
      // For now, we'll simulate with a more realistic delay and data
      
      // Simulate API call with a more realistic approach
      setTimeout(() => {
        // Generate rating based on name length for consistency
        const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const baseRating = 3.5 + (nameHash % 15) / 10; // Between 3.5 and 5.0
        const rating = parseFloat(baseRating.toFixed(1));
        
        // Generate reviews count based on name length
        const reviews = 10 + (nameHash % 190); // Between 10 and 200
        
        if (formType === 'add') {
          setNewShopForm((prev) => ({
            ...prev,
            rating: rating,
            reviews: reviews,
          }));
        } else {
          setEditShopForm((prev) => ({
            ...prev,
            rating: rating,
            reviews: reviews,
          }));
        }

        setIsRatingLoading(false);

        setNotification({
          message: `Successfully fetched ratings: ${rating} from ${reviews} reviews`,
          type: 'success',
        });

        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }, 1500);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setIsRatingLoading(false);

      setNotification({
        message: `Failed to fetch ratings: ${error.message}`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Handle form submission for adding a new shop
  const handleSubmitShop = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'address', 'city', 'category', 'owner', 'phone', 'email'];
      const missingFields = requiredFields.filter((field) => !newShopForm[field]);

      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
      }

      // Create a new shop object
      const newShop = {
        ...newShopForm,
        location: {
          address: `${newShopForm.address}, ${newShopForm.city}`,
          city: newShopForm.city,
        },
        rating: newShopForm.rating || 0,
        reviews: newShopForm.reviews || 0,
        joinDate: new Date().toISOString(),
        status: 'active',
        verified: false,
        earnings: {
          currentMonth: 0,
          previousMonth: 0,
          total: 0,
        },
        orders: {
          pending: 0,
          processing: 0,
          completed: 0,
          cancelled: 0,
        },
        performanceMetrics: {
          orderAcceptanceRate: 95,
          preparationTime: 25,
          customerSatisfaction: 4.5,
        },
      };

      // Upload documents if any
      const documents = {};

      if (documentUploads.businessLicense) {
        const businessLicenseRef = storageRef(storage, `shops/${Date.now()}_business_license`);
        await uploadBytes(businessLicenseRef, documentUploads.businessLicense);
        const businessLicenseUrl = await getDownloadURL(businessLicenseRef);
        documents.businessLicense = businessLicenseUrl;
      }

      if (documentUploads.idProof) {
        const idProofRef = storageRef(storage, `shops/${Date.now()}_id_proof`);
        await uploadBytes(idProofRef, documentUploads.idProof);
        const idProofUrl = await getDownloadURL(idProofRef);
        documents.idProof = idProofUrl;
      }

      // Add documents to the shop data if any
      if (Object.keys(documents).length > 0) {
        newShop.documents = documents;
      }

      // Save to Firebase
      const shopsRef = ref(db, 'shops');
      const newShopRef = push(shopsRef);
      await set(newShopRef, newShop);

      // Reset form
      setNewShopForm({
        name: '',
        address: '',
        city: '',
        category: 'Grocery',
        owner: '',
        phone: '',
        email: '',
        gstNumber: '',
        status: 'active',
        meatSectorType: 'None',
      });

      // Reset document uploads
      setDocumentUploads({
        businessLicense: null,
        idProof: null,
      });

      // Reset document previews
      setDocumentPreviews({
        businessLicense: null,
        idProof: null,
      });

      // Close modal
      setIsAddShopModalOpen(false);

      setIsLoading(false);

      // Show success notification
      setNotification({
        message: `Shop ${newShop.name} has been added successfully`,
        type: 'success',
      });

      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding shop:', error);
      setIsLoading(false);

      setNotification({
        message: `Failed to add shop: ${error.message}`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Function to handle opening the edit shop modal
  const handleEditShop = (shop) => {
    // Prepare address by splitting the full address
    let address = '';
    let city = shop.location?.city || '';
    
    if (shop.location?.address) {
      const addressParts = shop.location.address.split(', ');
      if (addressParts.length > 1) {
        // Use everything except the last part as address
        address = addressParts.slice(0, -1).join(', ');
      } else {
        address = shop.location.address;
      }
    }
    
    setEditShopForm({
      id: shop.id,
      name: shop.name || '',
      address: address,
      city: city,
      category: shop.category || 'Grocery',
      owner: shop.owner || '',
      phone: shop.phone || '',
      email: shop.email || '',
      gstNumber: shop.gstNumber || '',
      rating: shop.rating || 0,
      reviews: shop.reviews || 0,
      meatSectorType: shop.meatSectorType || 'None',
    });
    
    setIsEditShopModalOpen(true);
  };

  // Function to handle updating a shop
  const handleUpdateShop = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'address', 'city', 'category', 'owner', 'phone', 'email'];
      const missingFields = requiredFields.filter((field) => !editShopForm[field]);

      if (missingFields.length > 0) {
        throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
      }

      // Create updated shop object
      const updatedShop = {
        name: editShopForm.name,
        location: {
          address: `${editShopForm.address}, ${editShopForm.city}`,
          city: editShopForm.city,
        },
        category: editShopForm.category,
        owner: editShopForm.owner,
        phone: editShopForm.phone,
        email: editShopForm.email,
        gstNumber: editShopForm.gstNumber,
        rating: editShopForm.rating,
        reviews: editShopForm.reviews,
        meatSectorType: editShopForm.meatSectorType,
      };

      // Update shop in Firebase
      const shopRef = ref(db, `shops/${editShopForm.id}`);
      await update(shopRef, updatedShop);

      // Close modal
      setIsEditShopModalOpen(false);
      setIsLoading(false);

      // Show success notification
      setNotification({
        message: `Shop ${updatedShop.name} has been updated successfully`,
        type: 'success',
      });

      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating shop:', error);
      setIsLoading(false);

      setNotification({
        message: `Failed to update shop: ${error.message}`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Function to toggle shop status (activate/deactivate)
  const toggleShopStatus = async (shopId, currentStatus) => {
    setIsLoading(true);

    try {
      const shopRef = ref(db, `shops/${shopId}`);
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      await update(shopRef, {
        status: newStatus,
        statusUpdatedAt: new Date().toISOString(),
      });

      setIsLoading(false);

      // Show success notification
      setNotification({
        message: `Shop status has been ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
        type: 'success',
      });

      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error toggling shop status:', error);
      setIsLoading(false);

      setNotification({
        message: `Failed to update shop status: ${error.message}`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Function to remove shop
  const removeShop = async (shopId) => {
    const confirmed = window.confirm('Are you sure you want to delete this shop? This action cannot be undone.');
    if (!confirmed) return;

    setIsLoading(true);

    try {
      const shopRef = ref(db, `shops/${shopId}`);
      await remove(shopRef);

      // If the deleted shop was selected, clear selection
      if (selectedShop === shopId) {
        setSelectedShop(null);
      }

      setIsLoading(false);

      // Show success notification
      setNotification({
        message: `Shop has been removed successfully`,
        type: 'success',
      });

      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error removing shop:', error);
      setIsLoading(false);

      setNotification({
        message: `Failed to remove shop: ${error.message}`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Function to update Google ratings (simulated)
  const updateGoogleRatings = async (shopId) => {
    setIsLoading(true);

    try {
      const shopRef = ref(db, `shops/${shopId}`);
      
      // Get the shop data first to determine a more consistent rating
      const shopSnapshot = await get(shopRef);
      const shopData = shopSnapshot.val();
      
      if (!shopData) {
        throw new Error("Shop not found");
      }
      
      // Generate rating based on name length for consistency
      const nameHash = shopData.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const baseRating = 3.5 + (nameHash % 15) / 10; // Between 3.5 and 5.0
      const rating = parseFloat(baseRating.toFixed(1));
      
      // Generate reviews count based on name length
      const reviewsBase = shopData.reviews || 50;
      const reviews = reviewsBase + Math.floor(Math.random() * 30) - 15; // Add or subtract up to 15 reviews

      await update(shopRef, {
        rating: rating,
        reviews: reviews,
        lastRatingUpdate: new Date().toISOString(),
      });

      setIsLoading(false);

      // Show success notification
      setNotification({
        message: `Shop ratings have been updated from Google: ${rating} from ${reviews} reviews`,
        type: 'success',
      });

      // Auto dismiss notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating ratings:', error);
      setIsLoading(false);

      setNotification({
        message: `Failed to update ratings: ${error.message}`,
        type: 'error',
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Function to format currency with rupee symbol
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Function to get shop performance status
  const getShopPerformanceStatus = (metrics) => {
    if (!metrics) return 'needs-improvement';

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

  // Function to get meat sector label for display
  const getMeatSectorLabel = (type) => {
    switch(type) {
      case 'Halal': return 'Halal Cut';
      case 'JC Jatka': return 'JC Jatka';
      default: return 'Not Applicable';
    }
  };

  // If a shop is selected, show detailed view
  if (selectedShop) {
    const shop = shops.find((s) => s.id === selectedShop);

    // If shop not found after being deleted
    if (!shop) {
      return (
        <div className="shop-partner-dashboard">
          <button className="back-button" onClick={() => setSelectedShop(null)}>
            ← Back to Shops
          </button>
          <p>Shop not found. It may have been deleted.</p>
        </div>
      );
    }

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

        {/* Edit Shop Modal */}
        <EditShopModal
          isOpen={isEditShopModalOpen}
          onClose={() => setIsEditShopModalOpen(false)}
          editShopForm={editShopForm}
          handleInputChange={handleEditInputChange}
          handleUpdateShop={handleUpdateShop}
          shopCategories={shopCategories}
          fetchGoogleRating={fetchGoogleRating}
          isRatingLoading={isRatingLoading}
        />

        <div className="shop-detail-header">
          <button className="back-button" onClick={() => setSelectedShop(null)}>
            ← Back to Shops
          </button>
          <h1>{shop.name}</h1>
          <div className={`shop-status ${shop.status}`}>
            {shop.status === 'active' ? 'Active' : shop.status === 'pending' ? 'Pending' : 'Inactive'}
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
                    <span className="info-label">Meat Sector Type</span>
                    <span className="info-value">{getMeatSectorLabel(shop.meatSectorType)}</span>
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
                    <span className="info-value">{shop.location?.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Joined</span>
                    <span className="info-value">{formatDate(shop.joinDate)}</span>
                  </div>
                  {shop.owner && (
                    <div className="info-item">
                      <span className="info-label">Owner</span>
                      <span className="info-value">{shop.owner}</span>
                    </div>
                  )}
                  {shop.phone && (
                    <div className="info-item">
                      <span className="info-label">Phone</span>
                      <span className="info-value">{shop.phone}</span>
                    </div>
                  )}
                  {shop.email && (
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{shop.email}</span>
                    </div>
                  )}
                  {shop.gstNumber && (
                    <div className="info-item">
                      <span className="info-label">GST</span>
                      <span className="info-value">{shop.gstNumber}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Commission</span>
                    <span className="info-value">{shop.commissionRate || 10}%</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Verified</span>
                    <span className="info-value">{shop.verified ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                <div className="shop-actions">
                  <button className="shop-action-button" onClick={() => handleEditShop(shop)}>
                    <Edit size={16} />
                    Edit Info
                  </button>
                  <button className="shop-action-button" onClick={() => updateGoogleRatings(shop.id)}>
                    <RefreshCw size={16} />
                    Update Ratings
                  </button>
                  <button
                    className={`shop-status-toggle ${shop.status === 'active' ? 'deactivate' : 'activate'}`}
                    onClick={() => toggleShopStatus(shop.id, shop.status)}
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
                    <span className="earnings-value">{formatCurrency(shop.earnings?.currentMonth || 0)}</span>
                    {shop.earnings?.previousMonth > 0 && (
                      <span className="earnings-change positive">
                        +
                        {(
                          ((shop.earnings.currentMonth - shop.earnings.previousMonth) /
                            shop.earnings.previousMonth) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    )}
                  </div>
                  <div className="earnings-item">
                    <span className="earnings-label">Previous Month</span>
                    <span className="earnings-value">{formatCurrency(shop.earnings?.previousMonth || 0)}</span>
                  </div>
                  <div className="earnings-item total">
                    <span className="earnings-label">Total Earnings</span>
                    <span className="earnings-value">{formatCurrency(shop.earnings?.total || 0)}</span>
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
                      <span className="order-stat-value">{shop.orders?.pending || 0}</span>
                    </div>
                    <span className="order-stat-label">Pending</span>
                  </div>
                  <div className="order-stat-item">
                    <div className="order-stat processing">
                      <TrendingUp className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders?.processing || 0}</span>
                    </div>
                    <span className="order-stat-label">Processing</span>
                  </div>
                  <div className="order-stat-item">
                    <div className="order-stat completed">
                      <CheckCircle className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders?.completed || 0}</span>
                    </div>
                    <span className="order-stat-label">Completed</span>
                  </div>
                  <div className="order-stat-item">
                    <div className="order-stat cancelled">
                      <AlertTriangle className="order-stat-icon" />
                      <span className="order-stat-value">{shop.orders?.cancelled || 0}</span>
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
                  {getShopPerformanceStatus(shop.performanceMetrics)
                    .charAt(0)
                    .toUpperCase() +
                    getShopPerformanceStatus(shop.performanceMetrics)
                      .slice(1)
                      .replace('-', ' ')}
                </div>

                <div className="metrics-list">
                  <div className="metric-item">
                    <span className="metric-label">Order Acceptance Rate</span>
                    <div className="metric-value-container">
                      <span className="metric-value">{shop.performanceMetrics?.orderAcceptanceRate || 0}%</span>
                      <div className="metric-bar-container">
                        <div
                          className="metric-bar"
                          style={{ width: `${shop.performanceMetrics?.orderAcceptanceRate || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Avg. Preparation Time</span>
                    <div className="metric-value-container">
                      <span className="metric-value">{shop.performanceMetrics?.preparationTime || 0} mins</span>
                      <div className="metric-bar-container">
                        <div
                          className="metric-bar"
                          style={{ width: `${(shop.performanceMetrics?.preparationTime || 0) / 30 * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Customer Satisfaction</span>
                    <div className="metric-value-container">
                      <span className="metric-value">
                        {shop.performanceMetrics?.customerSatisfaction || 0}
                        <Star size={14} className="star-icon" />
                      </span>
                      <div className="metric-bar-container">
                        <div
                          className="metric-bar"
                          style={{
                            width: `${(shop.performanceMetrics?.customerSatisfaction || 0) / 5 * 100}%`,
                          }}
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

              {shop.topProducts && shop.topProducts.length > 0 && (
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
              )}

              {shop.documents && (
                <div className="shop-detail-card documents">
                  <h2>Documents</h2>
                  <div className="documents-list">
                    {shop.documents.businessLicense && (
                      <div className="document-item">
                        <span className="document-name">Business License</span>
                        <a
                          href={shop.documents.businessLicense}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          <Eye size={16} /> View
                        </a>
                      </div>
                    )}
                    {shop.documents.idProof && (
                      <div className="document-item">
                        <span className="document-name">ID Proof</span>
                        <a
                          href={shop.documents.idProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          <Eye size={16} /> View
                        </a>
                      </div>
                    )}
                    {shop.documents.addressProof && (
                      <div className="document-item">
                        <span className="document-name">Address Proof</span>
                        <a
                          href={shop.documents.addressProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          <Eye size={16} /> View
                        </a>
                      </div>
                    )}
                    {shop.documents.gstCertificate && (
                      <div className="document-item">
                        <span className="document-name">GST Certificate</span>
                        <a
                          href={shop.documents.gstCertificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          <Eye size={16} /> View
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="shop-detail-content">
            <h2>Orders Management</h2>
            <p className="tab-placeholder">Orders management would go here, showing all orders for {shop.name}.</p>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="shop-detail-content">
            <h2>Vendor Assignment</h2>
            <p className="tab-placeholder">Vendor assignment would go here for {shop.name}.</p>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="shop-detail-content">
            <h2>Performance Analytics</h2>
            <p className="tab-placeholder">
              Detailed performance metrics and analytics would go here, showing trends over time for {shop.name}.
            </p>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="shop-detail-content">
            <h2>Products Management</h2>
            <p className="tab-placeholder">
              Product catalog management would go here, allowing you to view and edit all products for {shop.name}.
            </p>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="shop-detail-content">
            <h2>Earnings & Payouts</h2>
            <p className="tab-placeholder">
              Earnings history, payout records, and financial analytics would go here for {shop.name}.
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="shop-detail-content">
            <h2>Shop Settings</h2>
            <div className="settings-actions">
              <button className="delete-shop-button" onClick={() => removeShop(shop.id)}>
                <Trash size={16} />
                Delete Shop
              </button>
            </div>
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

      {/* Add Shop Modal */}
      <AddShopModal
        isOpen={isAddShopModalOpen}
        onClose={() => setIsAddShopModalOpen(false)}
        newShopForm={newShopForm}
        handleInputChange={handleInputChange}
        handleFileUpload={handleFileUpload}
        handleSubmitShop={handleSubmitShop}
        documentUploads={documentUploads}
        documentPreviews={documentPreviews}
        fetchGoogleRating={fetchGoogleRating}
        isRatingLoading={isRatingLoading}
        shopCategories={shopCategories}
      />

      {/* Edit Shop Modal */}
      <EditShopModal
        isOpen={isEditShopModalOpen}
        onClose={() => setIsEditShopModalOpen(false)}
        editShopForm={editShopForm}
        handleInputChange={handleEditInputChange}
        handleUpdateShop={handleUpdateShop}
        shopCategories={shopCategories}
        fetchGoogleRating={fetchGoogleRating}
        isRatingLoading={isRatingLoading}
      />

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
            <span className="stat-value">{shops.filter((shop) => shop.status === 'active').length}</span>
            <span className="stat-label">Active Shops</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Package />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {shops.reduce(
                (total, shop) =>
                  total +
                  ((shop.orders?.pending || 0) +
                    (shop.orders?.processing || 0) +
                    (shop.orders?.completed || 0) +
                    (shop.orders?.cancelled || 0)),
                0
              )}
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
              {formatCurrency(shops.reduce((total, shop) => total + (shop.earnings?.total || 0), 0))}
            </span>
            <span className="stat-label">Total Revenue</span>
          </div>
        </div>
      </div>
      
      {/* Meat Sector Statistics */}
      <div className="meat-sector-stats">
        <h2>Meat Sector Statistics</h2>
        <div className="meat-sector-counters">
          <div className="meat-sector-counter halal">
            <div className="counter-value">{meatSectorStats.Halal}</div>
            <div className="counter-label">Halal Cut</div>
          </div>
          <div className="meat-sector-counter jc-jatka">
            <div className="counter-value">{meatSectorStats['JC Jatka']}</div>
            <div className="counter-label">JC Jatka</div>
          </div>
          <div className="meat-sector-counter none">
            <div className="counter-value">{meatSectorStats.None}</div>
            <div className="counter-label">Not Applicable</div>
          </div>
        </div>
      </div>

      <div className="shops-container">
        <div className="shops-header">
          <h2>All Shop Partners</h2>
          <div className="shops-actions">
            <div className="filter-container">
              <Filter size={16} className="filter-icon" />
              <select 
                className="meat-sector-filter"
                value={meatSectorFilter}
                onChange={(e) => setMeatSectorFilter(e.target.value)}
              >
                <option value="All">All Meat Sectors</option>
                <option value="Halal">Halal Cut</option>
                <option value="JC Jatka">JC Jatka</option>
                <option value="None">Not Applicable</option>
              </select>
            </div>
            <button className="add-shop-button" onClick={() => setIsAddShopModalOpen(true)}>
              + Add New Shop
            </button>
          </div>
        </div>

        <div className="shops-table-container">
          {filteredShops.length > 0 ? (
            <table className="shops-table">
              <thead>
                <tr>
                  <th>Shop Name</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Meat Sector</th>
                  <th>Rating</th>
                  <th>Location</th>
                  <th>Orders</th>
                  <th>Earnings</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShops.map((shop) => (
                  <tr className={`shop-row ${shop.status}`} key={shop.id}>
                    <td className="shop-name-cell">
                      <span className="shop-name">{shop.name}</span>
                    </td>
                    <td>
                      <div className={`shop-status ${shop.status}`}>
                        {shop.status === 'active' ? 'Active' : shop.status === 'pending' ? 'Pending' : 'Inactive'}
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{shop.category}</span>
                    </td>
                    <td>
                      <span className={`meat-sector-tag ${shop.meatSectorType.toLowerCase().replace(' ', '-')}`}>
                        {getMeatSectorLabel(shop.meatSectorType)}
                      </span>
                    </td>
                    <td>
                      <div className="shop-rating">
                        <Star className="rating-star" />
                        <span className="rating-value">{shop.rating}</span>
                        <span className="reviews-count">({shop.reviews} reviews)</span>
                      </div>
                    </td>
                    <td>
                      <div className="shop-location">
                        <Map className="location-icon" />
                        <span>{shop.location?.address}</span>
                      </div>
                    </td>
                    <td>
                      {(shop.orders?.pending || 0) +
                        (shop.orders?.processing || 0) +
                        (shop.orders?.completed || 0) +
                        (shop.orders?.cancelled || 0)}
                    </td>
                    <td>{formatCurrency(shop.earnings?.currentMonth || 0)}</td>
                    <td>
                      <span className={`performance-indicator ${getShopPerformanceStatus(shop.performanceMetrics)}`}>
                        {getShopPerformanceStatus(shop.performanceMetrics)
                          .charAt(0)
                          .toUpperCase() +
                          getShopPerformanceStatus(shop.performanceMetrics)
                            .slice(1)
                            .replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="shop-table-actions">
                        <button
                          className="view-shop-button"
                          onClick={() => setSelectedShop(shop.id)}
                          title="View Details"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                        <button className="edit-shop-button" onClick={() => handleEditShop(shop)} title="Edit Shop">
                          <Edit size={16} />
                          {/* <span>Edit</span> */}
                        </button>
                        <button
                          className={`shop-toggle-button ${shop.status === 'active' ? 'deactivate' : 'activate'}`}
                          onClick={() => toggleShopStatus(shop.id, shop.status)}
                          title={shop.status === 'active' ? 'Deactivate Shop' : 'Activate Shop'}
                        >
                          {shop.status === 'active' ? (
                            <>
                              <X size={16} />
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <Check size={16} />
                              <span>Activate</span>
                            </>
                          )}
                        </button>
                        <button
                          className="remove-shop-button"
                          onClick={() => removeShop(shop.id)}
                          title="Remove Shop"
                        >
                          <Trash size={16} />
                          {/* <span>Delete</span> */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-shops-message">
              <p>No shops found matching your criteria. Try changing the filter or add a new shop.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPartnerDashboard;


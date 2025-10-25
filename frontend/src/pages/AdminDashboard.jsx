import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/productAPI';
import { getAllOrders, updateOrderStatus } from '../api/orderAPI';
import { getAllRetailers, verifyRetailer, getPendingProducts, approveProduct } from '../api/retailerAPI';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaPlus, FaEdit, FaTrash, FaBox, FaUsers, FaStore, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Handicrafts',
    image: '',
    stock: '',
    featured: false,
  });

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/');
      return;
    }

    loadData();
  }, [userInfo, navigate, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const { data } = await fetchProducts();
        setProducts(data);
      } else if (activeTab === 'orders') {
        const { data } = await getAllOrders();
        setOrders(data);
      } else if (activeTab === 'retailers') {
        const { data } = await getAllRetailers();
        setRetailers(data);
      } else if (activeTab === 'pending') {
        const { data } = await getPendingProducts();
        setPendingProducts(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Handicrafts',
        image: '',
        stock: '',
        featured: false,
      });
      loadData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadData();
      } catch (err) {
        alert('Error: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      loadData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleVerifyRetailer = async (retailerId, isVerified) => {
    try {
      await verifyRetailer(retailerId, isVerified);
      loadData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleApproveProduct = async (productId, approved) => {
    try {
      await approveProduct(productId, approved);
      loadData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-saffron-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaBox />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-saffron-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaUsers />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('retailers')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'retailers'
                ? 'bg-saffron-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaStore />
            <span>Retailers</span>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-saffron-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaClock />
            <span>Pending Products</span>
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Handicrafts',
                    image: '',
                    stock: '',
                    featured: false,
                  });
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add New Product</span>
              </button>
            </div>

            {showForm && (
              <div className="card p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field"
                    >
                      <option>Handicrafts</option>
                      <option>Apparel</option>
                      <option>Jewelry</option>
                      <option>Home Décor</option>
                      <option>Accessories</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows="3"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                      min="0"
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      className="input-field"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-saffron-600"
                      />
                      <span className="text-sm font-medium">Featured Product</span>
                    </label>
                  </div>
                  <div className="md:col-span-2 flex space-x-4">
                    <button type="submit" className="btn-primary">
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                      }}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="error">{error}</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow">
                  <thead className="bg-maroon-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Image</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Category</th>
                      <th className="px-4 py-3 text-left">Price</th>
                      <th className="px-4 py-3 text-left">Stock</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        </td>
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3">{product.category}</td>
                        <td className="px-4 py-3">₹{product.price}</td>
                        <td className="px-4 py-3">{product.stock}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="error">{error}</Message>
            ) : orders.length === 0 ? (
              <Message variant="info">No orders yet.</Message>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold">Order ID: {order._id}</p>
                        <p className="text-sm text-gray-600">
                          Customer: {order.user?.name} ({order.user?.email})
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="input-field"
                          disabled={order.status === 'Cancelled'}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        {order.status === 'Cancelled' && (
                          <p className="text-xs text-red-600 mt-1">
                            {order.cancellationReason && `Reason: ${order.cancellationReason}`}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <p className="font-bold text-lg text-maroon-500">Total: ₹{order.totalPrice}</p>
                      <p className="text-sm text-gray-600">{order.orderItems.length} item(s)</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Retailers Tab */}
        {activeTab === 'retailers' && (
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="error">{error}</Message>
            ) : retailers.length === 0 ? (
              <Message variant="info">No retailers yet.</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow">
                  <thead className="bg-maroon-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Store Name</th>
                      <th className="px-4 py-3 text-left">Owner</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">License</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retailers.map((retailer) => (
                      <tr key={retailer._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{retailer.storeName}</td>
                        <td className="px-4 py-3">{retailer.name}</td>
                        <td className="px-4 py-3">{retailer.email}</td>
                        <td className="px-4 py-3">{retailer.phone}</td>
                        <td className="px-4 py-3 text-sm">{retailer.businessLicense}</td>
                        <td className="px-4 py-3">
                          {retailer.isVerified ? (
                            <span className="badge bg-green-100 text-green-800 flex items-center w-fit">
                              <FaCheckCircle className="mr-1" /> Verified
                            </span>
                          ) : (
                            <span className="badge bg-red-100 text-red-800 flex items-center w-fit">
                              <FaTimesCircle className="mr-1" /> Not Verified
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {retailer.isVerified ? (
                            <button
                              onClick={() => handleVerifyRetailer(retailer._id, false)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              onClick={() => handleVerifyRetailer(retailer._id, true)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Verify
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Pending Products Tab */}
        {activeTab === 'pending' && (
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="error">{error}</Message>
            ) : pendingProducts.length === 0 ? (
              <Message variant="info">No pending products for approval.</Message>
            ) : (
              <div className="space-y-4">
                {pendingProducts.map((product) => (
                  <div key={product._id} className="card p-6">
                    <div className="flex gap-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="font-bold text-maroon-500">₹{product.price}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Category</p>
                            <p className="font-medium">{product.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Stock</p>
                            <p className="font-medium">{product.stock}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Retailer</p>
                            <p className="font-medium">{product.retailer?.storeName}</p>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                          <p><strong>Retailer:</strong> {product.retailer?.name} ({product.retailer?.email})</p>
                          <p><strong>Submitted:</strong> {new Date(product.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <button
                            onClick={() => handleApproveProduct(product._id, true)}
                            className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <FaCheckCircle />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleApproveProduct(product._id, false)}
                            className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <FaTimesCircle />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

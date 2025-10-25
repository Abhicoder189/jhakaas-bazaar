import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getRetailerProfile,
  getRetailerProducts,
  createRetailerProduct,
  updateRetailerProduct,
  deleteRetailerProduct,
} from '../api/retailerAPI';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaStore, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
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
  });

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'retailer') {
      navigate('/');
      return;
    }

    loadData();
  }, [userInfo, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profileRes, productsRes] = await Promise.all([
        getRetailerProfile(),
        getRetailerProducts(),
      ]);
      setProfile(profileRes.data);
      setProducts(productsRes.data);
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
        await updateRetailerProduct(editingProduct._id, formData);
      } else {
        await createRetailerProduct(formData);
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
      });
      loadData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteRetailerProduct(id);
        loadData();
      } catch (err) {
        alert('Error: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const getStatusBadge = (approved) => {
    if (approved) {
      return (
        <span className="badge bg-green-100 text-green-800 flex items-center">
          <FaCheckCircle className="mr-1" /> Approved
        </span>
      );
    }
    return (
      <span className="badge bg-yellow-100 text-yellow-800 flex items-center">
        <FaClock className="mr-1" /> Pending Approval
      </span>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Retailer Dashboard</h1>

        {/* Profile Info Card */}
        {profile && (
          <div className="card p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-saffron-600 to-maroon-500 w-20 h-20 rounded-full flex items-center justify-center">
                  <FaStore className="text-4xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{profile.storeName}</h2>
                  <p className="text-gray-600">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
              <div>
                {profile.isVerified ? (
                  <span className="badge bg-green-100 text-green-800 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Verified Retailer
                  </span>
                ) : (
                  <span className="badge bg-red-100 text-red-800 flex items-center">
                    <FaTimesCircle className="mr-2" />
                    Not Verified
                  </span>
                )}
              </div>
            </div>

            {!profile.isVerified && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Your account is pending verification. You cannot upload products until verified by admin.
                </p>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Store Description:</strong> {profile.storeDescription}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              {profile.address && (
                <p>
                  <strong>Address:</strong> {profile.address.street}, {profile.address.city},{' '}
                  {profile.address.state} - {profile.address.pincode}
                </p>
              )}
            </div>
          </div>
        )}

        {error && <Message variant="error">{error}</Message>}

        {/* Products Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-maroon-500">My Products</h2>
            {profile?.isVerified && (
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
                  });
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add New Product</span>
              </button>
            )}
          </div>

          {/* Product Form */}
          {showForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-field"
                    placeholder="Beautiful Handicraft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
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
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="3"
                    className="input-field"
                    placeholder="Describe your product..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                    className="input-field"
                    placeholder="999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    min="0"
                    className="input-field"
                    placeholder="10"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Image URL *</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="input-field"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use Unsplash or other image hosting services
                  </p>
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
              {editingProduct && (
                <p className="text-xs text-yellow-600 mt-2">
                  ⚠️ Note: Editing approved products will require re-approval from admin
                </p>
              )}
            </div>
          )}

          {/* Products List */}
          {products.length === 0 ? (
            <Message variant="info">
              {profile?.isVerified
                ? 'No products yet. Click "Add New Product" to get started!'
                : 'Get verified first to start adding products.'}
            </Message>
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
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">₹{product.price}</td>
                      <td className="px-4 py-3">{product.stock}</td>
                      <td className="px-4 py-3">{getStatusBadge(product.approved)}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
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
      </div>
    </div>
  );
};

export default RetailerDashboard;

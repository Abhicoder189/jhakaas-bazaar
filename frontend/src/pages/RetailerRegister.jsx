import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerRetailer } from '../api/retailerAPI';
import Message from '../components/Message';
import { FaStore, FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';

const RetailerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    storeDescription: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    businessLicense: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const retailerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        storeName: formData.storeName,
        storeDescription: formData.storeDescription,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        businessLicense: formData.businessLicense,
      };

      await registerRetailer(retailerData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-saffron-600 to-maroon-500 rounded-full mb-4">
                <FaStore className="text-4xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Become a Retailer</h1>
              <p className="text-gray-600">
                Join Jhakaas Bazaar and showcase your products to thousands of customers
              </p>
            </div>

            {error && <Message variant="error">{error}</Message>}
            {success && (
              <Message variant="success">
                Registration successful! Your account is pending admin approval. You will be notified once verified. Redirecting to login...
              </Message>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-maroon-500 mb-4 flex items-center">
                  <FaUser className="mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="retailer@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <FaLock className="inline mr-2" />
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                      className="input-field"
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
              </div>

              {/* Store Information */}
              <div>
                <h3 className="text-xl font-bold text-maroon-500 mb-4 flex items-center">
                  <FaStore className="mr-2" />
                  Store Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Store Name *</label>
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="My Awesome Store"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Store Description *</label>
                    <textarea
                      name="storeDescription"
                      value={formData.storeDescription}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="input-field"
                      placeholder="Tell customers about your store and products..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <FaPhone className="inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Business Address */}
              <div>
                <h3 className="text-xl font-bold text-maroon-500 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Business Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{6}"
                      className="input-field"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>

              {/* Business License */}
              <div>
                <h3 className="text-xl font-bold text-maroon-500 mb-4 flex items-center">
                  <FaIdCard className="mr-2" />
                  Business Verification
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business License / GST Number *
                  </label>
                  <input
                    type="text"
                    name="businessLicense"
                    value={formData.businessLicense}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="GSTIN or Business Registration Number"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be verified by our admin team
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  disabled={loading || success}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Registering...' : success ? 'Registration Successful!' : 'Register as Retailer'}
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-saffron-600 hover:text-saffron-700 font-medium">
                    Login here
                  </Link>
                </p>
                <p className="text-center text-sm text-gray-600">
                  Want to shop instead?{' '}
                  <Link to="/register" className="text-maroon-600 hover:text-maroon-700 font-medium">
                    Customer Registration
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerRegister;

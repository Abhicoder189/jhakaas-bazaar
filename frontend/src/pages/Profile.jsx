import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyOrders, cancelOrder } from '../api/orderAPI';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaUser, FaShoppingBag, FaClock, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userInfo, navigate]);

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    const reason = prompt('Please provide a reason for cancellation (optional):') || 'Customer request';

    try {
      await cancelOrder(orderId, reason);
      // Reload orders
      const { data } = await getMyOrders();
      setOrders(data);
      alert('Order cancelled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  const canCancelOrder = (status) => {
    return status === 'Pending' || status === 'Processing';
  };

  return (
    <div className="min-h-screen bg-beige-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title">My Profile</h1>

        {/* User Info */}
        <div className="card p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-saffron-100 w-20 h-20 rounded-full flex items-center justify-center">
              <FaUser className="text-4xl text-saffron-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{userInfo?.name}</h2>
              <p className="text-gray-600">{userInfo?.email}</p>
              {userInfo?.role === 'admin' && (
                <span className="badge bg-maroon-500 text-white mt-2">Admin</span>
              )}
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-maroon-500">
            <FaShoppingBag className="mr-3" />
            My Orders
          </h2>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : orders.length === 0 ? (
            <Message variant="info">You haven't placed any orders yet.</Message>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FaClock className="mr-2" />
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Order ID: {order._id}</p>
                    </div>
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      {canCancelOrder(order.status) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <FaTimes />
                          <span>Cancel Order</span>
                        </button>
                      )}
                      {order.status === 'Cancelled' && order.cancellationReason && (
                        <p className="text-sm text-gray-500">
                          Reason: {order.cancellationReason}
                        </p>
                      )}
                    </div>
                    <p className="text-lg font-bold text-maroon-500">
                      Total: ₹{order.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

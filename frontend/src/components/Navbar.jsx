import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-display font-bold text-gradient">
              Jhakaas Bazaar
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <FaShoppingCart className="text-2xl text-gray-700 group-hover:text-saffron-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-maroon-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {userInfo ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-saffron-600 font-medium transition-colors flex items-center space-x-2"
                >
                  <FaUser />
                  <span className="hidden lg:inline">{userInfo.name}</span>
                </Link>
                {userInfo.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                {userInfo.role === 'retailer' && (
                  <Link
                    to="/retailer/dashboard"
                    className="text-gray-700 hover:text-saffron-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-maroon-500 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link
                  to="/retailer/register"
                  className="text-sm text-maroon-600 hover:text-maroon-700 font-medium whitespace-nowrap"
                >
                  Sell on Jhakaas
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

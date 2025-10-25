import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFail,
} from '../store/slices/productSlice';
import { fetchProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaHandsHelping, FaShippingFast, FaAward, FaLeaf, FaStore, FaChartLine, FaUsers, FaRocket } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch(fetchProductsRequest());
        const { data } = await fetchProducts({ featured: 'true' });
        dispatch(fetchProductsSuccess(data));
      } catch (err) {
        dispatch(fetchProductsFail(err.response?.data?.message || err.message));
      }
    };

    loadProducts();
  }, [dispatch]);

  const categories = [
    { name: 'Handicrafts', icon: '🎨', color: 'from-saffron-400 to-saffron-600' },
    { name: 'Apparel', icon: '👗', color: 'from-maroon-400 to-maroon-600' },
    { name: 'Jewelry', icon: '💎', color: 'from-gold-400 to-gold-600' },
    { name: 'Home Décor', icon: '🏠', color: 'from-beige-400 to-beige-600' },
    { name: 'Accessories', icon: '👜', color: 'from-saffron-500 to-maroon-500' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-saffron-600 via-maroon-500 to-gold-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mandala opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
              Discover India's Finest Creations
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Authentic handicrafts, jewelry, and home décor from local artisans
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop" className="bg-white text-saffron-600 hover:bg-beige-100 font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Shop Now
              </Link>
              <Link to="/about" className="border-2 border-white text-white hover:bg-white hover:text-saffron-600 font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="group"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-center hover-lift shadow-lg hover:shadow-2xl transition-all`}>
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Products</h2>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Why Choose Jhakaas Bazaar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-saffron-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandsHelping className="text-4xl text-saffron-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Support Artisans</h3>
              <p className="text-gray-600">
                Directly support local craftspeople and their families
              </p>
            </div>
            <div className="text-center">
              <div className="bg-maroon-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-4xl text-maroon-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Authentic Quality</h3>
              <p className="text-gray-600">
                100% genuine handcrafted products with quality guarantee
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast className="text-4xl text-gold-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free delivery across India on orders above ₹999
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-4xl text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                Sustainable materials and traditional techniques
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sell with Us Section */}
      <section className="py-20 bg-gradient-to-br from-saffron-50 via-beige-50 to-gold-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-mandala opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-saffron-600 to-maroon-500 rounded-full mb-6 animate-bounce">
                <FaStore className="text-5xl text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
                Start Selling on Jhakaas Bazaar
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of artisans and retailers who are growing their business with us. 
                Reach customers across India and showcase your unique products.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="bg-saffron-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-3xl text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Grow Your Business</h3>
                    <p className="text-gray-600">
                      Access millions of customers and increase your sales with our established platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="bg-maroon-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUsers className="text-3xl text-maroon-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Trusted Marketplace</h3>
                    <p className="text-gray-600">
                      Be part of a verified community of quality sellers and build customer trust
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRocket className="text-3xl text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Easy to Get Started</h3>
                    <p className="text-gray-600">
                      Simple registration, quick verification, and start selling in just a few steps
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaAward className="text-3xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Quality First</h3>
                    <p className="text-gray-600">
                      Admin-verified sellers and products ensure quality and customer satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-saffron-600 to-maroon-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Selling?
              </h3>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Register as a retailer today and showcase your products to thousands of customers. 
                It's free to get started!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/retailer/register"
                  className="bg-white text-saffron-600 hover:bg-beige-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
                >
                  Register as Retailer
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-saffron-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-block"
                >
                  Learn More
                </Link>
              </div>
              <p className="text-sm mt-6 opacity-75">
                ✨ Free registration • Quick verification • No hidden fees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-r from-maroon-900 to-maroon-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-paisley opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">About Jhakaas Bazaar</h2>
            <p className="text-lg mb-6">
              We are passionate about preserving India's rich cultural heritage by connecting
              talented artisans with customers who appreciate authentic craftsmanship. Every
              product tells a story of tradition, skill, and dedication.
            </p>
            <Link to="/about" className="btn-primary bg-white text-maroon-600 hover:bg-beige-100">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { useDispatch } from 'react-redux';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
        quantity: 1,
      })
    );
  };

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="badge bg-saffron-100 text-saffron-700">{product.category}</span>
          <div className="flex items-center text-gold-500">
            <FaStar />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating} ({product.numReviews})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-maroon-500">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center space-x-2 ${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'btn-primary'
            } py-2 px-4`}
          >
            <FaShoppingCart />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

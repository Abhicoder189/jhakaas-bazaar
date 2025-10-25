import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { protect, retailer, verifiedRetailer, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/retailers/register
// @desc    Register as retailer
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, storeName, storeDescription, phone, address, businessLicense } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create retailer
    const retailer = await User.create({
      name,
      email,
      password,
      role: 'retailer',
      storeName,
      storeDescription,
      phone,
      address,
      businessLicense,
      isVerified: false, // Requires admin approval
    });

    res.status(201).json({
      _id: retailer._id,
      name: retailer.name,
      email: retailer.email,
      role: retailer.role,
      storeName: retailer.storeName,
      isVerified: retailer.isVerified,
      message: 'Retailer registered successfully. Awaiting admin verification.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/retailers/profile
// @desc    Get retailer profile
// @access  Private/Retailer
router.get('/profile', protect, retailer, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/retailers/profile
// @desc    Update retailer profile
// @access  Private/Retailer
router.put('/profile', protect, retailer, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.storeName = req.body.storeName || user.storeName;
      user.storeDescription = req.body.storeDescription || user.storeDescription;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        storeName: updatedUser.storeName,
        storeDescription: updatedUser.storeDescription,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isVerified: updatedUser.isVerified,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/retailers/products
// @desc    Get retailer's own products
// @access  Private/Retailer
router.get('/products', protect, retailer, async (req, res) => {
  try {
    const products = await Product.find({ retailer: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/retailers/products
// @desc    Create new product (retailer)
// @access  Private/Verified Retailer
router.post('/products', protect, verifiedRetailer, async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
      retailer: req.user._id,
      approved: false, // Requires admin approval
      featured: false,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/retailers/products/:id
// @desc    Update retailer's product
// @access  Private/Retailer
router.put('/products/:id', protect, retailer, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product belongs to retailer
    if (product.retailer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;

    // If product was approved and retailer makes changes, set back to unapproved
    if (product.approved && req.user.role === 'retailer') {
      product.approved = false;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/retailers/products/:id
// @desc    Delete retailer's product
// @access  Private/Retailer
router.delete('/products/:id', protect, retailer, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product belongs to retailer
    if (product.retailer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/retailers
// @desc    Get all retailers (for admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const retailers = await User.find({ role: 'retailer' }).select('-password').sort({ createdAt: -1 });
    res.json(retailers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/retailers/:id/verify
// @desc    Verify/unverify retailer (admin only)
// @access  Private/Admin
router.put('/:id/verify', protect, admin, async (req, res) => {
  try {
    const { isVerified } = req.body;
    const retailer = await User.findById(req.params.id);

    if (!retailer || retailer.role !== 'retailer') {
      return res.status(404).json({ message: 'Retailer not found' });
    }

    retailer.isVerified = isVerified;
    const updatedRetailer = await retailer.save();

    res.json({
      _id: updatedRetailer._id,
      name: updatedRetailer.name,
      email: updatedRetailer.email,
      storeName: updatedRetailer.storeName,
      isVerified: updatedRetailer.isVerified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/retailers/pending-products
// @desc    Get all pending products for admin approval
// @access  Private/Admin
router.get('/pending-products', protect, admin, async (req, res) => {
  try {
    const products = await Product.find({ approved: false })
      .populate('retailer', 'name email storeName')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/retailers/products/:id/approve
// @desc    Approve/reject retailer product (admin only)
// @access  Private/Admin
router.put('/products/:id/approve', protect, admin, async (req, res) => {
  try {
    const { approved } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.approved = approved;
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

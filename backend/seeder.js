import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Drop any old indexes that might cause issues
    try {
      await Product.collection.dropIndex('slug_1');
      console.log('Dropped old slug index');
    } catch (err) {
      // Index might not exist, that's okay
    }

    console.log('Data cleared!');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@jhakaas.com',
      password: 'admin123',
      role: 'admin',
    });

    // Create sample user
    const user = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'test123',
    });

    // Create sample retailer
    const retailer = await User.create({
      name: 'Raj Kumar',
      email: 'retailer@test.com',
      password: 'retailer123',
      role: 'retailer',
      storeName: 'Artisan Crafts India',
      storeDescription: 'Authentic Indian handicrafts and traditional products from local artisans',
      phone: '+91 9876543210',
      address: {
        street: '123 Market Street',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
      },
      businessLicense: 'GSTIN29ABCDE1234F1Z5',
      isVerified: true, // Pre-verified for testing
    });

    console.log('Users created!');

    // Sample products
    const products = [
      {
        name: 'Handwoven Silk Saree',
        description: 'Beautiful handwoven Banarasi silk saree with intricate golden zari work. Perfect for weddings and special occasions.',
        price: 12999,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        stock: 15,
        rating: 4.8,
        numReviews: 24,
        featured: true,
        approved: true, // Admin products are auto-approved
      },
      {
        name: 'Wooden Elephant Statue',
        description: 'Hand-carved rosewood elephant statue showcasing traditional Indian craftsmanship. A perfect home décor piece.',
        price: 2499,
        category: 'Handicrafts',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
        stock: 30,
        rating: 4.5,
        numReviews: 18,
        featured: true,
        approved: true,
      },
      {
        name: 'Kundan Necklace Set',
        description: 'Exquisite Kundan jewelry set with earrings and maang tikka. Traditional design with modern finish.',
        price: 8999,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
        stock: 12,
        rating: 4.9,
        numReviews: 32,
        featured: true,
        approved: true,
      },
      {
        name: 'Brass Diya Set',
        description: 'Set of 5 handcrafted brass diyas with intricate designs. Perfect for festivals and puja ceremonies.',
        price: 899,
        category: 'Home Décor',
        image: 'https://images.unsplash.com/photo-1618294180203-76c3d6fc8b2f?w=500',
        stock: 50,
        rating: 4.6,
        numReviews: 45,
        featured: false,
        approved: true,
      },
      {
        name: 'Pashmina Shawl',
        description: 'Luxurious hand-embroidered Kashmiri Pashmina shawl. Soft, warm, and elegant.',
        price: 15999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1601924287271-6c47b3aea5f4?w=500',
        stock: 8,
        rating: 5.0,
        numReviews: 12,
        featured: true,
        approved: true,
      },
      {
        name: 'Madhubani Painting',
        description: 'Authentic Madhubani art on canvas depicting traditional folk themes. Hand-painted by rural artists.',
        price: 3499,
        category: 'Home Décor',
        image: 'https://images.unsplash.com/photo-1582201957280-e6e5e33b90f6?w=500',
        stock: 20,
        rating: 4.7,
        numReviews: 28,
        featured: false,
        approved: true,
      },
      {
        name: 'Jaipur Block Print Kurta',
        description: 'Cotton kurta with traditional Jaipur block print. Comfortable and stylish for everyday wear.',
        price: 1499,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1583391733981-5ae2e2d2473d?w=500',
        stock: 40,
        rating: 4.4,
        numReviews: 56,
        featured: false,
        approved: true,
      },
      {
        name: 'Terracotta Jewelry Box',
        description: 'Handcrafted terracotta jewelry box with traditional designs. Perfect for storing your precious items.',
        price: 699,
        category: 'Handicrafts',
        image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=500',
        stock: 35,
        rating: 4.3,
        numReviews: 22,
        featured: false,
        approved: true,
      },
      {
        name: 'Silver Anklets (Payal)',
        description: 'Pure silver anklets with delicate ghungroo. Traditional design with comfortable fit.',
        price: 4999,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
        stock: 18,
        rating: 4.8,
        numReviews: 34,
        featured: false,
        approved: true,
      },
      {
        name: 'Embroidered Cushion Covers',
        description: 'Set of 4 cushion covers with mirror work and embroidery. Adds Indian charm to your living space.',
        price: 1299,
        category: 'Home Décor',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500',
        stock: 60,
        rating: 4.5,
        numReviews: 41,
        featured: false,
        approved: true,
      },
      {
        name: 'Kolhapuri Chappals',
        description: 'Authentic leather Kolhapuri chappals handmade by local artisans. Durable and comfortable.',
        price: 899,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500',
        stock: 45,
        rating: 4.6,
        numReviews: 67,
        featured: false,
        approved: true,
      },
      {
        name: 'Blue Pottery Vase',
        description: 'Stunning Jaipur blue pottery vase with floral motifs. A timeless home décor piece.',
        price: 2299,
        category: 'Handicrafts',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500',
        stock: 25,
        rating: 4.7,
        numReviews: 19,
        featured: true,
        approved: true,
      },
    ];

    await Product.insertMany(products);

    console.log('Products created!');
    console.log('✅ Seed data inserted successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@jhakaas.com / admin123');
    console.log('User: user@test.com / test123');
    console.log('Retailer: retailer@test.com / retailer123');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();

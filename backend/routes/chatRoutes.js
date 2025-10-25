import express from 'express';
import axios from 'axios';
import Chat from '../models/Chat.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enhanced mock responses with emojis
const mockResponses = {
  shipping: "📦 We offer FREE shipping across India for orders above ₹999! 🎉\n\n✈️ Standard delivery: 5-7 business days\n🚀 Express delivery: 2-3 days (₹99)\n\nTrack your order anytime from your profile page!",
  return: "🔄 Easy Returns Policy:\n\n✅ 7-day hassle-free returns\n📦 Items must be unused with original packaging\n💰 Refunds processed in 5-7 business days\n📞 Need help? Contact our support team!\n\nYour satisfaction is our priority! 😊",
  payment: "💳 Payment Options:\n\n• UPI (PhonePe, GPay, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Cash on Delivery (COD)\n\n🔒 All transactions are 100% secure!\n\nNote: Currently in demo mode - no actual payments processed.",
  about: "🌟 Welcome to Jhakaas Bazaar! 🇮🇳\n\nWe celebrate India's finest artisans and craftspeople, bringing you:\n\n🎨 Authentic handicrafts\n💍 Traditional jewelry\n👗 Beautiful apparel\n🏠 Exquisite home décor\n\nDirect from local creators to your doorstep! ✨",
  greeting: "🙏 Namaste! Welcome to Jhakaas Bazaar! 🛍️\n\nI'm your personal shopping assistant. I can help you:\n\n🔍 Search products\n⭐ Get recommendations\n📦 Track orders\n💰 Learn about offers\n❓ Answer questions\n\nWhat would you like to explore today?",
};

// Helper function to detect query intent with better accuracy
const detectIntent = (message) => {
  const lowerMsg = message.toLowerCase();
  
  // Greetings
  if (lowerMsg.match(/^(hi|hello|hey|namaste|hola|greetings)/)) return 'greeting';
  
  // Order tracking
  if (lowerMsg.includes('track') || lowerMsg.includes('order status') || lowerMsg.includes('my order')) return 'track';
  
  // Shipping
  if (lowerMsg.includes('ship') || lowerMsg.includes('deliver') || lowerMsg.includes('courier')) return 'shipping';
  
  // Returns
  if (lowerMsg.includes('return') || lowerMsg.includes('refund') || lowerMsg.includes('exchange')) return 'return';
  
  // Payment
  if (lowerMsg.includes('payment') || lowerMsg.includes('pay') || lowerMsg.includes('cod') || lowerMsg.includes('upi')) return 'payment';
  
  // About
  if (lowerMsg.includes('about') || lowerMsg.includes('who are you') || lowerMsg.includes('what is jhakaas')) return 'about';
  
  // Product search with better keywords
  if (lowerMsg.includes('search') || lowerMsg.includes('find') || lowerMsg.includes('product') || 
      lowerMsg.includes('looking for') || lowerMsg.includes('show me') || lowerMsg.includes('need')) return 'search';
  
  // Recommendations
  if (lowerMsg.includes('recommend') || lowerMsg.includes('bestseller') || lowerMsg.includes('trending') || 
      lowerMsg.includes('popular') || lowerMsg.includes('suggest') || lowerMsg.includes('top')) return 'recommend';
  
  // Category queries
  if (lowerMsg.includes('categor') || lowerMsg.includes('type')) return 'categories';
  
  // Offers/Discounts
  if (lowerMsg.includes('offer') || lowerMsg.includes('discount') || lowerMsg.includes('sale') || 
      lowerMsg.includes('deal')) return 'offers';
  
  return 'general';
};

// Helper to extract product category from message
const extractCategory = (message) => {
  const categories = ['handicrafts', 'apparel', 'jewelry', 'home decor', 'accessories'];
  const lowerMsg = message.toLowerCase();
  
  for (const cat of categories) {
    if (lowerMsg.includes(cat.toLowerCase())) {
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  }
  return null;
};

// Helper to get conversation context
const getConversationContext = (messages) => {
  if (!messages || messages.length < 2) return null;
  
  const recentMessages = messages.slice(-4); // Last 4 messages
  return recentMessages.map(m => `${m.role}: ${m.content}`).join('\n');
};

// @route   POST /api/chat
// @desc    AI Chatbot endpoint with enhanced features
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ message: 'Message and sessionId are required' });
    }

    // Get chat history for context
    let chat = await Chat.findOne({ sessionId });
    const context = chat ? getConversationContext(chat.messages) : null;

    const intent = detectIntent(message);
    let responseText = '';

    // Handle different intents with enhanced responses
    if (intent === 'greeting') {
      responseText = mockResponses.greeting;
    } 
    else if (intent === 'track') {
      if (userId) {
        try {
          const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(3);
          if (orders.length > 0) {
            responseText = "📦 Here are your recent orders:\n\n";
            orders.forEach((order, idx) => {
              const emoji = order.status === 'Delivered' ? '✅' : 
                           order.status === 'Shipped' ? '🚚' : 
                           order.status === 'Processing' ? '⚙️' : 
                           order.status === 'Cancelled' ? '❌' : '🕐';
              responseText += `${idx + 1}. Order #${order._id.toString().slice(-6)}\n`;
              responseText += `   ${emoji} Status: ${order.status}\n`;
              responseText += `   💰 Total: ₹${order.totalPrice}\n`;
              responseText += `   📅 Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}\n\n`;
            });
            responseText += "View all orders on your Profile page! 📱";
          } else {
            responseText = "🤔 You don't have any orders yet. Start shopping and I'll help you track them! 🛍️";
          }
        } catch (err) {
          responseText = "📦 To track your orders, please log in and visit your Profile page!";
        }
      } else {
        responseText = "📦 To track your orders, please log in to your account! You can view all order details on your Profile page. 👤";
      }
    }
    else if (intent === 'search') {
      // Extract search term more intelligently
      const searchKeywords = ['search', 'find', 'looking for', 'show me', 'need', 'want'];
      let searchTerm = message;
      
      for (const keyword of searchKeywords) {
        const idx = message.toLowerCase().indexOf(keyword);
        if (idx !== -1) {
          searchTerm = message.substring(idx + keyword.length).trim();
          break;
        }
      }
      
      // Check for category first
      const category = extractCategory(message);
      let query = {};
      
      if (category) {
        query.category = category;
      } else if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ];
      }

      const products = await Product.find(query).limit(5);

      if (products.length > 0) {
        responseText = `🎉 Found ${products.length} amazing product${products.length > 1 ? 's' : ''} for you!\n\n`;
        products.forEach((p, idx) => {
          responseText += `${idx + 1}. 🛍️ **${p.name}**\n`;
          responseText += `   💰 ₹${p.price}\n`;
          responseText += `   📝 ${p.description.substring(0, 100)}${p.description.length > 100 ? '...' : ''}\n`;
          responseText += `   ⭐ ${p.rating} stars | 📦 Stock: ${p.stock}\n\n`;
        });
        responseText += "Visit our Shop page to see more details and add to cart! 🛒";
      } else {
        responseText = "😔 Couldn't find products matching your search.\n\n";
        responseText += "Try browsing these categories:\n";
        responseText += "🎨 Handicrafts | 👗 Apparel | 💍 Jewelry\n";
        responseText += "🏠 Home Décor | 👜 Accessories\n\n";
        responseText += "Or try searching with different keywords! 🔍";
      }
    } 
    else if (intent === 'recommend') {
      const featured = await Product.find({ featured: true }).limit(5);
      const highRated = await Product.find({}).sort({ rating: -1 }).limit(3);
      
      if (featured.length > 0) {
        responseText = "⭐ Here are our TOP trending products:\n\n";
        featured.forEach((p, idx) => {
          responseText += `${idx + 1}. 🏆 **${p.name}**\n`;
          responseText += `   💰 ₹${p.price} | ⭐ ${p.rating} stars\n`;
          responseText += `   ${p.description.substring(0, 80)}...\n\n`;
        });
      } else if (highRated.length > 0) {
        responseText = "⭐ Here are our highest-rated products:\n\n";
        highRated.forEach((p, idx) => {
          responseText += `${idx + 1}. 💎 **${p.name}**\n`;
          responseText += `   💰 ₹${p.price} | ⭐ ${p.rating} stars\n\n`;
        });
      } else {
        responseText = "Check out our Shop page for all amazing products! 🛍️";
      }
      responseText += "\nClick on any product to view details and add to cart! 🛒";
    }
    else if (intent === 'categories') {
      responseText = "🏪 Browse our amazing categories:\n\n";
      responseText += "🎨 **Handicrafts** - Traditional Indian art pieces\n";
      responseText += "👗 **Apparel** - Sarees, kurtas, and ethnic wear\n";
      responseText += "💍 **Jewelry** - Beautiful traditional ornaments\n";
      responseText += "🏠 **Home Décor** - Enhance your living space\n";
      responseText += "👜 **Accessories** - Complete your look\n\n";
      responseText += "Visit our Shop page to explore each category! ✨";
    }
    else if (intent === 'offers') {
      responseText = "🎁 **Current Offers:**\n\n";
      responseText += "🆓 Free shipping on orders above ₹999!\n";
      responseText += "🎊 Featured products have special prices\n";
      responseText += "💰 Bulk discounts available on selected items\n";
      responseText += "🎉 First-time users get a warm welcome!\n\n";
      responseText += "Shop now and save big! 🛍️";
    }
    else if (mockResponses[intent]) {
      responseText = mockResponses[intent];
    } 
    else {
      // Use OpenAI/Gemini if API key is provided
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
        try {
          const systemPrompt = `You are a helpful shopping assistant for Jhakaas Bazaar, an Indian eCommerce platform selling handicrafts, jewelry, apparel, home décor, and accessories. 
          Be friendly, use emojis appropriately, and keep responses concise (under 150 words). 
          Help users find products, answer questions about shipping/returns/payments, and provide excellent customer service.
          ${context ? `\n\nRecent conversation:\n${context}` : ''}`;

          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
              ],
              max_tokens: 200,
              temperature: 0.7,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              },
            }
          );

          responseText = response.data.choices[0].message.content;
        } catch (error) {
          console.error('OpenAI API error:', error.response?.data || error.message);
          responseText = "🤔 I'm here to help! You can ask me about:\n\n• 🔍 Product search\n• ⭐ Recommendations\n• 📦 Shipping & delivery\n• 🔄 Returns & refunds\n• 💳 Payment options\n• 📱 Order tracking\n\nWhat would you like to know?";
        }
      } else {
        // Enhanced fallback response
        responseText = "🤔 I'm not sure about that, but I'm here to help!\n\n";
        responseText += "I can assist you with:\n";
        responseText += "• 🔍 Searching products\n";
        responseText += "• ⭐ Product recommendations\n";
        responseText += "• 📦 Shipping information\n";
        responseText += "• 🔄 Return policy\n";
        responseText += "• 💳 Payment options\n";
        responseText += "• 📱 Order tracking\n\n";
        responseText += "What would you like to know? 😊";
      }
    }

    // Save chat history to database
    if (!chat) {
      chat = new Chat({ sessionId, messages: [] });
    }

    chat.messages.push({ role: 'user', content: message });
    chat.messages.push({ role: 'assistant', content: responseText });
    
    await chat.save();

    res.json({
      response: responseText,
      sessionId,
      intent, // Send intent back for frontend to potentially use
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Chat service error', error: error.message });
  }
});

// @route   GET /api/chat/:sessionId
// @desc    Get chat history for a session
// @access  Public
router.get('/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });
    
    if (chat) {
      res.json(chat.messages);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

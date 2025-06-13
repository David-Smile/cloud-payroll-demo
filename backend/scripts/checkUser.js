const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function checkUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Find test user
    const user = await User.findOne({ email: 'test@example.com' });
    if (user) {
      console.log('Test user found:', {
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      });
    } else {
      console.log('Test user not found');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error checking user:', err);
    process.exit(1);
  }
}

checkUser(); 
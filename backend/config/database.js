const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/mean_blog_db',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('✓ MongoDB connected');
    return connection;
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

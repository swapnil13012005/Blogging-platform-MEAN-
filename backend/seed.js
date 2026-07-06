#!/usr/bin/env node
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const MONGODB_URI = 'mongodb://localhost:27017/mean_blog_db';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});

    console.log('Creating demo users...');
    const users = await User.create([
      {
        username: 'alice',
        email: 'alice@blog.com',
        password: 'password123'
      },
      {
        username: 'bob',
        email: 'bob@blog.com',
        password: 'password123'
      },
      {
        username: 'charlie',
        email: 'charlie@blog.com',
        password: 'password123'
      }
    ]);
    console.log(`✓ Created ${users.length} users`);

    console.log('Creating demo posts...');
    const posts = await Post.create([
      {
        title: 'Getting Started with Node.js',
        content: 'Node.js is a powerful JavaScript runtime that allows you to build server-side applications. In this post, I\'ll guide you through the basics of Node.js and help you get started with your first project.',
        author: 'alice',
        userId: users[0]._id
      },
      {
        title: 'Understanding Express.js Middleware',
        content: 'Express.js middleware is the core concept that makes Express powerful. Learn how to create, use, and chain middleware functions to build robust web applications.',
        author: 'bob',
        userId: users[1]._id
      },
      {
        title: 'MongoDB Best Practices',
        content: 'MongoDB is a flexible NoSQL database. In this guide, we\'ll explore best practices for schema design, indexing, and query optimization in MongoDB.',
        author: 'charlie',
        userId: users[2]._id
      },
      {
        title: 'Angular Components and Services',
        content: 'Angular is a powerful framework for building dynamic web applications. Learn about components, services, dependency injection, and how they work together.',
        author: 'alice',
        userId: users[0]._id
      },
      {
        title: 'Building RESTful APIs with Express',
        content: 'RESTful API design is fundamental to modern web development. This comprehensive guide covers routing, controllers, middlewares, and best practices for building scalable APIs.',
        author: 'bob',
        userId: users[1]._id
      },
      {
        title: 'Security in the MEAN Stack',
        content: 'Security should be a top priority when building web applications. Learn about authentication with JWT, password hashing, CORS, and other security best practices.',
        author: 'charlie',
        userId: users[2]._id
      }
    ]);
    console.log(`✓ Created ${posts.length} posts`);

    console.log('\n✓ Database seeded successfully!');
    console.log('\nDemo Credentials:');
    console.log('  Username: alice    | Password: password123');
    console.log('  Username: bob      | Password: password123');
    console.log('  Username: charlie  | Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();

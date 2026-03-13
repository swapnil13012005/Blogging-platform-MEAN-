const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'username email');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = new Post({
      title,
      content,
      author: user.username,
      userId: req.userId
    });

    await post.save();
    res.status(201).json({ 
      message: 'Post created successfully',
      post 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only post author can update' });
    }

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    post.updatedAt = new Date();

    await post.save();
    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only post author can delete' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Setup/Seed data
exports.seedData = async (req, res) => {
  try {
    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});

    // Create demo users
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

    // Create demo posts
    const posts = await Post.create([
      {
        title: 'Getting Started with Python',
        content: 'Python is an incredible programming language that powers everything from web applications to machine learning. In this post, I\'ll share some tips for beginners who are just starting their Python journey.',
        author: 'alice',
        userId: users[0]._id
      },
      {
        title: 'The Art of Writing Clean Code',
        content: 'Clean code is not just about functionality—it\'s about creating code that other developers can understand. In this article, I explore the principles of clean code, including meaningful names, small functions, proper error handling.',
        author: 'bob',
        userId: users[1]._id
      },
      {
        title: 'Web Development Trends in 2026',
        content: 'The web development landscape is constantly evolving. From React and Vue.js to emerging frameworks, there\'s always something new to learn. This post covers the latest trends in frontend development.',
        author: 'charlie',
        userId: users[2]._id
      },
      {
        title: 'Database Design Best Practices',
        content: 'A well-designed database is the backbone of any robust application. This comprehensive guide covers normalization, indexing strategies, query optimization, and security considerations.',
        author: 'alice',
        userId: users[0]._id
      },
      {
        title: 'Understanding API Development',
        content: 'RESTful APIs have become the standard for web communication. In this post, I break down the core concepts of API design, including endpoints, HTTP methods, status codes, and error handling.',
        author: 'bob',
        userId: users[1]._id
      },
      {
        title: 'JavaScript Async/Await Explained',
        content: 'Asynchronous programming can be tricky, but JavaScript\'s async/await syntax makes it much more readable. This guide explains promises, callbacks, and how async/await simplifies asynchronous code.',
        author: 'charlie',
        userId: users[2]._id
      }
    ]);

    res.json({
      message: 'Database seeded successfully',
      users: users.length,
      posts: posts.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

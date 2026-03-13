# MEAN Blog Platform

A full-stack blogging application built with the **MEAN Stack**:
- **M**ongoDB - NoSQL Database
- **E**xpress.js - Backend Framework
- **A**ngular - Frontend Framework (Modern Browser API)
- **N**ode.js - JavaScript Runtime

## Project Structure

```
mean-blog/
├── models/              # Mongoose schemas (User, Post)
├── controllers/         # Business logic
├── routes/              # API endpoints
├── middleware/          # Authentication middleware
├── public/              # Static frontend files
├── config/              # Configuration files
├── server.js            # Express server entry point
├── package.json         # Node.js dependencies
├── .env                 # Environment variables
└── .gitignore          # Git ignore rules
```

## Prerequisites

- Node.js v14+ 
- MongoDB running on localhost:27017
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running:
```bash
mongod
```

3. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The app will be available at: **http://localhost:5000**

## Technology Stack

### Backend
- **Express.js** - REST API framework
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5 / CSS3** - Structure and styling
- **Vanilla JavaScript** - Frontend logic
- **Bootstrap 5** - UI Components
- **localStorage** - Client-side token storage

### Database
- **MongoDB** - NoSQL database
- Collections: users, posts

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (requires auth)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)
- `POST /api/posts/setup/seed` - Seed demo data

## Demo Credentials

After seeding the database, you can login with:
- Username: alice | Password: password123
- Username: bob | Password: password123
- Username: charlie | Password: password123

## Features

✅ User registration and authentication
✅ JWT-based authorization
✅ Create, read, update, delete blog posts
✅ User-based post authorization (only authors can delete)
✅ Responsive UI with Bootstrap
✅ Real-time post updates
✅ Password hashing with bcrypt
✅ REST API architecture

## Development

The server runs on port 5000 by default. MongoDB should be running on localhost:27017.

For production deployment:
1. Add environment variables for MongoDB URI and JWT secret
2. Build optimized frontend assets
3. Use a production-grade server (Gunicorn, PM2, etc.)

## License

MIT

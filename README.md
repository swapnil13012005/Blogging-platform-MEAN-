# MEAN Blog Platform

[![Angular](https://img.shields.io/badge/Angular-21.2-red?logo=angular)](https://angular.io)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-black?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com)
[![JWT](https://img.shields.io/badge/JWT-9.0-blue)](https://jwt.io)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)](https://getbootstrap.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack blogging platform built with the MEAN stack (MongoDB, Express, Angular, Node.js) featuring user authentication with JWT, blog CRUD operations, and a responsive UI with Bootstrap 5.

## ✨ Features

- ✅ **User Authentication** - Registration, login, and JWT token management
- ✅ **Blog CRUD** - Create, read, update, and delete blog posts
- ✅ **Protected Routes** - Role-based access control with guards
- ✅ **Responsive Design** - Mobile-friendly UI with Bootstrap 5
- ✅ **Real-time Loading States** - Loading spinners and error handling
- ✅ **Production Ready** - Security headers, rate limiting, compression

## 🛠 Tech Stack

### Frontend
- **Angular 21.2** - Modern SPA framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Bootstrap 5** - Responsive UI components
- **Reactive Forms** - Form validation and management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure token-based authentication
- **Helmet** - Security headers
- **Morgan** - HTTP request logging
- **Express Rate Limit** - API rate limiting

### Database
- **MongoDB Atlas** - Cloud database (production)
- **MongoDB Local** - Development database

## 📁 Folder Structure

```
blogging-platform-mean/
├── backend/                    # Express API & MongoDB
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth, error handling
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── config/                # Configuration
│   ├── server.js              # Express app
│   ├── .env.example           # Environment template
│   └── package.json
│
├── frontend/                   # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable components
│   │   │   ├── pages/        # Page components
│   │   │   ├── services/     # HTTP & Auth services
│   │   │   ├── guards/       # Route guards
│   │   │   ├── interceptors/ # HTTP interceptors
│   │   │   └── models/       # TypeScript interfaces
│   │   ├── environments/     # Environment configs
│   │   └── styles.css        # Global styles
│   ├── angular.json           # Angular config
│   └── package.json
│
├── README.md                  # This file
├── .gitignore                # Git ignore rules
└── .env.example              # Backend env template
```

## 🚀 Installation

### Prerequisites
- **Node.js** v20+ ([Download](https://nodejs.org))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** v11+ (comes with Node.js)

### Clone Repository

```bash
git clone https://github.com/swapnil13012005/Blogging-platform-MEAN-.git
cd Blogging-platform-MEAN
```

## ⚙️ Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mean_blog_db

# JWT
JWT_SECRET=your_secret_key_here_minimum_32_characters
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:4200

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas:**
Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mean_blog_db
```

### 4. Start Backend Server

```bash
npm run dev    # Development with nodemon
npm start      # Production
```

✅ Backend running at `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Update Environment (if needed)

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  apiUrl: 'http://localhost:5000/api'
};
```

### 3. Start Development Server

```bash
ng serve --proxy-config src/proxy.conf.json
```

✅ Frontend running at `http://localhost:4200`

## 🏃 Running Development

Start both servers in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
ng serve --proxy-config src/proxy.conf.json
```

Open http://localhost:4200 in your browser.

## 📦 Production Build

### Build Frontend

```bash
cd frontend
npm run build
```

Output: `frontend/dist/browser/`

### Production Server

```bash
cd backend
NODE_ENV=production npm start
```

The backend automatically serves the Angular build from `frontend/dist/browser/`.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Blogs
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Health
- `GET /health` - Server health check

## 📚 API Documentation

### Register User

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "65f...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### Get Current User

**Request:**
```http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

**Response (200):**
```json
{
  "_id": "65f...",
  "username": "johndoe",
  "email": "john@example.com"
}
```

### Create Blog Post

**Request:**
```http
POST /api/posts
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Getting Started with MEAN",
  "content": "This is my first blog post..."
}
```

**Response (201):**
```json
{
  "_id": "65f...",
  "title": "Getting Started with MEAN",
  "content": "This is my first blog post...",
  "author": "johndoe",
  "userId": "65f...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Get All Posts

**Request:**
```http
GET /api/posts
```

**Response (200):**
```json
[
  {
    "_id": "65f...",
    "title": "Getting Started with MEAN",
    "content": "This is my first blog post...",
    "author": "johndoe",
    "userId": { "_id": "65f...", "username": "johndoe" },
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Post by ID

**Request:**
```http
GET /api/posts/65f...
```

### Update Post

**Request:**
```http
PUT /api/posts/65f...
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

### Delete Post

**Request:**
```http
DELETE /api/posts/65f...
Authorization: Bearer <your_jwt_token>
```

**Response (200):**
```json
{ "message": "Post deleted successfully" }
```

## 🔐 Security Features

- ✅ **Helmet.js** - HTTP security headers
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Rate Limiting** - API request throttling
- ✅ **JWT** - Secure token authentication
- ✅ **Input Validation** - Express-validator
- ✅ **Password Hashing** - bcryptjs
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **HTTPS Ready** - Production-grade security

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
ng test
```

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Login
![Login](docs/screenshots/login.png)

### Register
![Register](docs/screenshots/register.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Create Blog
![Create Blog](docs/screenshots/create-blog.png)

### Blog Details
![Blog Details](docs/screenshots/blog-detail.png)

## 🚀 Deployment

### Frontend - Vercel

```bash
cd frontend
npm run build
```

Push to GitHub and connect to Vercel for automatic deployment.

**Environment Variables:**
```
API_URL=your_backend_url/api
```

### Backend - Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

**Environment Variables (Render):**
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
CLIENT_URL=your_frontend_url
NODE_ENV=production
```

### Database - MongoDB Atlas

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to backend `.env`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For Atlas, verify IP whitelist and connection string

### CORS Errors
- Check `CLIENT_URL` in backend `.env`
- Ensure frontend dev server matches URL

### Build Errors
- Clear cache: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v20+)

### API Not Working
- Backend running on `http://localhost:5000`?
- Check JWT token in localStorage
- Verify authorization headers

## 📖 Documentation

- [Angular Docs](https://angular.io/docs)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT.io](https://jwt.io)

## 🎯 Future Improvements

- [ ] Add comment system for posts
- [ ] Implement post categories and tags
- [ ] Add search and filtering
- [ ] User profile customization
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Post pagination
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Image upload support

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/swapnil13012005)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Happy Blogging! 🚀📝**

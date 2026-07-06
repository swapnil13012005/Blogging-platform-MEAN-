# Blogging Platform (MEAN)

A full-stack blogging platform built with Node.js, Express, MongoDB, and Angular.

## Features
- User authentication with JWT
- Create, read, update, and delete blog posts
- Responsive Angular UI with Bootstrap 5
- Protected routes for authenticated users
- Blog details and profile pages

## Folder Structure
```text
Blogging-platform-MEAN/
├── backend/              # Express + MongoDB API
├── frontend/             # Angular application
└── README.md             # Project documentation
```

## Installation

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
ng serve --proxy-config src/proxy.conf.json
```

## Environment Variables
Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mean_blog_db
JWT_SECRET=your_jwt_secret_key
```

## Running the App
- Backend: http://localhost:5000
- Frontend: http://localhost:4200

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id

## Screenshots
Add screenshots of the home page, login, create post, and blog details here.

## Future Improvements
- Edit and delete actions from the UI
- Image uploads
- Comments and likes
- Admin dashboard

# MEAN Blogs

MEAN Blogs is a full-stack blogging platform built with MongoDB, Express, Angular, and Node.js. Users can create accounts, publish and manage their own posts, browse posts from the community, and use Google Gemini to improve their writing.

## Features

- User registration and JWT authentication
- Public feed containing posts from every author
- Personal **My Blogs** page
- Create, read, update, and delete blog posts
- Ownership checks for editing and deleting posts
- User profile page with logout
- Gemini-powered writing suggestions and corrections
- Undo option after applying an AI correction
- Responsive Bootstrap interface
- MongoDB Atlas support
- API validation, rate limiting, security headers, and compression
- Angular SPA served by Express in production

## Technology

| Area | Technology |
| --- | --- |
| Frontend | Angular 21, TypeScript, RxJS, Bootstrap 5 |
| Backend | Node.js, Express 4 |
| Database | MongoDB and Mongoose |
| Authentication | JWT and bcryptjs |
| AI | Google Gemini through `@google/genai` |
| Deployment | Render |

## Project structure

```text
Blogging-platform-MEAN-/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── app/
        │   ├── components/
        │   ├── guards/
        │   ├── interceptors/
        │   ├── models/
        │   ├── pages/
        │   └── services/
        └── environments/


```

## Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB Atlas cluster or local MongoDB server
- A Google Gemini API key for the AI tools

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/swapnil13012005/Blogging-platform-MEAN-.git
cd Blogging-platform-MEAN-
```

### 2. Configure the backend

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/mean_blog_db?retryWrites=true&w=majority

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:4200

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3-flash-preview
```

Replace the MongoDB username, password, and cluster address. URL-encode special characters in the password. Never commit the `.env` file.

### 3. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 5. Start the frontend

In another terminal, from the `frontend` directory:

```bash
npm start -- --proxy-config src/proxy.conf.json
```

Open `http://localhost:4200`.

The proxy forwards `/api` requests to `http://localhost:5000`, so the same frontend API path works locally and in production.

## Demo data

`backend/seed.js` creates three demo users and sample posts. Currently, it targets local MongoDB at `mongodb://localhost:27017/mean_blog_db`.

> **Warning:** the seed script deletes every existing user and post before inserting demo data. Do not run it against a database containing data you want to keep.

Run it only when you intentionally want to reset the local demo database:

```bash
cd backend
node seed.js
```

Demo credentials:

| Username | Password |
| --- | --- |
| `alice` | `password123` |
| `bob` | `password123` |
| `charlie` | `password123` |

## API endpoints

### Authentication

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create an account |
| POST | `/api/auth/login` | Public | Sign in and receive a token |
| GET | `/api/auth/me` | Authenticated | Get the current user |

### Blog posts

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/posts` | Public | Get all posts |
| GET | `/api/posts/mine` | Authenticated | Get the current user's posts |
| GET | `/api/posts/:id` | Public | Get one post |
| POST | `/api/posts` | Authenticated | Create a post |
| PUT | `/api/posts/:id` | Owner | Update a post |
| DELETE | `/api/posts/:id` | Owner | Delete a post |

### AI writing assistance

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/ai/review` | Authenticated | Suggest improvements or correct writing |

Example request:

```json
{
  "title": "How Technology Changes Our Lives",
  "content": "Your blog content goes here.",
  "action": "suggest"
}
```

Supported actions are `suggest` and `correct`. Authenticated requests must include:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Production build

Build the Angular application:

```bash
cd frontend
npm ci
npm run build
```

Express serves the generated Angular application from:

```text
frontend/dist/frontend/browser
```

Start the production server from `backend`:

```bash
npm ci
npm start
```

## Deploying on Render

Create a Render Web Service connected to this repository and use:

**Build command**

```bash
cd frontend && npm ci && npm run build && cd ../backend && npm ci
```

**Start command**

```bash
cd backend && npm start
```

Add these environment variables privately in Render:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRE=7d
CLIENT_URL=https://your-render-service.onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3-flash-preview
```

`PORT` is supplied automatically by Render.

## Useful commands

### Backend

```bash
npm run dev   # Start with nodemon
npm start     # Start with Node.js
```

### Frontend

```bash
npm start     # Start Angular development server
npm run build # Create a production build
npm run watch # Rebuild when files change
```

## Security

- Passwords are hashed before storage.
- Protected routes require a valid JWT.
- Only a post's owner can update or delete it.
- API input is validated with `express-validator`.
- Helmet, rate limiting, CORS, and request-size limits are enabled.
- Secrets belong in environment variables and must never be committed.

## License

This project is available under the [MIT License](LICENSE).
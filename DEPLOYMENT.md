# Deployment Guide

This guide provides step-by-step instructions for deploying the MEAN Blog Platform to production.

## Table of Contents
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Deployment](#database-deployment)
- [Environment Variables](#environment-variables)
- [Production Checklist](#production-checklist)

---

## Frontend Deployment

### Vercel

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create `vercel.json` in the root of frontend:**
   ```json
   {
     "buildCommand": "ng build",
     "outputDirectory": "dist/frontend",
     "env": {
       "API_URL": "@api_url"
     }
   }
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

4. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set build settings:
     - Framework Preset: `Other`
     - Build Command: `npm run build`
     - Output Directory: `dist/frontend`

5. **Set environment variables in Vercel:**
   ```
   API_URL=https://your-backend-url.com/api
   ```

### Netlify

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist/frontend"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist/frontend`

4. **Set environment variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add: `API_URL=https://your-backend-url.com/api`

---

## Backend Deployment

### Render

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Backend ready for Render"
   git push origin main
   ```

2. **Create `render.yaml` in backend folder:**
   ```yaml
   services:
     - type: web
       name: mean-blog-api
       runtime: node
       buildCommand: npm install
       startCommand: node server.js
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 5000
   ```

3. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select repository and branch
   - Build settings:
     - Name: `mean-blog-api`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `node server.js`

4. **Set environment variables:**
   - Go to Service settings → Environment
   - Add:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=https://your-frontend-url.com
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=100
     ```

### Railway

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Backend ready for Railway"
   git push origin main
   ```

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's Node.js

3. **Set environment variables:**
   - Go to Variables
   - Add:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=https://your-frontend-url.com
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=100
     ```

### Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku app:**
   ```bash
   cd backend
   heroku create mean-blog-api
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_jwt_secret_key
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

---

## Database Deployment

### MongoDB Atlas

1. **Create account:**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create a cluster:**
   - Click "Create a Deployment"
   - Select "MongoDB Atlas"
   - Choose cloud provider and region
   - Select cluster tier (free tier available)
   - Create cluster

3. **Get connection string:**
   - Click "Connect"
   - Select "Drivers"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

4. **Update backend environment:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mean_blog_db
   ```

5. **Create database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username and password
   - Click "Create User"

6. **Whitelist IP addresses:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Add your IP
   - For production: Add 0.0.0.0/0 (allows all IPs)

---

## Environment Variables

### Backend Production (.env)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mean_blog_db

# JWT
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRE=7d

# CORS
CLIENT_URL=https://your-frontend-url.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### Frontend Production

Set environment variables in your deployment platform:
```
API_URL=https://your-backend-url.com/api
```

---

## Production Checklist

### Security
- [ ] JWT_SECRET is unique and strong (minimum 32 characters)
- [ ] MongoDB credentials are secure
- [ ] CORS is configured for your frontend domain only
- [ ] Rate limiting is enabled
- [ ] Helmet.js security headers are active
- [ ] All sensitive data is in environment variables
- [ ] HTTPS is enabled on frontend and backend
- [ ] MongoDB has IP whitelist configured

### Performance
- [ ] Frontend build is minified and optimized
- [ ] Backend compression is enabled
- [ ] Database indexes are created
- [ ] Lazy loading is enabled in Angular
- [ ] CDN is configured for static assets

### Monitoring
- [ ] Error logging is configured
- [ ] Health check endpoint is working (`/health`)
- [ ] Monitor uptime (use UptimeRobot or similar)
- [ ] Set up alerts for API errors

### Database
- [ ] Regular backups are configured
- [ ] Database indexes are optimized
- [ ] Backup retention policy is set
- [ ] Test restore procedure

### Documentation
- [ ] API documentation is accessible
- [ ] Deployment process is documented
- [ ] Rollback procedure is documented
- [ ] Team has access to deployment credentials

---

## Troubleshooting

### Deployment Errors

**Build fails on deployment:**
- Check Node.js version matches local development
- Ensure all dependencies are in `package.json`
- Check for hardcoded paths

**API not connecting to frontend:**
- Verify `CLIENT_URL` in backend matches frontend URL
- Check CORS configuration
- Verify JWT token is being sent correctly

**MongoDB connection timeout:**
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Ensure MongoDB user has proper permissions

**Frontend shows blank page:**
- Check browser console for errors
- Verify API URL environment variable
- Check if Angular build succeeded

---

## Security Best Practices

1. **Use environment variables** for all sensitive data
2. **Enable HTTPS** on all connections
3. **Use strong JWT secrets** (minimum 32 characters)
4. **Enable rate limiting** to prevent abuse
5. **Use Helmet.js** for security headers
6. **Validate and sanitize** all user input
7. **Use MongoDB Atlas** IP whitelist
8. **Enable database backups** with point-in-time recovery
9. **Monitor logs** for suspicious activity
10. **Regular security audits** and updates

---

## Performance Optimization

1. **Backend:**
   - Enable compression
   - Use rate limiting
   - Implement caching
   - Optimize database queries
   - Use CDN for static files

2. **Frontend:**
   - Lazy load routes
   - Code splitting
   - Minify and compress assets
   - Use production build
   - Implement service workers

3. **Database:**
   - Create indexes on frequently queried fields
   - Enable compression in MongoDB
   - Archive old data
   - Monitor query performance

---

## Support

For deployment issues, refer to:
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

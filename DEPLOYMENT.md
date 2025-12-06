# 🚀 Deployment Guide - Hospital Management System

This guide will help you deploy your Hospital Management System to production.

## 📋 Prerequisites

1. **GitHub Account** - Your code is already on GitHub
2. **MongoDB Atlas Account** - Free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Vercel Account** - For frontend deployment (free) - [vercel.com](https://vercel.com)
4. **Railway Account** - For backend deployment (free tier) - [railway.app](https://railway.app)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new cluster (choose free tier M0)

2. **Configure Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Atlas Admin"

3. **Configure Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Or add specific IPs for production

4. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hospital-management?retryWrites=true&w=majority`

---

## 🔧 Step 2: Deploy Backend (Railway)

### Option A: Railway (Recommended - Free Tier Available)

1. **Sign Up**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Hospital-Management-System` repository
   - Select the `server` folder as root directory

3. **Configure Environment Variables**
   - Go to "Variables" tab
   - Add these variables:
     ```
     PORT=6000
     MONGO_URI=your_mongodb_atlas_connection_string
     NODE_ENV=production
     ```

4. **Deploy**
   - Railway will automatically detect Node.js
   - It will run `npm install` and `npm start`
   - Wait for deployment to complete

5. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL - you'll need it for frontend

### Option B: Render (Alternative)

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Set root directory to `server`
5. Add environment variables (same as Railway)
6. Deploy

---

## 🎨 Step 3: Deploy Frontend (Vercel)

1. **Sign Up**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Add Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app/api
     ```
   - Replace with your actual backend URL from Step 2

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will provide a URL like: `https://your-app.vercel.app`

---

## 🔄 Step 4: Update CORS Settings

Update your server to allow requests from your frontend domain:

```javascript
// In server/server.js
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));
```

Or for all origins (development only):
```javascript
app.use(cors());
```

---

## ✅ Step 5: Verify Deployment

1. **Test Backend**
   - Visit: `https://your-backend.railway.app`
   - Should see: "🏥 Hospital Management System API is Running"

2. **Test Frontend**
   - Visit: `https://your-frontend.vercel.app`
   - Should load the login page

3. **Test API Connection**
   - Open browser console
   - Try logging in
   - Check for any CORS or API errors

---

## 🔐 Step 6: Update API URL in Production

If you need to update the API URL after deployment:

1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Update `REACT_APP_API_URL`
5. Redeploy

---

## 📝 Environment Variables Summary

### Backend (Railway/Render)
```
PORT=6000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-management
NODE_ENV=production
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Failed**
   - Check MongoDB Atlas network access (allow 0.0.0.0/0)
   - Verify connection string is correct
   - Check username/password

2. **Port Issues**
   - Railway/Render sets PORT automatically
   - Use `process.env.PORT || 6000` in server.js

### Frontend Issues

1. **API Not Connecting**
   - Check `REACT_APP_API_URL` environment variable
   - Verify backend URL is correct
   - Check CORS settings on backend

2. **Build Fails**
   - Check for TypeScript/ESLint errors
   - Verify all dependencies are in package.json

---

## 🔗 Quick Deploy Links

- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Vercel:** https://vercel.com
- **Railway:** https://railway.app
- **Render:** https://render.com

---

## 📞 Support

If you encounter issues:
1. Check deployment logs in Railway/Vercel dashboard
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible

---

**Good luck with your deployment! 🚀**


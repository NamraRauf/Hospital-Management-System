# ⚡ Quick Deployment Guide

Follow these steps to deploy your HMS project in 15 minutes!

## 🎯 Quick Steps

### 1️⃣ MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account → Create cluster (Free M0)
3. Database Access → Add user (save username/password!)
4. Network Access → Allow from anywhere (0.0.0.0/0)
5. Database → Connect → Copy connection string
6. Replace `<password>` in connection string with your password

**Save this connection string!** You'll need it next.

---

### 2️⃣ Deploy Backend - Railway (5 minutes)

1. Go to https://railway.app/new
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository: `NamraRauf/Hospital-Management-System`
5. Click the three dots → "Configure Root Directory"
6. Set root to: `server`
7. Go to "Variables" tab, add:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   PORT=6000
   NODE_ENV=production
   ```
8. Railway will auto-deploy! Wait 2-3 minutes
9. Click on your service → "Settings" → Copy the domain (e.g., `https://your-app.railway.app`)

**Save this backend URL!** You'll need it for frontend.

---

### 3️⃣ Deploy Frontend - Vercel (5 minutes)

1. Go to https://vercel.com/new
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository: `NamraRauf/Hospital-Management-System`
5. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `build` (auto-detected)
6. Go to "Environment Variables"
7. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
   (Replace with your Railway backend URL from step 2)
8. Click "Deploy"
9. Wait 2-3 minutes for build
10. Copy your live URL (e.g., `https://your-app.vercel.app`)

---

## ✅ Done! 

Your app is now live! 🎉

- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-app.railway.app

## 🧪 Test It

1. Visit your Vercel URL
2. Try logging in with:
   - Email: `superadmin@hospital.com`
   - Password: `superadmin123`

## 🔧 If Something Breaks

1. **Backend not working?**
   - Check Railway logs: Railway dashboard → Your service → "Deployments" → "View Logs"
   - Verify MONGO_URI is correct
   - Check MongoDB Atlas network access

2. **Frontend can't connect to backend?**
   - Verify `REACT_APP_API_URL` in Vercel environment variables
   - Check backend URL is correct (should end with `/api`)
   - Open browser console (F12) to see errors

3. **CORS errors?**
   - Backend CORS is configured to allow Vercel domains
   - If issues persist, check server logs

---

## 📝 What You Need

- ✅ MongoDB Atlas connection string
- ✅ Railway backend URL
- ✅ Vercel frontend URL

**That's it! Your project is live! 🚀**


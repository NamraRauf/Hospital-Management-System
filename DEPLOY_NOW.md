# 🚀 DEPLOY YOUR PROJECT LIVE - SIMPLE GUIDE

## ✅ Your project is ready! Follow these steps:

---

## 📦 STEP 1: Push to GitHub (5 minutes)

1. **Get GitHub Token:**
   - Go to: https://github.com/settings/tokens/new
   - Click "Generate token"
   - Copy the token (starts with `ghp_`)

2. **Push your code:**
   ```bash
   git push origin master
   ```
   - Username: `NamraRauf`
   - Password: [paste your token]

---

## 🗄️ STEP 2: Set Up MongoDB Atlas (5 minutes)

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (FREE)

2. **Create Cluster:**
   - Click "Create" → Choose FREE tier (M0)
   - Wait 3-5 minutes for cluster to create

3. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hospital-management?retryWrites=true&w=majority`

**SAVE THIS CONNECTION STRING!**

---

## ⚙️ STEP 3: Deploy Backend to Railway (5 minutes)

1. **Sign Up:**
   - Go to: https://railway.app/new
   - Click "Login with GitHub"

2. **Create Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `NamraRauf/Hospital-Management-System`

3. **Configure:**
   - Click on your service
   - Go to "Settings" → "Root Directory"
   - Set to: `server`
   - Click "Save"

4. **Add Environment Variables:**
   - Go to "Variables" tab
   - Click "New Variable"
   - Add these:
     ```
     MONGO_URI = [paste your MongoDB connection string]
     PORT = 6000
     NODE_ENV = production
     ```

5. **Deploy:**
   - Railway will auto-deploy
   - Wait 2-3 minutes
   - Go to "Settings" → Copy your domain (e.g., `https://your-app.railway.app`)

**SAVE THIS BACKEND URL!**

---

## 🎨 STEP 4: Deploy Frontend to Vercel (5 minutes)

1. **Sign Up:**
   - Go to: https://vercel.com/new
   - Click "Login with GitHub"

2. **Import Project:**
   - Click "Add New Project"
   - Import: `NamraRauf/Hospital-Management-System`

3. **Configure:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `build` (auto)

4. **Add Environment Variable:**
   - Go to "Environment Variables"
   - Click "Add"
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.railway.app/api`
   - (Use your Railway URL from Step 3)

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy your live URL (e.g., `https://your-app.vercel.app`)

---

## ✅ DONE! Your Project is LIVE!

- **Frontend URL:** https://your-app.vercel.app
- **Backend URL:** https://your-app.railway.app

**Anyone can now access your project!** 🎉

---

## 🔑 Login Credentials (for your live site):

- **Email:** `superadmin@hospital.com`
- **Password:** `superadmin123`

---

## 🆘 Need Help?

If something doesn't work:
1. Check Railway logs (Railway dashboard → Your service → Logs)
2. Check Vercel logs (Vercel dashboard → Your project → Deployments → View logs)
3. Check browser console (F12) for errors

---

**Total Time: ~20 minutes**
**Cost: FREE (both platforms have free tiers)**


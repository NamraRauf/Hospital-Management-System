# 🔧 Hospital Management System - Troubleshooting Guide

## **Common Issues & Solutions**

### **1. Setup Problems**

#### **Issue: "npm install fails"**
```bash
# Solution 1: Clear npm cache
npm cache clean --force
npm install

# Solution 2: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 3: Use different npm registry
npm install --registry https://registry.npmjs.org/
```

#### **Issue: "Cannot find module" errors**
```bash
# Make sure you're in the right directory
cd server  # for backend dependencies
npm install

cd ../client  # for frontend dependencies  
npm install

# Or install all at once from root
npm run install-all
```

### **2. Database Connection Issues**

#### **Issue: "MongoDB connection failed"**
```bash
# Check your .env file in server folder
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_secret_key
PORT=5000

# Common fixes:
1. Check internet connection
2. Verify MongoDB Atlas credentials
3. Whitelist your IP address in MongoDB Atlas
4. Ensure database user has read/write permissions
```

#### **Issue: "Cannot connect to local MongoDB"**
```bash
# If using local MongoDB:
1. Start MongoDB service:
   - Windows: net start MongoDB
   - Mac: brew services start mongodb-community
   - Linux: sudo systemctl start mongod

2. Update .env:
   MONGO_URI=mongodb://localhost:27017/hospital_management_system
```

### **3. Server Won't Start**

#### **Issue: "Port already in use"**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

#### **Issue: "JWT_SECRET not found"**
```bash
# Make sure .env file exists in server folder with:
JWT_SECRET=your_super_secret_key_here_minimum_32_characters
```

### **4. Frontend Issues**

#### **Issue: "React app won't start"**
```bash
# Navigate to client folder
cd client

# Clear cache and restart
npm start -- --reset-cache

# If port 3000 is busy
PORT=3001 npm start
```

#### **Issue: "API calls failing"**
```bash
# Check if backend is running on http://localhost:5000
# Verify API endpoints in client/src/services/api.js
# Check browser console for CORS errors
```

### **5. Authentication Problems**

#### **Issue: "Login not working"**
```bash
# Check browser console for errors
# Verify user exists in database
# Check JWT token in localStorage
# Ensure password is being hashed correctly
```

#### **Issue: "Token expired" errors**
```bash
# Clear localStorage
localStorage.clear()

# Or extend token expiry in server/controllers/authController.js
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
```

## **Step-by-Step Setup Verification**

### **1. Environment Check**
```bash
# Check Node.js version (should be 14+)
node --version

# Check npm version
npm --version

# Check if MongoDB is accessible
# For Atlas: Try connecting from MongoDB Compass
# For local: mongo --version
```

### **2. Project Structure Verification**
```
hospital-management-system/
├── server/
│   ├── .env ✓
│   ├── package.json ✓
│   ├── server.js ✓
│   └── node_modules/ ✓
├── client/
│   ├── package.json ✓
│   ├── src/ ✓
│   └── node_modules/ ✓
└── package.json ✓
```

### **3. Dependencies Check**
```bash
# In server folder
cd server
npm list --depth=0

# Should show: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv

# In client folder  
cd ../client
npm list --depth=0

# Should show: react, react-dom, react-router-dom, axios
```

## **Quick Test Commands**

### **Test Backend**
```bash
cd server
npm run server

# Should see:
# ✅ Starting server.js...
# 🚀 Server running on port 5000
# 🔄 Connecting to MongoDB...
# ✅ MongoDB Connected Successfully
```

### **Test Frontend**
```bash
cd client
npm start

# Should open browser at http://localhost:3000
# Should see Hospital Management System login page
```

### **Test API**
```bash
# Test server is running
curl http://localhost:5000

# Should return: "🏥 Hospital Management System API is Running"

# Test registration endpoint
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123","role":"patient"}'
```

## **Development Environment Setup**

### **Recommended VS Code Extensions**
```
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Thunder Client (for API testing)
- MongoDB for VS Code
```

### **Useful VS Code Settings**
```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## **Database Issues**

### **MongoDB Atlas Setup**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new project
4. Build cluster (free tier)
5. Create database user
6. Whitelist IP (0.0.0.0/0 for development)
7. Get connection string
8. Replace `<password>` with actual password

### **Local MongoDB Setup**
```bash
# Install MongoDB Community Edition
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

## **Git Setup (Recommended)**
```bash
# Initialize git repository
git init

# Add .gitignore
echo "node_modules/
.env
.DS_Store
build/
dist/" > .gitignore

# First commit
git add .
git commit -m "Initial Hospital Management System setup"

# Connect to GitHub (optional)
git remote add origin <your-repo-url>
git push -u origin main
```

## **Performance Optimization**

### **Backend Optimization**
```javascript
// Add to server.js for better performance
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add compression
const compression = require('compression');
app.use(compression());
```

### **Frontend Optimization**
```javascript
// Lazy loading components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

// Use React.memo for components
export default React.memo(ComponentName);
```

## **Security Checklist**
- [ ] Environment variables are not committed to Git
- [ ] Passwords are hashed with bcrypt
- [ ] JWT tokens have reasonable expiry time
- [ ] CORS is properly configured
- [ ] Input validation is implemented
- [ ] Error messages don't reveal sensitive information

## **Getting Help**

### **If you're still stuck:**
1. **Check browser console** for error messages
2. **Check terminal/command prompt** for server errors
3. **Verify all files** are in correct locations
4. **Double-check environment variables**
5. **Try restarting** both server and client
6. **Clear browser cache** and localStorage

### **Common Error Messages & Solutions**

**"Cannot GET /"**
- Backend server is not running
- Wrong port number
- Check server.js file

**"Network Error"**
- Frontend can't reach backend
- Check API base URL in api.js
- Ensure both servers are running

**"ValidationError"**
- Missing required fields
- Check data being sent to API
- Verify model schemas

**"MongooseError"**
- Database connection issue
- Check MONGO_URI in .env
- Verify MongoDB is running

---

## **Need More Help?**

If you're still facing issues, please share:
1. **What you're trying to do**
2. **What error message you're seeing**
3. **What steps you've already tried**
4. **Your operating system**
5. **Screenshots of errors (if applicable)**

I'm here to help you succeed with your FYP! 🎓
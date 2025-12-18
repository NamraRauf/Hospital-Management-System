# 🔧 Build Error Fix - "Build script returned non-zero exit code: 2"

## ❌ Problem
Netlify build fail ho raha hai: **"Build script returned non-zero exit code: 2"**

---

## ✅ Solution - Step by Step

### Step 1: Failed Deploy Par Click Karein

1. Netlify dashboard mein **"Deploys"** tab par hain
2. Failed deployment entry par click karein (red "Failed" wali)
3. **"Deploy log"** section open hoga
4. Error message ko detail mein dekhein

---

### Step 2: Build Settings Check Karein

1. **"Site configuration"** (ya "Deploy settings") par click karein
2. **"Build & deploy"** → **"Build settings"** par jayein
3. **"Edit settings"** par click karein

### Settings Verify Karein:

✅ **Branch to deploy:** `master`

✅ **Base directory:** `client` ⚠️ (YEH ZAROORI HAI!)

✅ **Build command:** 
   - Option 1: `npm run build` (agar base directory set hai)
   - Option 2: `cd client && npm install && npm run build`

✅ **Publish directory:** `build`

4. **"Save"** par click karein

---

### Step 3: Environment Variable Add Karein

1. **"Site configuration"** → **"Environment variables"** par jayein
2. Check karein ke `REACT_APP_API_URL` add hai ya nahi
3. Agar nahi hai to add karein:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.railway.app/api
   ```
4. **"Save"** par click karein

---

### Step 4: Clear Cache aur Retry Deploy

1. **"Deploys"** tab mein jayein
2. Failed deploy par click karein
3. **"Clear cache and retry deploy"** button par click karein
4. Ya **"Trigger deploy"** → **"Deploy site"** par click karein

---

## 🔍 Common Build Errors aur Solutions

### Error 1: "Cannot find module" ya "Missing dependencies"
**Solution:**
- Build command mein `npm install` zaroor include karein:
  ```
  cd client && npm install && npm run build
  ```

### Error 2: "Base directory not found"
**Solution:**
- Base directory: `client` set karein (not empty)

### Error 3: "Build directory not found"
**Solution:**
- Publish directory: `build` set karein
- Verify ke build successfully ho raha hai

### Error 4: "Environment variable not defined"
**Solution:**
- `REACT_APP_API_URL` environment variable add karein

---

## 🚀 Alternative Fix: Build Command Update

Agar phir bhi error aaye, build command ko update karein:

### Option 1: Simple Build Command
```
npm run build
```
(Base directory = `client` set karna hai)

### Option 2: Full Build Command
```
cd client && npm install && npm run build
```
(Base directory khali rakhein ya remove karein)

---

## 📋 Quick Checklist

Deploy retry karne se pehle verify karein:

- [ ] **Base directory:** `client` set hai
- [ ] **Build command:** `npm run build` ya `cd client && npm install && npm run build`
- [ ] **Publish directory:** `build` set hai
- [ ] **Environment variable:** `REACT_APP_API_URL` add hai
- [ ] Settings save kiye hain

---

## 🆘 Deploy Log Check Karne Ka Tarika

1. Failed deploy par click karein
2. Scroll down karein to "Deploy log" section
3. Error message ko carefully read karein
4. Error message mujhe share karein - main exact fix bata dunga

---

**Created:** December 18, 2024
**For:** Build Error Fix


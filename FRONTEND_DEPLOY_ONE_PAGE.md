# 🧾 Frontend Deploy (1 Page) — HMS (Netlify/Vercel)  

Ye guide **sirf frontend** deploy karne ke liye hai. Aapka backend already deploy hai, to bas frontend ko backend se connect karna hai.

> **Most common reason “kahin deploy nahi hota”**: GitHub repo me `node_modules/` accidentally committed/tracked hota hai → repo heavy → Netlify/Vercel clone/build fail.  

---

## ✅ Step 0 — Backend URL Ready Rakho

Apna backend URL aise hoga:

- `https://YOUR-BACKEND-DOMAIN.com`

Frontend env var me **ye value** use karo:

- `REACT_APP_API_URL=https://YOUR-BACKEND-DOMAIN.com/api`

---

## ⚡ Option A (FASTEST) — Netlify “Drag & Drop” (No GitHub needed)

Ye option sabse easy hai agar GitHub deploy fail ho raha ho.

### 1) Local build banao

Project root me:

```bash
cd "HMS nproject"
export REACT_APP_API_URL="https://YOUR-BACKEND-DOMAIN.com/api"
npm --prefix client install
npm --prefix client run build
```

Windows PowerShell:

```powershell
$env:REACT_APP_API_URL="https://YOUR-BACKEND-DOMAIN.com/api"
npm --prefix client install
npm --prefix client run build
```

### 2) Netlify par upload

- Netlify dashboard → **Sites** → **Add new site** → **Deploy manually**
- Folder select karo: `client/build`

**Done.**

---

## ✅ Option B — Netlify via GitHub (Recommended)

### 1) GitHub repo ko light karo (IMPORTANT)

Agar repo me `node_modules/` tracked hai, pehle remove karo:

```bash
git rm -r --cached node_modules server/node_modules client/node_modules
git commit -m "chore: remove node_modules from repo"
git push
```

> NOTE: `.gitignore` already `node_modules/` ignore karta hai, but **tracked files** ko manually remove karna parta hai.

### 2) Netlify settings

- **Base directory:** `client`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `build`
- **Environment variables:**
  - `REACT_APP_API_URL` = `https://YOUR-BACKEND-DOMAIN.com/api`

### 3) SPA routing fix

Repo me already:
- `netlify.toml` redirects ✅
- `client/public/_redirects` ✅

---

## ✅ Option C — Vercel (Recommended Alternative)

Vercel me:

- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Env var:** `REACT_APP_API_URL` = `https://YOUR-BACKEND-DOMAIN.com/api`

---

## 🔎 Quick Test (Deployment ke baad)

- Website open karo
- **Register** (patient) try karo
- **Login** try karo (doctor/patient)
- Agar error ho:
  - Browser console me check karo
  - Ensure `REACT_APP_API_URL` correct hai (ends with `/api`)

---

## ℹ️ Repo reference

Original repo: [NamraRauf/Hospital-Management-System](https://github.com/NamraRauf/Hospital-Management-System.git)



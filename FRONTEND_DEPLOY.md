# ✅ Frontend Deploy (Simple) — Hospital Management System

Repo: [NamraRauf/Hospital-Management-System](https://github.com/NamraRauf/Hospital-Management-System.git)

## 0) Sab se pehle (1 cheez confirm)

**Backend URL** chahiye hota hai, example:
- Backend: `https://your-backend-domain.com`
- Frontend ENV (must): **`REACT_APP_API_URL=https://your-backend-domain.com/api`**

> `REACT_APP_API_URL` ke end par **`/api`** lazmi add karo.

---

## Option A (Recommended): Netlify (GitHub se)

### Netlify steps
1. Netlify → **Add new site** → **Import an existing project** → GitHub repo select.
2. Agar Netlify aap se settings pooche to ye use karo:
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `build`
3. Site settings → **Environment variables**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-domain.com/api`
4. **Deploy site**

### Agar build fail ho:
- “react-scripts: command not found” → aap **client** directory ko build nahi kar rahe. Base directory `client` set karo.
- “Build returned non-zero exit code” → deploy log ke last 20 lines share karo.

---

## Option B: Vercel (GitHub se)

1. Vercel → **New Project** → repo import.
2. **Root Directory:** `client`
3. **Framework Preset:** Create React App
4. **Build Command:** `npm run build`
5. **Output Directory:** `build`
6. **Environment Variables:**
   - `REACT_APP_API_URL` = `https://your-backend-domain.com/api`
7. Deploy

---

## Option C: Render (Static Site)

1. Render → New → **Static Site**
2. Repo select
3. Settings:
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
   - **Env:** `REACT_APP_API_URL=https://your-backend-domain.com/api`
4. Create Static Site

---

## Option D (Fastest): Netlify Drag & Drop (No Git settings)

1. Local machine par:
   - `cd client`
   - `npm install`
   - `npm run build`
2. Netlify dashboard → **Deploy manually** (drag & drop)
3. Folder **`client/build`** ko drop kar do
4. Note: is method mein bhi API ke liye environment variable ka issue aa sakta hai — best Git-based deploy.

---

## Important: Backend routes (frontend kis endpoints ko hit karta hai)

Frontend calls:
- **Login:** `POST /api/auth/login`
- **Register (patient):** `POST /api/patients/register`

Is liye backend URL + `/api` bilkul correct hona chahiye.

---

## Agar ab bhi deploy nahi hota

Mujhe sirf 2 cheezen bhej do:
1. Aapka **backend live URL** (Railway/Render/etc)
2. Deploy log ki **last 20 lines** (Netlify/Vercel/Render)

Main exact 1-2 minute wala fix bata dunga.



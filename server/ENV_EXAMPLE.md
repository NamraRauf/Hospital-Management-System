### Backend env (Railway/Render/Local)

Set these environment variables:

- **PORT**: `6000` (production platforms usually override this automatically)
- **MONGO_URI**: `mongodb+srv://...` (MongoDB Atlas connection string)
- **JWT_SECRET**: `any-strong-random-string` (if you use JWT auth)
- **FRONTEND_URL**: `https://YOUR-FRONTEND-DOMAIN` (optional; server currently allows Netlify/Vercel patterns too)



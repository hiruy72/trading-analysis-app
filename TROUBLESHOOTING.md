# 🕵️‍♀️ Troubleshooting: Data Not Fetching After Deployment

If your app works locally but fails after deployment, it's usually one of these 3 common ssues.

## 1. Check Browser Console (Most Important)
Open your deployed app, press **F12** (or Right Click -> Inspect), go to the **Console** tab, and refresh the page.

### 🔴 Error: `Failed to fetch` or `Network Error`
**Cause:** The Frontend doesn't know where the Backend is.
**Fix:**
1.  Go to **Vercel Dashboard** -> Settings -> Environment Variables.
2.  Check `NEXT_PUBLIC_API_URL`.
    -   ❌ Incorrect: `http://localhost:8000/api` or missing.
    -   ✅ Correct: `https://your-backend-app.onrender.com/api` (or railway.app)
3.  **Redeploy Frontend** after changing this variable!

### 🔴 Error: `CORS policy: No 'Access-Control-Allow-Origin'`
**Cause:** The Backend is blocking the Frontend.
**Fix:**
1.  Go to **Render/Railway Dashboard** -> Environment Variables.
2.  Check `CORS_ALLOWED_ORIGINS`.
    -   ✅ Correct: `https://your-frontend-app.vercel.app` (No trailing slash!)
    -   Also verify `ALLOWED_HOSTS` includes your backend domain (e.g., `.onrender.com`).
3.  **Redeploy Backend**.

### 🔴 Error: `500 Internal Server Error`
**Cause:** The Backend is crashing.
**Fix:**
1.  Check your **Render/Railway Logs**.
2.  Look for Python errors (e.g., "ModuleNotFoundError", "Database Error").
3.  Ensure `PYTHON_VERSION` is set to `3.12.3` (as per previous fix).

---

## 💡 Quick Checklist
- [ ] Backend is deployed and “Healthy” (visit `https://your-backend.com/api/health/` in browser to check).
- [ ] Frontend `NEXT_PUBLIC_API_URL` points to Backend URL (HTTPS, not localhost).
- [ ] Backend `CORS_ALLOWED_ORIGINS` includes Frontend URL.

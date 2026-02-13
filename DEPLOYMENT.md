# 🚀 Deployment Guide

This guide covers how to deploy the **Trading Analysis App** to production. Since this is a full-stack application with separate backend (Django) and frontend (Next.js), we will deploy them as two separate services.

## 🏗️ Architecture Overview

- **Backend**: Django REST API (Hosted on Railway, Render, or DigitalOcean)
- **Frontend**: Next.js App (Hosted on Vercel)
- **Database**: PostgreSQL (Recommended for production, replaces SQLite)

---

## Backend Deployment (Django)

We recommend **Railway** or **Render** for easiest deployment of Python/Django apps.

### Option A: Deploy to Railway (Recommended)

1. **Sign up** at [railway.app](https://railway.app/).
2. **Create a New Project** -> **Deploy from GitHub repo**.
3. Select your repository.
4. Railway will auto-detect Python.
5. **Add Environment Variables** in Railway:
   - `SECRET_KEY`: (Generate a strong random string)
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `.railway.app, your-frontend-domain.vercel.app`
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app`
   
6. **Add a Database (Optional)**:
   - This app is configured to use **SQLite by default**, which works out-of-the-box (no setup needed).
   - If you want a persistent PostgreSQL database:
     Right-click on canvas -> New -> Database -> PostgreSQL.
     It will automatically provide `DATABASE_URL` env var to your Django app.

7. **Update `backend/config/settings.py`**:
   *(Already Configured)* We have updated `settings.py` to automatically use SQLite unless `DATABASE_URL` is provided. No manual changes needed!

8. **Start Command**:
   Railway usually detects `Procfile` or `manage.py`.
   Command: `gunicorn config.wsgi:application`
   (You need to add `gunicorn` to `requirements.txt`)

### Option B: Deploy to Render

1. **Sign up** at [render.com](https://render.com/).
2. Create **New Web Service**.
3. Connect your GitHub repo.
4. **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
5. **Start Command**: `gunicorn config.wsgi:application`
6. Add **Environment Variables** similarly to Railway.

---

## Frontend Deployment (Next.js)

Vercel is the creators of Next.js and offers the best hosting.

### Deploy to Vercel

1. **Sign up** at [vercel.com](https://vercel.com/).
2. **Import Project** -> Select your repository.
3. Configure Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (Important! Select the `frontend` folder)
   
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://trading-app-production.up.railway.app/api`)

5. **Deploy**: Click Deploy.

---

## 🔗 Connecting Frontend & Backend

Once both are deployed:

1. **Get Backend URL**: Copy the URL from Railway/Render (e.g., `https://my-api.railway.app`).
2. **Update Frontend**: Go to Vercel Dashboard -> Settings -> Environment Variables.
   - Set `NEXT_PUBLIC_API_URL` to your backend URL + `/api` (e.g., `https://my-api.railway.app/api`).
   - Redeploy the frontend.
3. **Update Backend**: Go to Railway/Render -> Variables.
   - Add your Vercel frontend domain to `CORS_ALLOWED_ORIGINS` (e.g., `https://my-trading-app.vercel.app`).
   - Add it to `ALLOWED_HOSTS` if needed.
   - Redeploy backend.

## ✅ Verification

- Open your Vercel URL.
- Check if data loads (charts, signals).
- If you see CORS errors in browser console, double-check `CORS_ALLOWED_ORIGINS` on backend.

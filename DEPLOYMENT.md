# 🚀 Deployment Guide - Movie Management System

This guide will help you deploy your Movie Management System to various hosting platforms.

## 📋 Table of Contents
1. [Render (Recommended - Free)](#render-deployment)
2. [Railway (Free Tier Available)](#railway-deployment)
3. [Heroku (Paid)](#heroku-deployment)
4. [Vercel (Free - Serverless)](#vercel-deployment)
5. [DigitalOcean App Platform](#digitalocean-deployment)

---

## 🎯 Render Deployment (Recommended)

Render offers free hosting for Node.js applications with MongoDB Atlas integration.

### Prerequisites
- GitHub account (✅ Already done)
- MongoDB Atlas account (free tier)

### Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/movieDB`)
5. Replace `<password>` with your actual password

### Step 2: Deploy to Render

1. Go to [Render](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `sDevrajsinh/NodeJS-Movie-Project`
4. Configure the service:
   - **Name**: `movie-management-system`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=3000
     NODE_ENV=production
     ```

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Your app will be live at: `https://movie-management-system.onrender.com`

### Important Notes for Render:
- Free tier apps sleep after 15 minutes of inactivity
- First request after sleep takes 30-50 seconds to wake up
- Upgrade to paid tier ($7/month) for always-on service

---

## 🚂 Railway Deployment

Railway offers $5 free credit per month.

### Steps:

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `sDevrajsinh/NodeJS-Movie-Project`
5. Railway will auto-detect Node.js and deploy
6. Add environment variables in the "Variables" tab:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=3000
   NODE_ENV=production
   ```
7. Click "Generate Domain" to get your public URL

---

## 🌐 Heroku Deployment

Heroku requires a paid plan (starting at $5/month).

### Steps:

1. Install Heroku CLI:
   ```bash
   npm install -g heroku
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app:
   ```bash
   heroku create movie-management-system
   ```

4. Add MongoDB Atlas connection:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set NODE_ENV=production
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

6. Open your app:
   ```bash
   heroku open
   ```

---

## ⚡ Vercel Deployment (Serverless)

**Note**: Vercel is optimized for serverless/static sites. For this Express app, Render or Railway is better.

### Steps:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create `vercel.json` in your project root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel dashboard

---

## 🌊 DigitalOcean App Platform

DigitalOcean offers $200 free credit for 60 days.

### Steps:

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Navigate to "Apps" → "Create App"
3. Connect your GitHub repository
4. Select `sDevrajsinh/NodeJS-Movie-Project`
5. Configure:
   - **Type**: Web Service
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
6. Add environment variables
7. Click "Create Resources"

---

## 🔧 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ `.env` file is in `.gitignore` (already done)
- ✅ MongoDB connection uses environment variable
- ✅ Port is configurable via `process.env.PORT`
- ✅ All dependencies are in `package.json`
- ✅ Start script is defined in `package.json`

---

## 🗄️ Database Options

### Free MongoDB Hosting:
1. **MongoDB Atlas** (Recommended)
   - 512MB free tier
   - Automatic backups
   - Global clusters
   - [Sign up here](https://www.mongodb.com/cloud/atlas)

2. **MongoDB Cloud (Render)**
   - Integrated with Render
   - Easy setup

---

## 📝 Environment Variables Required

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movieDB
PORT=3000
NODE_ENV=production
```

---

## 🎬 Post-Deployment Steps

1. Test all CRUD operations
2. Upload a test movie with poster
3. Verify image uploads work correctly
4. Check MongoDB connection
5. Test responsive design on mobile

---

## 🐛 Common Issues & Solutions

### Issue: App crashes on startup
**Solution**: Check logs for MongoDB connection errors. Verify `MONGODB_URI` is correct.

### Issue: Images not uploading
**Solution**: Ensure the hosting platform supports file uploads. Consider using cloud storage (AWS S3, Cloudinary) for production.

### Issue: App is slow
**Solution**: Free tiers have limitations. Upgrade to paid tier or optimize database queries.

### Issue: MongoDB connection timeout
**Solution**: Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access settings.

---

## 🚀 Recommended Hosting Platform

**For this project, I recommend Render because:**
- ✅ Free tier available
- ✅ Easy deployment from GitHub
- ✅ Supports file uploads
- ✅ Good for Node.js + MongoDB apps
- ✅ Automatic HTTPS
- ✅ Auto-deploy on git push

---

## 📞 Need Help?

If you encounter any issues during deployment, check:
1. Application logs in your hosting platform dashboard
2. MongoDB Atlas logs
3. GitHub Actions (if using CI/CD)

---

## 🎉 Your App is Ready!

Once deployed, your Movie Management System will be accessible worldwide at your hosting URL!

**Live Demo**: `https://your-app-name.onrender.com`

---

*Last Updated: December 2025*

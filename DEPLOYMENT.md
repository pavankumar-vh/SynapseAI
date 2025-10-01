# 🚀 Production Deployment Guide

This guide covers deploying SynapseAI to production using popular hosting services.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Railway)](#backend-deployment-railway)
- [Alternative Hosting Options](#alternative-hosting-options)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Production MongoDB cluster created
- [ ] Firebase project configured
- [ ] Gemini API key obtained
- [ ] Domain name purchased (optional)
- [ ] SSL certificate (handled by hosting)
- [ ] Git repository pushed to GitHub

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

```bash
cd client
npm run build
```

Test the build locally:
```bash
npm run preview
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd client
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub
4. Select "SynapseAI" repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables (see below)
7. Click "Deploy"

### Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important:** Update `VITE_API_URL` after deploying backend!

---

## 🖥️ Backend Deployment (Railway)

### Step 1: Prepare Backend for Production

Update `server/package.json` to add start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose "SynapseAI" repository
6. Configure:
   - **Root Directory**: `/server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Configure Environment Variables

In Railway Dashboard → Variables tab, add:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
GEMINI_API_KEY=your_gemini_key
ADMIN_EMAILS=admin@example.com
BYPASS_ADMIN_CHECK=false
```

### Step 4: Get Railway URL

1. Railway will automatically deploy
2. Go to Settings → Generate Domain
3. Your backend URL will be: `https://your-app.railway.app`
4. Copy this URL

### Step 5: Update Frontend with Backend URL

1. Go back to Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` to: `https://your-app.railway.app/api`
4. Redeploy frontend

### Step 6: Update CORS in Backend

In `server/src/app.js`, update CORS configuration:

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://your-frontend.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
```

Commit and push changes - Railway will auto-deploy.

---

## 🌐 Alternative Hosting Options

### Frontend Alternatives

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd client
npm run build
netlify deploy --prod
```

**Netlify Configuration** (`client/netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### GitHub Pages
```bash
cd client
npm run build
npm install -g gh-pages
gh-pages -d dist
```

### Backend Alternatives

#### Render.com
1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `server`
5. Build: `npm install`
6. Start: `npm start`
7. Add environment variables

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create synapseai-backend

# Deploy
git subtree push --prefix server heroku main
```

#### DigitalOcean App Platform
1. Create account at [digitalocean.com](https://www.digitalocean.com)
2. Apps → Create App
3. Connect GitHub
4. Configure build settings
5. Add environment variables

---

## 🔐 Environment Variables

### Production MongoDB

1. Create production cluster on MongoDB Atlas
2. Enable MongoDB backups
3. Set up monitoring alerts
4. Use strong password
5. Restrict IP access if possible

### Firebase Production Setup

1. Enable Firebase App Check
2. Set up security rules
3. Enable authentication rate limiting
4. Monitor authentication logs

### Gemini API

1. Set up billing alerts
2. Enable API key restrictions
3. Monitor usage quotas

---

## 📊 Post-Deployment

### 1. Verify Deployment

Test all features:
- [ ] User registration
- [ ] Login/logout
- [ ] Password reset
- [ ] AI content generation
- [ ] Credit system
- [ ] Support tickets
- [ ] Admin dashboard
- [ ] Responsive design

### 2. Set Up Monitoring

#### Frontend Monitoring (Vercel)
- Enable Vercel Analytics
- Monitor Core Web Vitals
- Track deployment errors

#### Backend Monitoring (Railway)
- View application logs
- Monitor CPU/Memory usage
- Set up error alerts

### 3. Configure Domain (Optional)

#### Custom Domain on Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

#### Custom Domain on Railway
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS CNAME records

### 4. Enable HTTPS

Both Vercel and Railway automatically provide SSL certificates.

### 5. Set Up Error Tracking

Install Sentry (optional):

```bash
# Frontend
cd client
npm install @sentry/react

# Backend
cd server
npm install @sentry/node
```

Configure Sentry in your apps for production error tracking.

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit .env files
- Use different keys for production
- Rotate keys regularly

### 2. Database Security
- Use strong passwords
- Enable MongoDB encryption
- Regular backups
- Audit access logs

### 3. API Security
- Implement rate limiting
- Add request validation
- Monitor for abuse
- Use API key restrictions

### 4. Firebase Security
- Enable App Check
- Set up security rules
- Monitor authentication logs
- Implement email verification

### 5. CORS Configuration
- Restrict to production domains only
- Don't use wildcard (*) in production

---

## 📈 Monitoring & Maintenance

### Daily
- Check error logs
- Monitor API usage
- Verify uptime

### Weekly
- Review user feedback
- Check support tickets
- Monitor credit usage patterns

### Monthly
- Update dependencies
- Review security patches
- Analyze usage metrics
- Backup database

### Quarterly
- Review and rotate API keys
- Update documentation
- Performance optimization
- Feature planning

---

## 🐛 Troubleshooting Production Issues

### Frontend Not Loading
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API URL accessibility
4. Check browser console errors

### Backend API Errors
1. Check Railway logs
2. Verify MongoDB connection
3. Check Firebase credentials
4. Test endpoints with Postman

### CORS Errors
1. Verify frontend URL in CORS config
2. Check Railway environment variables
3. Ensure credentials: true is set

### Database Connection Issues
1. Check MongoDB Atlas IP whitelist
2. Verify connection string
3. Check cluster status
4. Test connection with MongoDB Compass

---

## 📞 Support

For deployment issues:
- 📧 Email: support@synapseai.com
- 🐛 GitHub Issues: [Create Issue](https://github.com/pavankumar-vh/SynapseAI/issues)

---

## 📝 Deployment Checklist

Final verification before going live:

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Database connection working
- [ ] Firebase authentication working
- [ ] AI generation working
- [ ] Support system working
- [ ] Admin dashboard accessible
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] HTTPS enabled
- [ ] Error tracking configured
- [ ] Monitoring set up
- [ ] Backups enabled
- [ ] Documentation updated

---

**🎉 Congratulations! Your SynapseAI platform is now live in production!**

---

Made with ❤️ by Pavan Kumar

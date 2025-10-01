# 📌 Quick Reference - SynapseAI

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/pavankumar-vh/SynapseAI.git
cd SynapseAI

# Install dependencies
cd server && npm install
cd ../client && npm install

# Set up environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit .env files with your credentials

# Start development servers
# Terminal 1
cd server && npm run dev

# Terminal 2  
cd client && npm run dev
```

## 📚 Documentation Links

- **[README.md](README.md)** - Complete project overview
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[SECURITY.md](SECURITY.md)** - Security & encryption guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

## 🔑 Key Environment Variables

### Server (`server/.env`)
```env
MONGODB_URI=your_mongodb_connection
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
GEMINI_API_KEY=your_gemini_key
ADMIN_EMAILS=admin@example.com
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 Project Structure

```
SynapseAI/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── context/     # React context
│   │   └── utils/       # Utilities
│   └── .env            # Client environment variables
│
├── server/             # Express backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Express middleware
│   │   └── services/    # Business logic
│   └── .env            # Server environment variables
│
└── docs/               # Documentation
```

## 🌐 Default URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api

## 🎨 Features Quick Access

### User Features
- `/login` - Login page
- `/signup` - Registration page
- `/forgot-password` - Password reset
- `/dashboard` - User dashboard
- `/generate/social` - Social media generator
- `/generate/blog-ideas` - Blog ideas generator
- `/generate/full-blog` - Full blog generator
- `/generate/code-explainer` - Code explainer
- `/history` - Generation history
- `/support` - Create support ticket
- `/support/tickets` - My tickets
- `/support/tickets/:id` - Ticket details

### Admin Features
- `/admin` - Admin dashboard
- `/admin/tickets` - Manage support tickets

## 📊 API Endpoints

### Authentication
- `POST /api/users/sync` - Sync user with backend

### Generators
- `POST /api/generate/social-media` - Generate social posts (10 credits)
- `POST /api/generate/blog-ideas` - Generate blog ideas (5 credits)
- `POST /api/generate/full-blog` - Generate full blog (50 credits)
- `POST /api/generate/code-explainer` - Explain code (15 credits)

### Support
- `POST /api/support/tickets` - Create ticket
- `GET /api/support/tickets` - Get user tickets
- `GET /api/support/tickets/:id` - Get ticket details
- `POST /api/support/tickets/:id/responses` - Add response

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/credits` - Update user credits
- `GET /api/support/admin/tickets` - Get all tickets
- `POST /api/support/admin/tickets/:id/responses` - Add admin response

## 💳 Credit Costs

| Feature | Cost |
|---------|------|
| Social Media Post | 10 credits |
| Blog Ideas | 5 credits |
| Full Blog Post | 50 credits |
| Code Explainer | 15 credits |

## 🛠 Common Commands

### Development
```bash
# Start backend with auto-reload
cd server && npm run dev

# Start frontend dev server
cd client && npm run dev

# Run both concurrently (from root)
npm run dev
```

### Testing
```bash
# Test backend
cd server && npm test

# Test frontend
cd client && npm test
```

### Building
```bash
# Build frontend for production
cd client && npm run build

# Preview production build
cd client && npm run preview
```

### Database
```bash
# Check MongoDB connection
mongosh "your_mongodb_uri"

# Backup database
mongodump --uri="your_mongodb_uri" --out=./backup

# Restore database
mongorestore --uri="your_mongodb_uri" ./backup
```

### Git
```bash
# Update from main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push changes
git push origin feature/your-feature
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
npx kill-port 5000 5173

# macOS/Linux
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Error
- Check connection string format
- Verify IP whitelist (0.0.0.0/0)
- Check database user credentials

### Firebase Auth Error
- Verify all config values in `.env`
- Check if Email/Password is enabled
- Ensure no extra spaces in `.env`

### Gemini API Error
- Verify API key is valid
- Check API quota/limits
- Enable API in Google Cloud Console

### Environment Variables Not Loading
```bash
# Restart servers after .env changes
# Check .env file location (must be in correct directory)
# Verify no syntax errors (no spaces around =)
```

## 📦 Package Management

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name

# Audit security vulnerabilities
npm audit
npm audit fix
```

### Add New Package
```bash
# Backend
cd server
npm install package-name

# Frontend
cd client
npm install package-name
```

## 🔐 Security Checklist

- [ ] `.env` files in `.gitignore`
- [ ] Strong MongoDB password
- [ ] Firebase security rules enabled
- [ ] API keys rotated regularly
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info

## 📈 Performance Tips

- Use MongoDB indexes for frequent queries
- Implement caching for repeated requests
- Optimize images and assets
- Enable gzip compression
- Use CDN for static assets
- Monitor API response times
- Set up database connection pooling

## 🎯 Testing Checklist

### Before Deploying
- [ ] All features work locally
- [ ] No console errors
- [ ] Responsive on mobile/tablet
- [ ] All API endpoints tested
- [ ] Error handling works
- [ ] Loading states display
- [ ] Authentication flow complete
- [ ] Admin features accessible
- [ ] Support system functional
- [ ] Credit system accurate

## 🆘 Support

- 📧 **Email**: support@synapseai.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/pavankumar-vh/SynapseAI/issues)
- 💬 **Discord**: [Join Server](https://discord.gg/synapseai)
- 📚 **Docs**: [Full Documentation](README.md)

## 🔗 Useful Links

- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Firebase Console](https://console.firebase.google.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Railway Dashboard](https://railway.app/dashboard)

---

**⭐ Star the repo if you find it helpful!**

Made with ❤️ by Pavan Kumar

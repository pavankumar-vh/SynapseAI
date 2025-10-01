# 🚀 SynapseAI - Quick Setup Guide

## Prerequisites Checklist

Before starting, ensure you have accounts for:

- [ ] **MongoDB Atlas** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- [ ] **Firebase** - [Console](https://console.firebase.google.com/)
- [ ] **Google AI Studio** - [Get API key](https://makersuite.google.com/app/apikey)
- [ ] **Node.js 18+** installed
- [ ] **Git** installed

---

## Step 1: Clone Repository

```bash
git clone https://github.com/pavankumar-vh/SynapseAI.git
cd SynapseAI
```

---

## Step 2: Install Dependencies

### Install Server Dependencies
```bash
cd server
npm install
```

### Install Client Dependencies
```bash
cd ../client
npm install
cd ..
```

---

## Step 3: MongoDB Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (Free M0 tier is fine)
3. Create a database user:
   - Username: `synapseai`
   - Password: (generate a strong password)
4. Add IP access: Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `synapseai`

**Example:**
```
mongodb+srv://synapseai:YourPassword123@cluster0.xxxxx.mongodb.net/synapseai?retryWrites=true&w=majority
```

---

## Step 4: Firebase Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "SynapseAI" (or your preferred name)
4. Disable Google Analytics (optional)

### Enable Authentication
1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method

### Get Web App Credentials
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click **Web app** icon (</>)
4. Register app with nickname "SynapseAI Web"
5. Copy the Firebase configuration:

```javascript
// You'll need these values for client/.env
{
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456:web:abc123"
}
```

### Get Admin SDK Credentials
1. In **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Download the JSON file
4. Open the JSON file and extract:
   - `project_id`
   - `private_key`
   - `client_email`

---

## Step 5: Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the API key

---

## Step 6: Configure Environment Variables

### Server Configuration

Create `server/.env` file:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000/api

# MongoDB - Paste your connection string
MONGODB_URI=mongodb+srv://synapseai:YourPassword123@cluster0.xxxxx.mongodb.net/synapseai?retryWrites=true&w=majority

# Firebase Admin SDK - From service account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPaste_Your_Private_Key_Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# Google Gemini API
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

# Admin Emails - Change to your email
ADMIN_EMAILS=your-admin-email@example.com

# Security
BYPASS_ADMIN_CHECK=false
```

**Important:** 
- Replace `YourPassword123` with your MongoDB password
- Paste the ENTIRE private key including `-----BEGIN` and `-----END` lines
- Keep the quotes around the private key
- Use your actual email for ADMIN_EMAILS

### Client Configuration

Create `client/.env` file:

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env` with your Firebase config:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration - From Firebase console
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456:web:abc123
```

---

## Step 7: Start the Application

### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```

You should see:
```
✅ Firebase Admin SDK initialized successfully
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

### Terminal 2 - Start Frontend
```bash
cd client
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜ Local: http://localhost:5173/
```

---

## Step 8: Create Your Admin Account

1. Open browser to `http://localhost:5173`
2. Click "Sign Up"
3. Use the email you set in `ADMIN_EMAILS`
4. Create a password
5. Sign in
6. You should now see "Admin" link in the navbar

---

## Step 9: Test the Application

### Test User Features
1. Generate some content using the AI tools
2. Check your generation history
3. View your credits

### Test Admin Features
1. Click "Admin" in navbar
2. View all users
3. Update a user's credits
4. Check system statistics

### Test Support System
1. Create a support ticket
2. Login as admin
3. Go to Admin Dashboard → Support Tickets
4. Respond to the ticket
5. Login back as user
6. View the admin response

---

## 🎉 Success!

Your SynapseAI platform is now running locally!

### Default Ports
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api

---

## Troubleshooting

### MongoDB Connection Error
- Check if IP whitelist includes your IP (0.0.0.0/0 for all)
- Verify password in connection string is correct
- Ensure cluster is running

### Firebase Auth Error
- Verify all Firebase config values are correct
- Check if Email/Password auth is enabled
- Ensure no extra spaces in .env file

### Gemini API Error
- Verify API key is valid
- Check if API is enabled in Google Cloud Console
- Ensure no billing issues

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### Environment Variables Not Loading
- Restart both servers after changing .env
- Check for syntax errors in .env (no spaces around =)
- Ensure .env file is in correct directory

---

## Next Steps

1. **Customize Admin Emails**: Update `ADMIN_EMAILS` in `server/.env`
2. **Set Initial Credits**: Modify default credits in `server/src/controllers/userController.js`
3. **Customize Branding**: Update colors in `client/tailwind.config.js`
4. **Deploy to Production**: Follow deployment guide in README.md

---

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment instructions.

---

## Support

- 📧 Email: support@synapseai.com
- 🐛 Issues: [GitHub Issues](https://github.com/pavankumar-vh/SynapseAI/issues)
- 📖 Docs: [Full Documentation](README.md)

---

**Made with ❤️ by Pavan Kumar**

# AI Content Toolkit - Backend API

Backend server for the AI-Powered Content Generation Toolkit built with Node.js, Express, and MongoDB.

## Features

- 🔐 Firebase Admin SDK for token verification
- 🤖 Google Gemini AI integration
- 💾 MongoDB for data persistence
- ⭐ Credit-based system
- 📜 Generation history tracking
- 🛡️ Secure API with authentication middleware

## Tech Stack

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **Firebase Admin SDK** - Authentication
- **Google Gemini AI** - Content generation
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Firebase project with Admin SDK credentials
- Google Gemini API key

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-toolkit
   CORS_ORIGIN=http://localhost:5173
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
   
   # Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   
   # Credit costs
   CREDIT_COST_SOCIAL=10
   CREDIT_COST_BLOG=15
   CREDIT_COST_CODE=20
   ```

## Installation

```bash
npm install
```

## Development

Start the development server with hot-reloading:

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

## Production

Start the production server:

```bash
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### User Routes (Protected)
- `POST /api/users/sync` - Create/sync user profile
- `GET /api/user/profile` - Get user profile
- `GET /api/user/credits` - Get credit balance

### Generator Routes (Protected)
- `POST /api/generate/social` - Generate social media post
- `POST /api/generate/blog-ideas` - Generate blog ideas
- `POST /api/generate/code-explainer` - Explain code

### History Routes (Protected)
- `GET /api/history` - Get generation history (paginated)
- `GET /api/history/:id` - Get specific generation
- `DELETE /api/history/:id` - Delete generation

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── database.js  # MongoDB connection
│   ├── firebase.js  # Firebase Admin SDK
│   └── gemini.js    # Gemini AI configuration
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
└── utils/           # Utility functions
```

## Deployment to Render

### Option 1: Using Secret Files (Recommended)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Secret File:
   - Go to **Advanced** → **Secret Files**
   - Create file: `/etc/secrets/firebase-service-account.json`
   - Paste your Firebase service account JSON
5. Add environment variables (except Firebase credentials)
6. Deploy!

### Option 2: Using Environment Variables

1. Follow steps 1-3 from Option 1
2. Add ALL environment variables including:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY` (with `\n` for line breaks)
   - `FIREBASE_CLIENT_EMAIL`
3. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment (development/production) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `CORS_ORIGIN` | Allowed origins for CORS | Yes |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Yes* |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | Yes* |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | Yes* |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `CREDIT_COST_SOCIAL` | Cost for social media generator | No (default: 10) |
| `CREDIT_COST_BLOG` | Cost for blog idea generator | No (default: 15) |
| `CREDIT_COST_CODE` | Cost for code explainer | No (default: 20) |

*Only required if not using Secret Files method

## Security Notes

- Never commit `.env` file or `firebase-service-account.json`
- Use environment variables or secret files for sensitive data
- Firebase ID tokens are verified on every protected request
- Rate limiting recommended for production

## License

MIT


# 🚀 SynapseAI - AI Content Generation Platform

<div align="center">

![SynapseAI](https://img.shields.io/badge/SynapseAI-v1.0.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

**An intelligent AI-powered content generation toolkit with credit management, support tickets, and admin dashboard.**

### 🌐 Live Deployment
**Frontend:** [https://synapse-ai-eight.vercel.app](https://synapse-ai-eight.vercel.app)  
**Backend API:** [https://synapseai-7dxo.onrender.com](https://synapseai-7dxo.onrender.com)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Configuration](#-configuration) • [Usage](#-usage) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Admin Features](#-admin-features)
- [Support System](#-support-system)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **AI Content Generation**: Multiple AI tools powered by Google Gemini 2.0
  - Social Media Post Generator
  - Blog Ideas Generator
  - Full Blog Post Generator
  - Code Explainer
  
### 👤 User Management
- **Firebase Authentication**: Secure email/password authentication
- **Password Reset**: Email-based password recovery
- **User Dashboard**: Personal content generation hub
- **Generation History**: Track all your AI-generated content
- **Credit System**: Token-based usage management

### 🎫 Support Ticket System
- **User Tickets**: Create and track support tickets
- **Real-time Updates**: See admin responses instantly
- **Categories**: Technical, Billing, Feature Request, Bug Report, Account, Other
- **Priority Levels**: Low, Medium, High, Urgent
- **Status Tracking**: Open, In Progress, Waiting Response, Resolved, Closed

### 🔐 Admin Dashboard
- **User Management**: View and manage all users
- **Credit Management**: Add, set, or deduct user credits
- **Ticket Management**: View and respond to all support tickets
- **System Statistics**: Real-time analytics and metrics
- **Admin Responses**: Direct communication with users

### 🎨 UI/UX
- **Dark Theme**: Eye-friendly dark mode interface
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works on all devices
- **Real-time Feedback**: Toast notifications for all actions

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **React Hot Toast** - Notifications
- **Firebase SDK** - Authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Firebase Admin** - Server-side authentication
- **Google Gemini API** - AI content generation

### DevOps & Tools
- **Git** - Version control
- **Nodemon** - Development auto-reload
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SynapseAI Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   React UI   │ ───► │  Express API │ ───► │  MongoDB  │ │
│  │   (Vite)     │ ◄─── │   (Node.js)  │ ◄─── │  Atlas    │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                             │
│         │                      │                             │
│         ▼                      ▼                             │
│  ┌──────────────┐      ┌──────────────┐                    │
│  │   Firebase   │      │ Google Gemini│                    │
│  │     Auth     │      │     API      │                    │
│  └──────────────┘      └──────────────┘                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB Atlas** account (or local MongoDB)
- **Firebase** project
- **Google Gemini API** key

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pavankumar-vh/SynapseAI.git
cd SynapseAI
```

### 2. Install Dependencies

#### Install Server Dependencies
```bash
cd server
npm install
```

#### Install Client Dependencies
```bash
cd ../client
npm install
```

---

## ⚙️ Environment Configuration

### Server Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000/api

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Admin Configuration (comma-separated emails)
ADMIN_EMAILS=admin@example.com,admin2@example.com

# Security
BYPASS_ADMIN_CHECK=false
```

### Client Environment Variables

Create a `.env` file in the `client/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 🔐 Environment Variable Encryption (Optional)

For production, consider using environment variable encryption:

```bash
# Install dotenv-vault (optional)
npm install -g dotenv-vault

# Encrypt environment variables
cd server
dotenv-vault login
dotenv-vault push
```

---

## 🎮 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev
```
Server will run on: `http://localhost:5000`

#### Terminal 2 - Start Frontend Dev Server
```bash
cd client
npm run dev
```
Client will run on: `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Backend in Production
```bash
cd server
NODE_ENV=production npm start
```

---

## 📁 Project Structure

```
SynapseAI/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── common/      # Reusable components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   └── generators/  # AI generator components
│   │   ├── context/         # React Context (Auth, Credits)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── vite.config.js       # Vite configuration
│
├── server/                   # Backend Node.js application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   ├── database.js  # MongoDB connection
│   │   │   ├── firebase.js  # Firebase Admin setup
│   │   │   └── gemini.js    # Gemini API setup
│   │   ├── controllers/     # Request handlers
│   │   │   ├── generatorController.js
│   │   │   ├── historyController.js
│   │   │   ├── supportController.js
│   │   │   └── userController.js
│   │   ├── middleware/      # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validateRequest.js
│   │   ├── models/          # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── GenerationHistory.js
│   │   │   └── SupportTicket.js
│   │   ├── routes/          # API routes
│   │   │   ├── generatorRoutes.js
│   │   │   ├── historyRoutes.js
│   │   │   ├── supportRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── services/        # Business logic
│   │   │   ├── creditService.js
│   │   │   ├── geminiService.js
│   │   │   └── historyService.js
│   │   ├── utils/           # Utility functions
│   │   └── app.js           # Express app setup
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies
│   └── server.js            # Entry point
│
├── .gitignore               # Git ignore rules
├── README.md                # This file
└── LICENSE                  # MIT License
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/users/sync`
Sync user data with backend after Firebase authentication
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ email, displayName }`

### Generator Endpoints

#### POST `/api/generate/social-media`
Generate social media posts
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ topic, platform, tone }`
- **Cost**: 10 credits

#### POST `/api/generate/blog-ideas`
Generate blog post ideas
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ topic, count }`
- **Cost**: 5 credits

#### POST `/api/generate/full-blog`
Generate complete blog posts
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ topic, keywords, tone }`
- **Cost**: 50 credits

#### POST `/api/generate/code-explainer`
Explain code snippets
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ code, language }`
- **Cost**: 15 credits

### Support Ticket Endpoints

#### POST `/api/support/tickets`
Create a new support ticket
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ subject, category, priority, description }`

#### GET `/api/support/tickets`
Get user's tickets
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Query**: `?status=open&page=1&limit=10`

#### GET `/api/support/tickets/:id`
Get specific ticket details
- **Headers**: `Authorization: Bearer <firebase_token>`

#### POST `/api/support/tickets/:id/responses`
Add response to ticket
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ message }`

### Admin Endpoints

#### GET `/api/admin/users`
Get all users (Admin only)
- **Headers**: `Authorization: Bearer <firebase_token>`

#### PUT `/api/admin/credits`
Update user credits (Admin only)
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ userId, action, amount, reason }`

#### GET `/api/support/admin/tickets`
Get all support tickets (Admin only)
- **Headers**: `Authorization: Bearer <firebase_token>`

#### POST `/api/support/admin/tickets/:id/responses`
Add admin response to ticket (Admin only)
- **Headers**: `Authorization: Bearer <firebase_token>`
- **Body**: `{ message }`

---

## 👨‍💼 Admin Features

### Setting Up Admin Users

1. Add admin emails to `.env` file:
```env
ADMIN_EMAILS=admin@example.com,admin2@example.com
```

2. Create Firebase accounts with these emails

3. Login to access admin dashboard at `/admin`

### Admin Capabilities
- View all users and their credit balances
- Add, set, or deduct credits from users
- View system statistics
- Manage support tickets
- Respond to user queries
- Change ticket status

---

## 🎫 Support System

### User Features
- Create tickets with categories and priorities
- View ticket history
- Add responses to existing tickets
- Track ticket status

### Admin Features
- View all tickets with filters
- Respond to tickets
- Change ticket status
- Assign tickets (coming soon)

### Ticket Categories
- 🔧 Technical Issue
- 💳 Billing & Credits
- ✨ Feature Request
- 🐛 Bug Report
- 👤 Account Issue
- ❓ Other

### Status Flow
```
Open → In Progress → Waiting Response → Resolved → Closed
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy the `dist/` folder to your hosting service

3. Update environment variables on hosting platform

### Backend Deployment (Railway/Render/Heroku)

1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy from `server/` directory

### Environment Variables for Production

Update URLs in production:
```env
# Client .env
VITE_API_URL=https://your-api-domain.com/api

# Server .env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all sensitive data
3. **Enable Firebase App Check** in production
4. **Implement rate limiting** for API endpoints
5. **Use HTTPS** in production
6. **Regularly rotate API keys**
7. **Monitor for suspicious activity**
8. **Keep dependencies updated**

---

## 🧪 Testing

```bash
# Run backend tests (if implemented)
cd server
npm test

# Run frontend tests (if implemented)
cd client
npm test
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use ESLint for code linting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pavan Kumar**
- GitHub: [@pavankumar-vh](https://github.com/pavankumar-vh)

---

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI capabilities
- [Firebase](https://firebase.google.com/) for authentication
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

---

## 📞 Support

For support, email support@synapseai.com or create a support ticket in the application.

---

## 🗺️ Roadmap

- [ ] Real-time collaboration features
- [ ] AI model selection (GPT-4, Claude, etc.)
- [ ] Advanced analytics dashboard
- [ ] Team workspaces
- [ ] API access for developers
- [ ] Mobile application
- [ ] Multi-language support
- [ ] Custom AI model training

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Pavan Kumar

</div>

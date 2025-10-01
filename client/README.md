# AI Content Toolkit - Frontend

This is the frontend for the AI-Powered Content Generation Toolkit built with React, Vite, and Tailwind CSS.

## Features

- 🔐 Firebase Authentication (Email/Password)
- 📱 Social Media Post Generator
- 📝 Blog Post Idea Generator
- 💻 Code Explainer
- ⭐ Credit-based system
- 📜 Generation history
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase SDK** - Authentication
- **Axios** - HTTP client
- **React Router** - Routing
- **React Hot Toast** - Notifications

## Prerequisites

- Node.js 16+ and npm
- Firebase project with Authentication enabled
- Backend API running (see server README)

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration and API URL:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── auth/       # Authentication components
│   ├── common/     # Reusable UI components
│   ├── dashboard/  # Dashboard components
│   ├── generators/ # Generator tool components
│   └── history/    # History components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API service layer
├── utils/          # Utility functions
├── App.jsx         # Main App component
└── main.jsx        # Entry point
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard

4. Your app will be live at `https://your-app.vercel.app`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT



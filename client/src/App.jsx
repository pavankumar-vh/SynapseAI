import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CreditProvider } from './context/CreditContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import SocialMediaGenerator from './components/generators/SocialMediaGenerator';
import BlogIdeaGenerator from './components/generators/BlogIdeaGenerator';
import CodeExplainer from './components/generators/CodeExplainer';
import FullBlogGenerator from './components/generators/FullBlogGenerator';
import AdminDashboard from './components/dashboard/AdminDashboard';
import SupportPage from './pages/SupportPage';
import MyTicketsPage from './pages/MyTicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import AdminTicketsPage from './pages/AdminTicketsPage';
import NotFound from './pages/NotFound';

// Wrapper component to use useLocation hook
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate/social"
          element={
            <ProtectedRoute>
              <SocialMediaGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate/blog-ideas"
          element={
            <ProtectedRoute>
              <BlogIdeaGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate/code-explainer"
          element={
            <ProtectedRoute>
              <CodeExplainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate/full-blog"
          element={
            <ProtectedRoute>
              <FullBlogGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support/tickets"
          element={
            <ProtectedRoute>
              <MyTicketsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <AdminRoute>
              <AdminTicketsPage />
            </AdminRoute>
          }
        />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  console.log('📱 App component rendering...');
  
  return (
    <Router>
      <AuthProvider>
        <CreditProvider>
          <div className="flex flex-col min-h-screen">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: '#3b82f6',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <Navbar />
            
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            
            <Footer />
          </div>
        </CreditProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;



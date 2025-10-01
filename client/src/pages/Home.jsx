import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: '📱',
      title: 'Social Media Posts',
      description: 'Generate engaging social media content tailored to your topic and desired tone'
    },
    {
      icon: '📝',
      title: 'Blog Post Ideas',
      description: 'Get creative and SEO-friendly blog post ideas based on your keywords'
    },
    {
      icon: '💻',
      title: 'Code Explanations',
      description: 'Understand complex code with clear, natural language explanations'
    }
  ];

  // Check if in demo mode
  const isDemoMode = import.meta.env.VITE_FIREBASE_API_KEY === 'demo-api-key' || 
                     !import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-dark-bg"
    >
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-warning/10 border-b border-warning/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-warning font-semibold">⚠️ Demo Mode:</span>
              <span className="text-dark-muted">
                Firebase not configured. UI preview only. 
                <a href="#setup" className="underline ml-1 font-medium text-accent-400 hover:text-accent-300">See setup instructions below</a>
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-7xl mb-8"
          >
            🤖✨
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold font-display text-dark-text mb-8 leading-tight"
          >
            AI-Powered Content
            <br />
            <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">
              Generation Toolkit
            </span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-dark-muted mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Create amazing content with the power of <span className="text-accent-400 font-semibold">Google Gemini AI</span>. 
            Generate social media posts, blog ideas, and code explanations in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            {currentUser ? (
              <Link to="/dashboard">
                <Button variant="primary" size="lg">
                  Go to Dashboard →
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </motion.div>

          {!currentUser && (
            <div className="inline-flex items-center gap-2 text-sm bg-dark-surface border border-dark-border px-5 py-2.5 rounded-lg shadow-dark">
              <span className="text-2xl">🎁</span>
              <span className="text-dark-muted">Get <strong className="text-accent-400">100 free credits</strong> when you sign up!</span>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-dark-surface/30">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center text-dark-text mb-16">
          Powerful Tools at Your Fingertips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-hover text-center group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-semibold font-display text-dark-text mb-4">
                {feature.title}
              </h3>
              <p className="text-dark-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-center text-dark-text mb-16">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Sign Up', desc: 'Create your free account', icon: '🔐' },
              { step: '2', title: 'Choose Tool', desc: 'Select a content generator', icon: '🛠️' },
              { step: '3', title: 'Generate', desc: 'Let AI create your content', icon: '⚡' },
              { step: '4', title: 'Use & Share', desc: 'Copy and use your content', icon: '🚀' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center text-3xl font-bold mx-auto shadow-dark-lg group-hover:shadow-accent-500/50 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white">{item.step}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 text-3xl">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold font-display text-dark-text mb-2">
                  {item.title}
                </h3>
                <p className="text-dark-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!currentUser && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-12 md:p-16 text-center shadow-dark-lg overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
                Ready to Create Amazing Content?
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
                Join now and get <strong>100 free credits</strong> to start generating content today!
              </p>
              <Link to="/signup">
                <Button variant="secondary" size="lg" className="bg-white text-accent-600 hover:bg-gray-100 shadow-lg hover:shadow-xl">
                  Sign Up Now - It's Free! →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Setup Instructions Section (Demo Mode) */}
      {isDemoMode && (
        <div id="setup" className="bg-dark-surface/50 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card">
              <h2 className="text-3xl font-bold font-display text-dark-text mb-4">
                🚀 Setup Instructions
              </h2>
              <p className="text-dark-muted mb-8">
                You're viewing the UI in demo mode. To enable full functionality, configure Firebase:
              </p>
              
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-dark-text mb-4">Quick Setup Steps:</h3>
                <ol className="list-decimal list-inside space-y-3 text-dark-muted">
                  <li>Create a Firebase project at <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-400 underline hover:text-accent-300">console.firebase.google.com</a></li>
                  <li>Enable Email/Password authentication</li>
                  <li>Copy your Firebase config to <code className="bg-dark-bg px-2 py-1 rounded text-accent-400 font-mono text-sm">client/.env</code></li>
                  <li>Restart the dev server</li>
                </ol>
              </div>

              <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-dark-text mb-2">📖 Detailed Guide</h3>
                <p className="text-dark-muted">
                  See <code className="bg-dark-bg px-2 py-1 rounded text-accent-400 font-mono text-sm">COMPLETE_SETUP_GUIDE.md</code> in your project folder for complete step-by-step instructions including MongoDB and Gemini API setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;



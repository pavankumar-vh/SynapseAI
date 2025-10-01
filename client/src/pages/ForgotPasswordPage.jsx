import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebase';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
      console.log('✅ Password reset email sent to:', email);
    } catch (error) {
      console.error('❌ Password reset error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email address');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many requests. Please try again later.');
      } else {
        toast.error('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <div className="bg-dark-surface rounded-2xl shadow-dark-lg border border-dark-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-5xl mb-4"
            >
              🔐
            </motion.div>
            <h2 className="text-3xl font-bold font-display text-dark-text mb-2">
              Forgot Password?
            </h2>
            <p className="text-dark-muted">
              {emailSent 
                ? 'Check your email for reset instructions'
                : 'No worries! Enter your email and we\'ll send you reset instructions'
              }
            </p>
          </div>

          {emailSent ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-success text-2xl">✓</div>
                  <div>
                    <p className="text-success font-semibold mb-1">Email Sent!</p>
                    <p className="text-dark-muted text-sm">
                      We've sent a password reset link to <strong className="text-dark-text">{email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-dark-muted space-y-2">
                  <p>📧 Check your inbox (and spam folder)</p>
                  <p>🔗 Click the reset link in the email</p>
                  <p>🔑 Create a new password</p>
                  <p>✅ Sign in with your new password</p>
                </div>

                <div className="pt-4 border-t border-dark-border">
                  <p className="text-sm text-dark-muted text-center mb-4">
                    Didn't receive the email?
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setEmailSent(false);
                      setEmail('');
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoFocus
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-dark-muted">
            Need more help?{' '}
            <a href="mailto:support@synapseai.com" className="text-accent-400 hover:text-accent-300 transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;

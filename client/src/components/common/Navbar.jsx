import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCredits } from '../../hooks/useCredits';
import { formatCredits } from '../../utils/helpers';
import { getAdminStats } from '../../services/adminService';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { credits } = useCredits();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (currentUser) {
        try {
          await getAdminStats();
          setIsAdmin(true);
        } catch (error) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [currentUser]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-dark-surface shadow-dark border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                SynapseAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-dark-muted hover:text-dark-text px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-accent-400 hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <span>🔑</span>
                  Admin
                </Link>
              )}
              <Link
                to="/history"
                className="text-dark-muted hover:text-dark-text px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                History
              </Link>
              {!isAdmin && (
                <Link
                  to="/support/tickets"
                  className="text-dark-muted hover:text-dark-text px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Support
                </Link>
              )}

              {/* Credits Badge */}
              <div className="flex items-center bg-dark-bg border border-dark-border px-3 py-1.5 rounded-lg">
                <span className="text-yellow-400 mr-1.5">⭐</span>
                <span className="text-sm font-semibold text-dark-text">
                  {formatCredits(credits)}
                </span>
                <span className="text-xs text-dark-muted ml-1">credits</span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-dark-muted hover:text-dark-text focus:outline-none transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase()}
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-dark-surface rounded-lg shadow-dark-lg border border-dark-border py-2 z-50">
                    <div className="px-4 py-3 border-b border-dark-border">
                      <p className="font-medium text-dark-text">{currentUser.displayName || 'User'}</p>
                      <p className="text-xs text-dark-muted truncate mt-0.5">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-dark-bg transition-colors mt-1"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Login/Signup Links (if not logged in) */}
          {!currentUser && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-dark-muted hover:text-dark-text px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-accent-500 text-white hover:bg-accent-600 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-muted hover:text-dark-text focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-dark-border bg-dark-bg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {currentUser ? (
              <>
                <div className="px-3 py-3 text-sm border-b border-dark-border">
                  <p className="font-medium text-dark-text">{currentUser.displayName || 'User'}</p>
                  <p className="text-xs text-dark-muted mt-0.5">{currentUser.email}</p>
                  <div className="mt-2 flex items-center bg-dark-surface px-2 py-1 rounded-lg">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-sm font-semibold text-dark-text">
                      {formatCredits(credits)}
                    </span>
                    <span className="text-xs text-dark-muted ml-1">credits</span>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-muted hover:text-dark-text hover:bg-dark-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-accent-400 hover:text-accent-300 hover:bg-dark-surface flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>🔑</span>
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/history"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-muted hover:text-dark-text hover:bg-dark-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                {!isAdmin && (
                  <Link
                    to="/support/tickets"
                    className="block px-3 py-2 rounded-md text-base font-medium text-dark-muted hover:text-dark-text hover:bg-dark-surface"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Support
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-danger hover:bg-dark-surface"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-muted hover:text-dark-text hover:bg-dark-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-accent-400 hover:bg-dark-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



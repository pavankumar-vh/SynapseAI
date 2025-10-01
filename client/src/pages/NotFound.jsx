import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="text-center">
        <div className="text-9xl mb-8">🤔</div>
        <h1 className="text-7xl md:text-8xl font-bold font-display bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent mb-6">
          404
        </h1>
        <p className="text-3xl font-semibold text-dark-text mb-4">Page Not Found</p>
        <p className="text-dark-muted mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            ← Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;



import React from 'react';
import { Link } from 'react-router-dom';
import { useCredits } from '../../hooks/useCredits';
import { formatCredits } from '../../utils/helpers';

const GeneratorLayout = ({ title, icon, creditCost, children, loading = false }) => {
  const { credits } = useCredits();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-5xl mr-4">{icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-1">
                Cost: <span className="font-semibold text-primary-600">⭐ {creditCost} credits</span>
              </p>
            </div>
          </div>
          
          <div className="hidden sm:block bg-primary-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-gray-600">Your Balance</p>
            <p className="text-2xl font-bold text-primary-600">⭐ {formatCredits(credits)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-gray-600 font-medium">Generating your content...</p>
              <p className="text-sm text-dark-muted">This may take a few seconds</p>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default GeneratorLayout;



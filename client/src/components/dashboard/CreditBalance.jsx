import React from 'react';
import { useCredits } from '../../hooks/useCredits';
import { formatCredits } from '../../utils/helpers';
import { LOW_CREDIT_THRESHOLD } from '../../utils/constants';

const CreditBalance = () => {
  const { credits, loading } = useCredits();

  const isLow = credits < LOW_CREDIT_THRESHOLD;
  const percentage = Math.min((credits / 100) * 100, 100);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium uppercase tracking-wide">Available Credits</p>
            <div className="flex items-baseline mt-3">
              {loading ? (
                <div className="h-14 w-32 bg-white/20 animate-pulse rounded-lg"></div>
              ) : (
                <>
                  <p className="text-6xl font-bold font-display text-white">{formatCredits(credits)}</p>
                  <span className="ml-3 text-2xl text-white/70">/ 100</span>
                </>
              )}
            </div>
          </div>
          <div className="text-7xl opacity-90">⭐</div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isLow ? 'bg-warning' : 'bg-white'
              } shadow-lg`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {isLow && (
          <div className="mt-5 flex items-center text-white bg-white/10 px-4 py-2 rounded-lg">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Your credit balance is running low!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditBalance;



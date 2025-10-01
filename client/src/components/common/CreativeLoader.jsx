import React from 'react';

/**
 * CreativeLoader - Animated loader with various styles
 */
const CreativeLoader = ({ message = 'Generating...', style = 'dots' }) => {
  
  if (style === 'brain') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        {/* Animated Brain */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-pulse">🧠</div>
          </div>
          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute inset-0 animate-spin-reverse-slow" style={{ animationDelay: '0.5s' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent-500 rounded-full animate-ping"></div>
          </div>
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDelay: '1s' }}>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent-600 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-dark-text animate-pulse">{message}</p>
          <div className="flex items-center justify-center space-x-1">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-accent-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>

        {/* Progress waves */}
        <div className="w-64 h-2 bg-dark-bg rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 animate-progress-wave"></div>
        </div>
      </div>
    );
  }

  if (style === 'typing') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        {/* Typing Animation */}
        <div className="flex items-center space-x-3">
          <div className="text-5xl animate-pulse">✍️</div>
          <div className="flex space-x-2">
            <div className="w-3 h-12 bg-accent-400 rounded animate-typing-bar" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-12 bg-accent-500 rounded animate-typing-bar" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-3 h-12 bg-accent-600 rounded animate-typing-bar" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-3 h-12 bg-accent-400 rounded animate-typing-bar" style={{ animationDelay: '0.45s' }}></div>
          </div>
        </div>
        
        {/* Message */}
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold text-dark-text">{message}</p>
          <div className="text-sm text-dark-muted animate-pulse">
            AI is crafting your content...
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-accent-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'sparkles') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        {/* Sparkle Container */}
        <div className="relative w-32 h-32">
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-spin-slow">✨</div>
          </div>
          
          {/* Floating Sparkles */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const delay = i * 0.2;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-50px)`,
                  animation: `float 2s ease-in-out ${delay}s infinite`
                }}
              >
                <span className="text-2xl">⭐</span>
              </div>
            );
          })}
        </div>
        
        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-dark-text bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
            {message}
          </p>
          <p className="text-sm text-dark-muted animate-pulse">
            Creating magic with AI ✨
          </p>
        </div>

        {/* Shimmer bar */}
        <div className="w-64 h-1 bg-dark-bg rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-400 to-transparent animate-shimmer"></div>
        </div>
      </div>
    );
  }

  // Default: dots
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      {/* Rotating Loader */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-dark-border rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 border-4 border-accent-400 rounded-full border-b-transparent animate-spin-reverse"></div>
      </div>
      
      {/* Message */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-dark-text animate-pulse">{message}</p>
      </div>

      {/* Dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-accent-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default CreativeLoader;

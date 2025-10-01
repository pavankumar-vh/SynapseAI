import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCredits } from '../../hooks/useCredits';
import CreditBalance from './CreditBalance';
import ToolCard from './ToolCard';
import { CREDIT_COSTS, TOOL_TYPES } from '../../utils/constants';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { credits } = useCredits();

  const tools = [
    {
      id: TOOL_TYPES.SOCIAL_MEDIA,
      title: 'Social Media Post Generator',
      description: 'Generate engaging social media posts for any topic and tone',
      icon: '📱',
      creditCost: CREDIT_COSTS.SOCIAL_MEDIA,
      route: '/generate/social'
    },
    {
      id: TOOL_TYPES.BLOG_IDEAS,
      title: 'Blog Post Idea Generator',
      description: 'Get creative blog post ideas based on your keywords',
      icon: '📝',
      creditCost: CREDIT_COSTS.BLOG_IDEAS,
      route: '/generate/blog-ideas'
    },
    {
      id: TOOL_TYPES.CODE_EXPLAINER,
      title: 'Code Explainer',
      description: 'Get natural language explanations for code snippets',
      icon: '💻',
      creditCost: CREDIT_COSTS.CODE_EXPLAINER,
      route: '/generate/code-explainer'
    },
    {
      id: TOOL_TYPES.FULL_BLOG,
      title: 'Full Blog Post Generator',
      description: 'Generate a complete, SEO-optimized blog post (2000-3000 words)',
      icon: '📰',
      creditCost: CREDIT_COSTS.FULL_BLOG,
      route: '/generate/full-blog'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-dark-text mb-3">
            Welcome back, {currentUser?.displayName || 'User'}! 👋
          </h1>
          <p className="text-dark-muted text-lg">
            Choose a tool below to start generating content
          </p>
        </div>

        {/* Credit Balance */}
        <div className="mb-10">
          <CreditBalance />
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-3xl font-bold font-display text-dark-text mb-8">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                {...tool}
                disabled={credits < tool.creditCost}
              />
            ))}
          </div>
        </div>

        {/* Help Section */}
        {credits < 20 && (
          <div className="mt-10 bg-warning/10 border border-warning/30 rounded-lg p-6">
            <div className="flex items-start">
              <span className="text-3xl mr-4">⚠️</span>
              <div>
                <h3 className="text-lg font-semibold text-dark-text">Running Low on Credits</h3>
                <p className="text-dark-muted mt-2 leading-relaxed">
                  You're running low on credits. Some tools may not be available. Consider upgrading your plan in the future!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



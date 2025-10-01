import React, { useState } from 'react';
import { useCredits } from '../../hooks/useCredits';
import { generateBlogIdeas } from '../../services/generatorService';
import { CREDIT_COSTS } from '../../utils/constants';
import { copyToClipboard } from '../../utils/helpers';
import GeneratorLayout from './GeneratorLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import CreativeLoader from '../common/CreativeLoader';
import toast from 'react-hot-toast';

const BlogIdeaGenerator = () => {
  const { credits, updateCredits } = useCredits();
  const [keyword, setKeyword] = useState('');
  const [count, setCount] = useState(5);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword');
      return;
    }

    if (credits < CREDIT_COSTS.BLOG_IDEAS) {
      toast.error('Insufficient credits. You need at least ' + CREDIT_COSTS.BLOG_IDEAS + ' credits.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Generating blog post ideas...');

    try {
      const result = await generateBlogIdeas({ keyword, count });
      setGeneratedIdeas(result.ideas);
      updateCredits(result.remainingCredits);
      toast.success('Ideas generated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate ideas', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyIdea = async (idea) => {
    const success = await copyToClipboard(idea);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleCopyAll = async () => {
    const allIdeas = generatedIdeas.join('\n\n');
    const success = await copyToClipboard(allIdeas);
    if (success) {
      toast.success('All ideas copied to clipboard!');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleReset = () => {
    setKeyword('');
    setCount(5);
    setGeneratedIdeas([]);
  };

  return (
    <GeneratorLayout
      title="Blog Post Idea Generator"
      icon="📝"
      creditCost={CREDIT_COSTS.BLOG_IDEAS}
      loading={loading}
    >
      <div className="card">
        <div className="space-y-4">
          {/* Keyword Input */}
          <Input
            label="Keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., machine learning, cooking, travel"
            disabled={loading}
            required
          />

          {/* Count Selector */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">
              Number of Ideas <span className="text-red-500">*</span>
            </label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              disabled={loading}
              className="input-field"
            >
              {[3, 5, 7, 10].map((num) => (
                <option key={num} value={num}>
                  {num} ideas
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <Button
            variant="primary"
            onClick={handleGenerate}
            loading={loading}
            disabled={loading || !keyword.trim() || credits < CREDIT_COSTS.BLOG_IDEAS}
            className="w-full"
          >
            Generate Ideas
          </Button>
        </div>
      </div>

      {/* Creative Loader - Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <CreativeLoader 
            message="Brainstorming creative blog ideas..."
            style="typing"
          />
        </div>
      )}

      {/* Generated Ideas */}
      {generatedIdeas.length > 0 && !loading && (
        <div className="card">
          <div className="space-y-4">
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-dark-text">Generated Ideas:</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopyAll}>
                    📋 Copy All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    🔄 New
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {generatedIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="p-4 bg-dark-surface border border-dark-border rounded-lg hover:border-accent-500 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="inline-block w-8 h-8 bg-accent-500/20 text-accent-400 rounded-full text-center font-bold leading-8 mr-3">
                          {index + 1}
                        </span>
                        <span className="text-dark-text">{idea}</span>
                      </div>
                      <button
                        onClick={() => handleCopyIdea(idea)}
                        className="text-dark-muted hover:text-accent-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy this idea"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </GeneratorLayout>
  );
};

export default BlogIdeaGenerator;



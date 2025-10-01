import React, { useState } from 'react';
import { useCredits } from '../../hooks/useCredits';
import { generateSocialPost } from '../../services/generatorService';
import { CREDIT_COSTS, TONE_OPTIONS } from '../../utils/constants';
import { copyToClipboard } from '../../utils/helpers';
import GeneratorLayout from './GeneratorLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import CreativeLoader from '../common/CreativeLoader';
import FormattedContent from '../common/FormattedContent';
import toast from 'react-hot-toast';

const SocialMediaGenerator = () => {
  const { credits, updateCredits } = useCredits();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    if (credits < CREDIT_COSTS.SOCIAL_MEDIA) {
      toast.error('Insufficient credits. You need at least ' + CREDIT_COSTS.SOCIAL_MEDIA + ' credits.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Generating your social media post...');

    try {
      const result = await generateSocialPost({ topic, tone });
      setGeneratedContent(result.content);
      updateCredits(result.remainingCredits);
      toast.success('Content generated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate content', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedContent);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleReset = () => {
    setTopic('');
    setTone('professional');
    setGeneratedContent('');
  };

  return (
    <GeneratorLayout
      title="Social Media Post Generator"
      icon="📱"
      creditCost={CREDIT_COSTS.SOCIAL_MEDIA}
      loading={loading}
    >
      <div className="card">
        <div className="space-y-4">
          {/* Topic Input */}
          <Input
            label="Topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., sustainable fashion, remote work, AI technology"
            disabled={loading}
            required
          />

          {/* Tone Selector */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">
              Tone <span className="text-red-500">*</span>
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={loading}
              className="input-field"
            >
              {TONE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <Button
            variant="primary"
            onClick={handleGenerate}
            loading={loading}
            disabled={loading || !topic.trim() || credits < CREDIT_COSTS.SOCIAL_MEDIA}
            className="w-full"
          >
            Generate Post
          </Button>
        </div>
      </div>

      {/* Creative Loader - Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <CreativeLoader 
            message="Creating engaging social media content..."
            style="sparkles"
          />
        </div>
      )}

      {/* Generated Content */}
      {generatedContent && !loading && (
        <div className="card">
          <div className="space-y-4">
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-dark-text">Generated Content:</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    📋 Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    🔄 New
                  </Button>
                </div>
              </div>
              <FormattedContent content={generatedContent} />
            </div>
          </div>
        </div>
      )}
    </GeneratorLayout>
  );
};

export default SocialMediaGenerator;



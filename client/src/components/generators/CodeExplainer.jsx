import React, { useState } from 'react';
import { useCredits } from '../../hooks/useCredits';
import { explainCode } from '../../services/generatorService';
import { CREDIT_COSTS, LANGUAGE_OPTIONS } from '../../utils/constants';
import { copyToClipboard } from '../../utils/helpers';
import GeneratorLayout from './GeneratorLayout';
import Button from '../common/Button';
import CreativeLoader from '../common/CreativeLoader';
import FormattedContent from '../common/FormattedContent';
import toast from 'react-hot-toast';

const CodeExplainer = () => {
  const { credits, updateCredits } = useCredits();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to explain');
      return;
    }

    if (credits < CREDIT_COSTS.CODE_EXPLAINER) {
      toast.error('Insufficient credits. You need at least ' + CREDIT_COSTS.CODE_EXPLAINER + ' credits.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Analyzing and explaining your code...');

    try {
      const result = await explainCode({ code, language });
      setExplanation(result.explanation);
      updateCredits(result.remainingCredits);
      toast.success('Code explained successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to explain code', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(explanation);
    if (success) {
      toast.success('Explanation copied to clipboard!');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleReset = () => {
    setCode('');
    setLanguage('javascript');
    setExplanation('');
  };

  return (
    <GeneratorLayout
      title="Code Explainer"
      icon="💻"
      creditCost={CREDIT_COSTS.CODE_EXPLAINER}
      loading={loading}
    >
      <div className="card">
        <div className="space-y-4">
          {/* Language Selector */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">
              Programming Language <span className="text-red-500">*</span>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              className="input-field"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-dark-text mb-1">
              Code Snippet <span className="text-red-500">*</span>
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              disabled={loading}
              rows={12}
              className="input-field font-mono text-sm"
            />
            <p className="mt-1 text-sm text-dark-muted">
              Enter the code you want explained. The AI will provide a detailed explanation.
            </p>
          </div>

          {/* Generate Button */}
          <Button
            variant="primary"
            onClick={handleGenerate}
            loading={loading}
            disabled={loading || !code.trim() || credits < CREDIT_COSTS.CODE_EXPLAINER}
            className="w-full"
          >
            Explain Code
          </Button>
        </div>
      </div>

      {/* Creative Loader - Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <CreativeLoader 
            message="Analyzing your code..."
            style="dots"
          />
        </div>
      )}

      {/* Explanation */}
      {explanation && !loading && (
        <div className="card">
          <div className="space-y-4">
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-dark-text">Explanation:</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    📋 Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    🔄 New
                  </Button>
                </div>
              </div>
              <FormattedContent content={explanation} />
            </div>
          </div>
        </div>
      )}
    </GeneratorLayout>
  );
};

export default CodeExplainer;



import React, { useState } from 'react';
import { useCredits } from '../../hooks/useCredits';
import { generateFullBlog } from '../../services/generatorService';
import { CREDIT_COSTS, TONE_OPTIONS } from '../../utils/constants';
import { copyToClipboard, downloadAsMarkdown, downloadAsPDF } from '../../utils/helpers';
import GeneratorLayout from './GeneratorLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import CreativeLoader from '../common/CreativeLoader';
import FormattedContent from '../common/FormattedContent';
import toast from 'react-hot-toast';

const FullBlogGenerator = () => {
  const { credits, updateCredits } = useCredits();
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedBlog, setGeneratedBlog] = useState('');
  const [loading, setLoading] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error('Please enter a blog title');
      return;
    }

    if (!keywords.trim()) {
      toast.error('Please enter keywords');
      return;
    }

    if (credits < CREDIT_COSTS.FULL_BLOG) {
      toast.error('Insufficient credits. You need at least ' + CREDIT_COSTS.FULL_BLOG + ' credits.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Generating your full blog post... This may take 30-60 seconds.');

    try {
      const result = await generateFullBlog({ title, keywords, tone });
      setGeneratedBlog(result.blogPost);
      updateCredits(result.remainingCredits);
      toast.success('Blog post generated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate blog post', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedBlog);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    downloadAsMarkdown(generatedBlog, `blog-${title.substring(0, 30)}.md`);
    toast.success('Downloaded as markdown file!');
  };

  const handleDownloadPDF = async () => {
    setExportingPDF(true);
    const loadingToast = toast.loading('Generating PDF... Please wait');
    
    try {
      const success = await downloadAsPDF(
        generatedBlog, 
        title, 
        `blog-${title.substring(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`
      );
      
      if (success) {
        toast.success('PDF downloaded successfully!', { id: loadingToast });
      } else {
        toast.error('Failed to generate PDF', { id: loadingToast });
      }
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to generate PDF', { id: loadingToast });
    } finally {
      setExportingPDF(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setKeywords('');
    setTone('professional');
    setGeneratedBlog('');
  };

  return (
    <GeneratorLayout
      title="Full Blog Post Generator"
      icon="📝"
      creditCost={CREDIT_COSTS.FULL_BLOG}
      loading={loading}
    >
      <div className="card">
        <div className="space-y-4">
          {/* Title Input */}
          <Input
            label="Blog Post Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., The Ultimate Guide to Machine Learning in 2024"
            disabled={loading}
            required
          />

          {/* Keywords Input */}
          <Input
            label="Keywords (comma separated)"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., machine learning, AI, deep learning, neural networks"
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

          {/* Info Box */}
          <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-4">
            <p className="text-sm text-dark-text">
              <strong>📖 Note:</strong> This will generate a comprehensive blog post (2000-3000 words) with 
              proper structure, headings, and SEO optimization. Generation may take 30-60 seconds.
            </p>
          </div>

          {/* Generate Button */}
          <Button
            variant="primary"
            onClick={handleGenerate}
            loading={loading}
            disabled={loading || !title.trim() || !keywords.trim() || credits < CREDIT_COSTS.FULL_BLOG}
            className="w-full"
          >
            {loading ? 'Generating... Please wait' : 'Generate Full Blog Post'}
          </Button>
        </div>
      </div>

      {/* Creative Loader - Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <CreativeLoader 
            message="Crafting your comprehensive blog post..."
            style="brain"
          />
        </div>
      )}

      {/* Generated Content */}
      {generatedBlog && !loading && (
        <div className="card">
          <div className="space-y-4">
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-dark-text">Generated Blog Post:</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    📋 Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDownload}>
                    � Markdown
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleDownloadPDF}
                    disabled={exportingPDF}
                    loading={exportingPDF}
                  >
                    {exportingPDF ? 'Generating...' : '📕 PDF'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    🔄 New
                  </Button>
                </div>
              </div>
              <FormattedContent 
                content={generatedBlog}
                className="max-h-[600px] overflow-y-auto"
              />
              <div className="mt-3 text-sm text-dark-muted">
                📊 Word count: ~{generatedBlog.split(/\s+/).length} words
              </div>
            </div>
          </div>
        </div>
      )}
    </GeneratorLayout>
  );
};

export default FullBlogGenerator;

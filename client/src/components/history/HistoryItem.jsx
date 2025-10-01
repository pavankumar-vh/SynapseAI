import React, { useState } from 'react';
import { deleteHistory } from '../../services/generatorService';
import { formatDate, truncateText, getToolDisplayName, getToolIcon, copyToClipboard } from '../../utils/helpers';
import Button from '../common/Button';
import Modal from '../common/Modal';
import FormattedContent from '../common/FormattedContent';
import toast from 'react-hot-toast';

const HistoryItem = ({ generation, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(generation.generatedContent);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHistory(generation._id);
      onDelete(generation._id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete generation');
    } finally {
      setIsDeleting(false);
    }
  };

  const getInputSummary = () => {
    const { inputPrompt, toolType } = generation;
    
    switch (toolType) {
      case 'social_media':
        return `Topic: ${inputPrompt.topic} | Tone: ${inputPrompt.tone}`;
      case 'blog_ideas':
        return `Keyword: ${inputPrompt.keyword}`;
      case 'code_explainer':
        return `Language: ${inputPrompt.language}`;
      default:
        return JSON.stringify(inputPrompt);
    }
  };

  return (
    <>
      <div className="bg-dark-surface rounded-xl border border-dark-border hover:border-accent-500/50 transition-all duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-dark-border">
          {/* Tool Icon */}
          <div className="text-4xl flex-shrink-0 bg-dark-bg rounded-lg p-3">
            {getToolIcon(generation.toolType)}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-semibold text-dark-text text-lg">
                  {getToolDisplayName(generation.toolType)}
                </h3>
                <p className="text-sm text-dark-muted mt-1 flex items-center gap-2">
                  <span>📅</span>
                  {formatDate(generation.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-accent-500/10 px-3 py-1.5 rounded-full border border-accent-500/20">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-semibold text-accent-400">
                  {generation.creditsUsed} credits
                </span>
              </div>
            </div>

            {/* Input Summary */}
            <div className="mt-3 text-sm text-dark-muted bg-dark-bg px-3 py-2 rounded-lg inline-block">
              {getInputSummary()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Preview or Full Content */}
          {isExpanded ? (
            <FormattedContent content={generation.generatedContent} />
          ) : (
            <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
              <p className="text-sm text-dark-text whitespace-pre-wrap">
                {truncateText(generation.generatedContent, 200)}
              </p>
            </div>
          )}

          {generation.generatedContent.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-accent-400 hover:text-accent-300 font-medium mt-3 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <span>▲</span> Show less
                </>
              ) : (
                <>
                  <span>▼</span> Show more
                </>
              )}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-dark-bg border-t border-dark-border">
          <div className="text-sm text-dark-muted">
            {generation.generatedContent.split(/\s+/).length} words
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="hover:bg-dark-surface"
            >
              📋 Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              🗑️ Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Generation"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={isDeleting}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-dark-text">
          Are you sure you want to delete this generation? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
};

export default HistoryItem;



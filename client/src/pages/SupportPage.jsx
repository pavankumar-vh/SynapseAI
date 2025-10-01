import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createSupportTicket } from '../services/supportService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import StaggerContainer, { StaggerItem } from '../components/common/StaggerContainer';

const SupportPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });

  const categories = [
    { value: 'technical', label: '🔧 Technical Issue', icon: '🔧' },
    { value: 'billing', label: '💳 Billing & Credits', icon: '💳' },
    { value: 'feature_request', label: '✨ Feature Request', icon: '✨' },
    { value: 'bug_report', label: '🐛 Bug Report', icon: '🐛' },
    { value: 'account', label: '👤 Account Issue', icon: '👤' },
    { value: 'other', label: '❓ Other', icon: '❓' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-blue-400' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { value: 'high', label: 'High', color: 'text-orange-400' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-400' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Please describe your issue');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Creating support ticket...');

    try {
      const response = await createSupportTicket(formData);
      toast.success(`Ticket ${response.ticket.ticketNumber} created successfully!`, { id: loadingToast });
      navigate('/support/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error(error.message || 'Failed to create ticket', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-dark-bg py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎫</div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-dark-text mb-4">
            Support Center
          </h1>
          <p className="text-lg text-dark-muted max-w-2xl mx-auto">
            Need help? Create a support ticket and our team will get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-surface rounded-2xl shadow-dark-lg border border-dark-border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject */}
            <StaggerItem>
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief description of your issue"
                required
                disabled={loading}
              />
            </StaggerItem>

            {/* Category */}
            <StaggerItem>
              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.category === cat.value
                          ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                          : 'border-dark-border bg-dark-bg text-dark-muted hover:border-dark-hover'
                      }`}
                    >
                      <div className="text-2xl mb-2">{cat.icon}</div>
                      <div className="text-sm font-medium">
                        {cat.label.replace(cat.icon + ' ', '')}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Priority */}
            <StaggerItem>
              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Priority Level
                </label>
                <div className="flex gap-3">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                        formData.priority === priority.value
                          ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                          : 'border-dark-border bg-dark-bg text-dark-muted hover:border-dark-hover'
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Description */}
            <StaggerItem>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-dark-text mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Please provide detailed information about your issue..."
                  required
                  disabled={loading}
                  className="input-field resize-none"
                />
                <p className="text-xs text-dark-muted mt-2">
                  Include any error messages, steps to reproduce, or relevant details
                </p>
              </div>
            </StaggerItem>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Ticket'}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-surface rounded-lg border border-dark-border p-6"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-dark-text mb-2">Fast Response</h3>
            <p className="text-sm text-dark-muted">
              We aim to respond to all tickets within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-surface rounded-lg border border-dark-border p-6"
          >
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-dark-text mb-2">Email Updates</h3>
            <p className="text-sm text-dark-muted">
              Get notified when we respond to your ticket
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-surface rounded-lg border border-dark-border p-6"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-dark-text mb-2">Track Progress</h3>
            <p className="text-sm text-dark-muted">
              View all your tickets and their status anytime
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportPage;

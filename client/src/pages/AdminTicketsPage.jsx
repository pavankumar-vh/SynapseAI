import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getAllTickets, updateTicketStatus, addAdminResponse } from '../services/supportService';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import FadeIn from '../components/common/FadeIn';

const AdminTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    search: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status', color: 'text-dark-muted' },
    { value: 'open', label: 'Open', color: 'text-blue-400' },
    { value: 'in_progress', label: 'In Progress', color: 'text-yellow-400' },
    { value: 'waiting_response', label: 'Waiting Response', color: 'text-purple-400' },
    { value: 'resolved', label: 'Resolved', color: 'text-green-400' },
    { value: 'closed', label: 'Closed', color: 'text-gray-500' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'technical', label: 'Technical' },
    { value: 'billing', label: 'Billing' },
    { value: 'feature_request', label: 'Feature Request' },
    { value: 'bug_report', label: 'Bug Report' },
    { value: 'account', label: 'Account' },
    { value: 'other', label: 'Other' }
  ];

  const priorityBadge = (priority) => {
    const colors = {
      low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      urgent: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[priority] || colors.medium;
  };

  const statusBadge = (status) => {
    const colors = {
      open: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      waiting_response: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      resolved: 'bg-green-500/10 text-green-400 border-green-500/20',
      closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    };
    return colors[status] || colors.open;
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getAllTickets(filters);
      setTickets(response.tickets);
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await updateTicketStatus(ticketId, { status: newStatus });
      toast.success('Status updated successfully');
      fetchTickets();
      if (selectedTicket && selectedTicket._id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleAddResponse = async (e) => {
    e.preventDefault();
    
    if (!responseMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSubmitting(true);

    try {
      const response = await addAdminResponse(selectedTicket._id, responseMessage);
      console.log('✅ Admin response API result:', response);
      toast.success('Response sent successfully');
      setResponseMessage('');
      
      // Update the selected ticket with the new response from server
      if (response.ticket) {
        console.log('✅ Updated ticket with responses:', response.ticket.responses);
        setSelectedTicket(response.ticket);
      } else {
        console.warn('⚠️ No ticket data in response, refreshing...');
        // Fallback: fetch the specific ticket again
        fetchTickets();
      }
      
      // Also refresh the ticket list to update counts
      fetchTickets();
    } catch (error) {
      console.error('❌ Error adding response:', error);
      toast.error('Failed to send response');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader size="lg" text="Loading tickets..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-bg py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-dark-text mb-2">
            🎫 Support Tickets
          </h1>
          <p className="text-dark-muted">Manage and respond to user support requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(stats).map(([status, count]) => (
            <FadeIn key={status}>
              <div className="bg-dark-surface rounded-lg border border-dark-border p-4">
                <div className="text-2xl font-bold text-accent-400">{count}</div>
                <div className="text-sm text-dark-muted capitalize">{status.replace('_', ' ')}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-dark-surface rounded-lg border border-dark-border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="input-field"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="input-field"
              >
                {categoryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-text mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search by ticket number, subject, or email..."
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12 bg-dark-surface rounded-lg border border-dark-border">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-dark-muted">No tickets found</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="bg-dark-surface rounded-lg border border-dark-border p-6 hover:border-accent-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-accent-400 font-mono text-sm font-semibold">
                        {ticket.ticketNumber}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${statusBadge(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityBadge(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-dark-text mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-dark-muted">
                      By {ticket.userName} ({ticket.userEmail}) • {formatDate(ticket.createdAt)}
                    </p>
                  </div>
                </div>

                <p className="text-dark-muted text-sm line-clamp-2 mb-4">{ticket.description}</p>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-dark-bg rounded text-dark-muted">
                    {ticket.category.replace('_', ' ')}
                  </span>
                  {ticket.responses && ticket.responses.length > 0 && (
                    <span className="text-xs text-accent-400">
                      💬 {ticket.responses.length} {ticket.responses.length === 1 ? 'reply' : 'replies'}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Ticket Detail Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTicket(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-surface rounded-2xl border border-dark-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-dark-surface border-b border-dark-border p-6 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-accent-400 font-mono font-semibold">
                        {selectedTicket.ticketNumber}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityBadge(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-dark-text mb-1">{selectedTicket.subject}</h2>
                    <p className="text-sm text-dark-muted">
                      By {selectedTicket.userName} ({selectedTicket.userEmail}) • {formatDate(selectedTicket.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-dark-muted hover:text-dark-text transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Status Change */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-dark-text mb-2">Change Status</label>
                  <div className="flex gap-2 flex-wrap">
                    {statusOptions.filter(s => s.value).map((status) => (
                      <button
                        key={status.value}
                        onClick={() => handleStatusChange(selectedTicket._id, status.value)}
                        className={`px-3 py-1 rounded text-sm font-medium border transition-all ${
                          selectedTicket.status === status.value
                            ? statusBadge(status.value)
                            : 'border-dark-border text-dark-muted hover:border-accent-500'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Original Message */}
                <div className="bg-dark-bg rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white font-semibold">
                      {selectedTicket.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-dark-text">{selectedTicket.userName}</div>
                      <div className="text-xs text-dark-muted">{formatDate(selectedTicket.createdAt)}</div>
                    </div>
                  </div>
                  <p className="text-dark-text whitespace-pre-wrap">{selectedTicket.description}</p>
                </div>

                {/* Responses */}
                {selectedTicket.responses && selectedTicket.responses.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-dark-text">Responses</h3>
                    {selectedTicket.responses.map((response, index) => (
                      <div
                        key={index}
                        className={`rounded-lg p-4 ${
                          response.isAdmin
                            ? 'bg-accent-500/10 border border-accent-500/20'
                            : 'bg-dark-bg'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                            response.isAdmin ? 'bg-accent-500' : 'bg-gray-500'
                          }`}>
                            {response.responderName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-dark-text">{response.responderName}</div>
                              {response.isAdmin && (
                                <span className="text-xs px-2 py-0.5 bg-accent-500 text-white rounded">Admin</span>
                              )}
                            </div>
                            <div className="text-xs text-dark-muted">{formatDate(response.createdAt)}</div>
                          </div>
                        </div>
                        <p className="text-dark-text whitespace-pre-wrap">{response.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Response Form */}
                <form onSubmit={handleAddResponse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">Add Response</label>
                    <textarea
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      rows={4}
                      placeholder="Type your response..."
                      className="input-field resize-none"
                      disabled={submitting}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setSelectedTicket(null)}
                      disabled={submitting}
                      className="flex-1"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={submitting}
                      disabled={submitting}
                      className="flex-1"
                    >
                      Send Response
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminTicketsPage;

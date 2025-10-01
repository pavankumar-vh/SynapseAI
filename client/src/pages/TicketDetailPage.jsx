import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getTicketById, addTicketResponse } from '../services/supportService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Loader from '../components/common/Loader';
import FadeIn from '../components/common/FadeIn';

const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseText, setResponseText] = useState('');
  const [sending, setSending] = useState(false);

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

  const priorityBadge = (priority) => {
    const colors = {
      low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      urgent: 'bg-red-500/10 text-red-400 border-red-500/20'
    };
    return colors[priority] || colors.medium;
  };

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await getTicketById(id);
      setTicket(data.ticket);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Failed to load ticket');
      navigate('/support/tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleSendResponse = async (e) => {
    e.preventDefault();
    
    if (!responseText.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSending(true);
    const loadingToast = toast.loading('Sending response...');

    try {
      await addTicketResponse(id, responseText);
      toast.success('Response sent successfully', { id: loadingToast });
      setResponseText('');
      fetchTicket(); // Refresh to show new response
    } catch (error) {
      console.error('Error sending response:', error);
      toast.error('Failed to send response', { id: loadingToast });
    } finally {
      setSending(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
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
        <Loader size="lg" text="Loading ticket..." />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-text mb-2">Ticket not found</h2>
          <Link to="/support/tickets">
            <Button variant="primary">Back to Tickets</Button>
          </Link>
        </div>
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
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/support/tickets" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tickets
        </Link>

        {/* Ticket Header */}
        <FadeIn>
          <div className="bg-dark-surface rounded-lg border border-dark-border p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent-400 font-mono text-lg font-semibold">
                    {ticket.ticketNumber}
                  </span>
                  <span className={`px-3 py-1 rounded text-sm font-medium border ${statusBadge(ticket.status)}`}>
                    {ticket.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded text-sm font-medium border ${priorityBadge(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-dark-text mb-2">
                  {ticket.subject}
                </h1>
                <div className="text-sm text-dark-muted">
                  <span>Created {formatDate(ticket.createdAt)}</span>
                  {ticket.updatedAt !== ticket.createdAt && (
                    <span> • Updated {formatDate(ticket.updatedAt)}</span>
                  )}
                </div>
              </div>
              <span className="text-xs px-3 py-1.5 bg-dark-bg rounded text-dark-muted capitalize">
                {ticket.category.replace('_', ' ')}
              </span>
            </div>

            {/* Original Message */}
            <div className="mt-6 pt-6 border-t border-dark-border">
              <h3 className="text-sm font-semibold text-dark-muted mb-2">ORIGINAL MESSAGE</h3>
              <p className="text-dark-text whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>
        </FadeIn>

        {/* Conversation Thread */}
        {ticket.responses && ticket.responses.length > 0 && (
          <FadeIn delay={0.1}>
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-semibold text-dark-text">Conversation</h2>
              <AnimatePresence>
                {ticket.responses.map((response, index) => (
                  <motion.div
                    key={response._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-lg border p-4 ${
                      response.isAdmin
                        ? 'bg-blue-500/5 border-blue-500/20'
                        : 'bg-dark-surface border-dark-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-dark-text font-medium">
                          {response.responderName || response.responderEmail}
                        </span>
                        {response.isAdmin && (
                          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded font-medium">
                            Admin
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-dark-muted">
                        {formatDate(response.createdAt)}
                      </span>
                    </div>
                    <p className="text-dark-text whitespace-pre-wrap">{response.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </FadeIn>
        )}

        {/* Response Form - Only show if ticket is not closed */}
        {ticket.status !== 'closed' && (
          <FadeIn delay={0.2}>
            <div className="bg-dark-surface rounded-lg border border-dark-border p-6">
              <h3 className="text-lg font-semibold text-dark-text mb-4">Add Response</h3>
              <form onSubmit={handleSendResponse}>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-dark-text placeholder-dark-muted focus:outline-none focus:border-accent-500 transition-colors resize-none"
                  disabled={sending}
                />
                <div className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={sending || !responseText.trim()}
                  >
                    {sending ? 'Sending...' : 'Send Response'}
                  </Button>
                </div>
              </form>
            </div>
          </FadeIn>
        )}

        {/* Closed Notice */}
        {ticket.status === 'closed' && (
          <FadeIn delay={0.2}>
            <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4 text-center">
              <p className="text-dark-muted">
                🔒 This ticket is closed. If you need further assistance, please create a new ticket.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </motion.div>
  );
};

export default TicketDetailPage;

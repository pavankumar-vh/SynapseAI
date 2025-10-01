import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getUserTickets } from '../services/supportService';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import FadeIn from '../components/common/FadeIn';

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await getUserTickets(params);
      setTickets(response.tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader size="lg" text="Loading your tickets..." />
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-display text-dark-text mb-2">
              My Support Tickets
            </h1>
            <p className="text-dark-muted">Track and manage your support requests</p>
          </div>
          <Link to="/support">
            <Button variant="primary">
              + New Ticket
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-dark-surface rounded-lg border border-dark-border p-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'All' },
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'closed', label: 'Closed' }
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status.value
                    ? 'bg-accent-500 text-white'
                    : 'bg-dark-bg text-dark-muted hover:text-dark-text'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets */}
        {tickets.length === 0 ? (
          <div className="text-center py-16 bg-dark-surface rounded-lg border border-dark-border">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">No tickets yet</h3>
            <p className="text-dark-muted">Click "+ New Ticket" above to create your first support ticket</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <FadeIn key={ticket._id} delay={index * 0.05}>
                <Link to={`/support/tickets/${ticket._id}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-dark-surface rounded-lg border border-dark-border p-6 hover:border-accent-500/50 transition-all cursor-pointer"
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
                      </div>
                      <h3 className="text-lg font-semibold text-dark-text mb-1">
                        {ticket.subject}
                      </h3>
                      <p className="text-sm text-dark-muted">
                        Created {formatDate(ticket.createdAt)}
                        {ticket.updatedAt !== ticket.createdAt && ` • Updated ${formatDate(ticket.updatedAt)}`}
                      </p>
                    </div>
                  </div>

                  <p className="text-dark-muted text-sm line-clamp-2 mb-4">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-dark-bg rounded text-dark-muted capitalize">
                        {ticket.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs px-2 py-1 bg-dark-bg rounded text-dark-muted capitalize">
                        {ticket.priority}
                      </span>
                    </div>
                    
                    {ticket.responses && ticket.responses.length > 0 && (
                      <span className="text-sm text-accent-400">
                        💬 {ticket.responses.length} {ticket.responses.length === 1 ? 'reply' : 'replies'}
                      </span>
                    )}
                  </div>
                </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyTicketsPage;

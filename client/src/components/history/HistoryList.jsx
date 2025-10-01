import React, { useState, useEffect } from 'react';
import { getHistory } from '../../services/generatorService';
import HistoryItem from './HistoryItem';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import toast from 'react-hot-toast';

const HistoryList = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchHistory = async (pageNum = 1) => {
    setLoading(true);
    try {
      const result = await getHistory(pageNum, ITEMS_PER_PAGE);
      setHistory(result.history);
      setTotalPages(result.pages);
      setTotal(result.total);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = (deletedId) => {
    // Remove deleted item from the list
    setHistory(prev => prev.filter(item => item._id !== deletedId));
    setTotal(prev => prev - 1);
    toast.success('Generation deleted successfully');
    
    // Refresh if page becomes empty
    if (history.length === 1 && page > 1) {
      fetchHistory(page - 1);
    } else if (history.length === 1) {
      fetchHistory(1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchHistory(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && history.length === 0) {
    return <Loader size="lg" text="Loading your history..." />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-text">Generation History</h1>
        <p className="text-dark-muted mt-2">
          {total > 0 ? `View all your ${total} generated content` : 'No generations yet'}
        </p>
      </div>

      {history.length === 0 && !loading ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-dark-text mb-2">No History Yet</h3>
          <p className="text-dark-muted mb-6">
            Start generating content to see your history here
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {history.map((item) => (
              <HistoryItem
                key={item._id}
                generation={item}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || loading}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryList;



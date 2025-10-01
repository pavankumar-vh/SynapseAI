import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, updateUserCredits, getAdminStats } from '../../services/adminService';
import Button from '../common/Button';
import Input from '../common/Input';
import Loader from '../common/Loader';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [creditAction, setCreditAction] = useState('add');
  const [creditAmount, setCreditAmount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, statsData] = await Promise.all([
        getAllUsers(),
        getAdminStats()
      ]);
      setUsers(usersData.users);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error(error.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers({ search: searchTerm });
      setUsers(data.users);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCredits = async (e) => {
    e.preventDefault();
    if (!selectedUser || !creditAmount) {
      toast.error('Please select a user and enter credit amount');
      return;
    }

    try {
      const amount = parseInt(creditAmount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid positive number');
        return;
      }

      await updateUserCredits(selectedUser._id, {
        credits: amount,
        action: creditAction
      });

      toast.success(`Credits ${creditAction === 'add' ? 'added' : creditAction === 'deduct' ? 'deducted' : 'updated'} successfully!`);
      setCreditAmount('');
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to update credits');
    }
  };

  if (loading && !users.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2">🔑 Admin Dashboard</h1>
        <p className="text-dark-muted">Manage users and credits</p>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-sm font-medium text-dark-muted mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-accent-400">{stats.totalUsers}</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-dark-muted mb-2">Total Credits in System</h3>
            <p className="text-3xl font-bold text-green-400">{stats.totalCreditsInSystem}</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-dark-muted mb-2">Recent Signups</h3>
            <p className="text-3xl font-bold text-accent-400">{stats.recentUsers?.length || 0}</p>
          </div>
          <Link to="/admin/tickets" className="card hover:border-accent-500/50 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-dark-muted mb-2">Support Tickets</h3>
            <p className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">🎫</p>
            <p className="text-xs text-dark-muted mt-2">View all tickets →</p>
          </Link>
        </div>
      )}

      {/* Update Credits Form */}
      {selectedUser && (
        <div className="card mb-8 bg-accent-500/10 border-2 border-accent-500/30">
          <h3 className="text-lg font-semibold text-dark-text mb-4">💳 Update Credits for: {selectedUser.email}</h3>
          <form onSubmit={handleUpdateCredits} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-1">Action</label>
                <select
                  value={creditAction}
                  onChange={(e) => setCreditAction(e.target.value)}
                  className="input-field"
                >
                  <option value="add">Add Credits</option>
                  <option value="deduct">Deduct Credits</option>
                  <option value="set">Set Credits</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-text mb-1">Amount</label>
                <Input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" variant="primary" className="flex-1">
                  Update
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => {
                    setSelectedUser(null);
                    setCreditAmount('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <p className="text-sm text-dark-muted">
              Current credits: <strong className="text-dark-text">{selectedUser.credits}</strong>
            </p>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="card mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by email or name..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} variant="primary">
            Search
          </Button>
          {searchTerm && (
            <Button 
              onClick={() => {
                setSearchTerm('');
                fetchData();
              }} 
              variant="ghost"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold text-dark-text mb-4">👥 All Users</h3>
        <table className="min-w-full divide-y divide-dark-border">
          <thead className="bg-dark-bg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                Credits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-surface divide-y divide-dark-border">
            {users.map((user) => (
              <tr key={user._id} className={selectedUser?._id === user._id ? 'bg-accent-500/10' : 'hover:bg-dark-bg'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-dark-text">{user.displayName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-dark-muted">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.credits > 50 ? 'bg-green-100 text-green-800' : 
                    user.credits > 20 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.credits} credits
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-muted">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedUser(user)}
                  >
                    Manage Credits
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

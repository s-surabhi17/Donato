// src/components/AdminDashboard/AdminDashboard.jsx
// src/components/AdminDashboard/AdminDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import "./AdminDashboard.css";
import AllNGOS from "../../pages/AllNGOS";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    ngoCount: 0,
    donorCount: 0,
    volunteerCount: 0,
    pendingRequests: 0
  });
  const [ngoList, setNgoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch NGOs
      const ngoRes = await fetch(`${BACKEND_URL}/ngos`, {
        credentials: "include",
      });
      const ngoData = await ngoRes.json();

      // Fetch Users (for donor/volunteer count)
      const userRes = await fetch(`${BACKEND_URL}/admin/users`, {
        credentials: "include",
      });
      const userData = await userRes.json();

      if (ngoData.success && Array.isArray(ngoData.data)) {
        setNgoList(ngoData.data);
        
        // Calculate stats
        const donors = userData.success ? userData.data.filter(user => user.role === 'donor').length : 0;
        const volunteers = userData.success ? userData.data.filter(user => user.role === 'volunteer').length : 0;
        
        setStats({
          ngoCount: ngoData.data.length,
          donorCount: donors,
          volunteerCount: volunteers,
          pendingRequests: Math.floor(Math.random() * 10) // Demo data
        });
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const currentUser = getCurrentUser();

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>👋 Welcome back, {currentUser?.name || 'Admin'}</h1>
            <p className="subtitle">Here's what's happening with your platform today</p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={fetchDashboardData}>
              🔄 Refresh
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card primary">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>NGOs</h3>
            <p className="stat-number">{stats.ngoCount}</p>
            <span className="stat-label">Registered Organizations</span>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">💝</div>
          <div className="stat-content">
            <h3>Donors</h3>
            <p className="stat-number">{stats.donorCount}</p>
            <span className="stat-label">Active Contributors</span>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <h3>Volunteers</h3>
            <p className="stat-number">{stats.volunteerCount}</p>
            <span className="stat-label">Community Helpers</span>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pendingRequests}</p>
            <span className="stat-label">Awaiting Review</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ngos' ? 'active' : ''}`}
          onClick={() => setActiveTab('ngos')}
        >
          🏢 Manage NGOs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Manage Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="quick-actions">
              <h3>🚀 Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => setActiveTab('ngos')}>
                  ➕ Add New NGO
                </button>
                <button className="action-btn" onClick={() => setActiveTab('users')}>
                  👤 Manage Users
                </button>
                <button className="action-btn">
                  📧 Send Announcements
                </button>
                <button className="action-btn">
                  📊 Generate Reports
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>📋 Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">🏢</span>
                  <div className="activity-content">
                    <p><strong>New NGO registered:</strong> Hope Foundation</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">💝</span>
                  <div className="activity-content">
                    <p><strong>Large donation received:</strong> $5,000 from Anonymous</p>
                    <span className="activity-time">5 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🤝</span>
                  <div className="activity-content">
                    <p><strong>New volunteer joined:</strong> Sarah Johnson</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ngos' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>🏢 Manage NGOs</h2>
              <button className="primary-btn">➕ Add New NGO</button>
            </div>
            <AllNGOS data={ngoList} />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>👥 User Management</h2>
              <button className="primary-btn">➕ Add User</button>
            </div>
            <div className="user-management-placeholder">
              <p>👤 User management interface coming soon...</p>
              <p>Current users: {stats.donorCount + stats.volunteerCount + stats.ngoCount} total</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>📈 Platform Analytics</h2>
              <button className="primary-btn">📊 Export Data</button>
            </div>
            <div className="analytics-placeholder">
              <div className="chart-placeholder">
                <h4>📊 Monthly Growth</h4>
                <p>Interactive charts and graphs would go here</p>
              </div>
              <div className="chart-placeholder">
                <h4>💰 Donation Trends</h4>
                <p>Donation analytics and trends</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
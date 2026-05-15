import { useState } from 'react';
import { useUser } from './context/UserContext';
import { useApi } from './hooks/useApi';
import { fetchProfile, fetchDashboard, fetchStats, fetchCallHistory } from './api/api';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';
import StatsCards from './components/StatsCards/StatsCards';
import RecentCalls from './components/RecentCalls/RecentCalls';
import EmptyState from './components/EmptyState/EmptyState';
import FeedbackModal from './components/FeedbackModal/FeedbackModal';
import LogoutModal from './components/LogoutModal/LogoutModal';
import UserSwitcher from './components/UserSwitcher/UserSwitcher';

import './App.css';

/**
 * Main App component - Orchestrates all sub-components and API data.
 */
function AppContent() {
  const { userId } = useUser();

  // State for modals
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Fetch all data using our custom hook
  const { data: profileData, loading: profileLoading } = useApi(fetchProfile, userId);
  const { data: dashboardData, loading: dashboardLoading } = useApi(fetchDashboard, userId);
  const { data: statsData, loading: statsLoading } = useApi(fetchStats, userId);
  const { data: callData, loading: callsLoading } = useApi(fetchCallHistory, userId);

  // Extract relevant fields — API returns data directly, not nested
  const profile = profileData || null;
  const stats = statsData || null;
  const callSessions = callData?.callSessions || [];
  const hasCallData = callSessions.length > 0;
  const isLoading = profileLoading || dashboardLoading || statsLoading || callsLoading;

  // Get first name for greeting
  const firstName = profile?.firstName || '';

  // Handle logout
  function handleLogout() {
    setLogoutOpen(false);
    // In a real app, this would clear auth tokens and redirect
    alert('Logged out successfully! (Mock action)');
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
        onFeedbackClick={() => setFeedbackOpen(true)}
        onLogout={() => setLogoutOpen(true)}
        dashboardData={dashboardData?.dashboard || null}
      />

      {/* Main Content Area */}
      <div className="main-area">
        {/* Header */}
        <Header profile={profile} onLogout={() => setLogoutOpen(true)} />

        {/* Page Content */}
        <main className="main-content">
          {/* User Switcher (Demo Control) */}
          <UserSwitcher />

          {/* Loading State */}
          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner" />
              <p className="loading-text">Loading dashboard...</p>
            </div>
          )}

          {/* Content (shown when not loading) */}
          {!isLoading && (
            <>
              {/* Welcome Section */}
              <WelcomeSection firstName={firstName} />

              {/* Stats Cards */}
              <StatsCards stats={stats} />

              {/* Recent Calls or Empty State */}
              {hasCallData ? (
                <RecentCalls callSessions={callSessions} />
              ) : (
                <EmptyState />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default AppContent;

import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './Sidebar.css';

/**
 * Sidebar component - Left navigation panel.
 * Contains: Logo, nav items, feedback, upgrade button, footer.
 */
export default function Sidebar({ onFeedbackClick, onLogout, dashboardData }) {
  const { userId } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Calculate hours used from dashboard API data
  const kbUsed = dashboardData?.usage?.kb_files?.used || 0;
  const kbLimit = dashboardData?.usage?.kb_files?.limit || 1000;

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="sidebar-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <h1 className="sidebar-logo">Hintro</h1>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="sidebar-nav-group">
            {/* Dashboard - Active */}
            <div className="sidebar-nav-item sidebar-nav-item--active">
              <div className="sidebar-nav-item-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm0 2v4h16V5H4zm0 6v8h7v-8H4zm9 0v8h7v-8h-7z"/>
                </svg>
                <span>Dashboard</span>
              </div>
            </div>

            {/* Call Insights */}
            <div className="sidebar-nav-item">
              <div className="sidebar-nav-item-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
                </svg>
                <span>Call Insights</span>
              </div>
            </div>

            {/* Knowledge Base */}
            <div className="sidebar-nav-item sidebar-nav-item--with-badge">
              <div className="sidebar-nav-item-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-5 7h8v2H8v-2zm0 4h8v2H8v-2z"/>
                </svg>
                <span>Knowledge Base</span>
              </div>
              <svg className="sidebar-info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </div>

            {/* Prompts */}
            <div className="sidebar-nav-item sidebar-nav-item--with-badge">
              <div className="sidebar-nav-item-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
                <span>Prompts</span>
              </div>
              <svg className="sidebar-info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </div>

            {/* Boxy Controls */}
            <div className="sidebar-nav-item sidebar-nav-item--with-badge">
              <div className="sidebar-nav-item-content">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Boxy Controls</span>
              </div>
              <svg className="sidebar-info-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>

          {/* Feedback History */}
          <div className="sidebar-bottom-group">
            <div className="sidebar-nav-item" onClick={onFeedbackClick} style={{ cursor: 'pointer' }}>
              <div className="sidebar-nav-item-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 3h18v18H3V3zm9 13.5L17 11h-3V7h-4v4H7l5 5.5z"/>
                </svg>
                <span>Feedback History</span>
              </div>
            </div>

            {/* Feedback */}
            <div className="sidebar-nav-item" onClick={onFeedbackClick} style={{ cursor: 'pointer' }}>
              <div className="sidebar-nav-item-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-3.41A4.98 4.98 0 0012 2a4.98 4.98 0 00-4.59 4H4v4h1v12h14V10h1V6zm-8-2c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2zm-6 6h4v10H6V10zm12 10h-4V10h4v10z"/>
                </svg>
                <span>Feedback</span>
              </div>
            </div>
            
            <button className="sidebar-upgrade-btn">Upgrade</button>
          </div>
        </nav>
      </aside>
    </>
  );
}

import './EmptyState.css';

/**
 * EmptyState component - Shown when user has no recent calls.
 */
export default function EmptyState() {
  return (
    <div className="empty-state-wrapper">
      <h3 className="empty-state-section-title">Recent calls</h3>

      <div className="empty-state">
        <div className="empty-state-content">
          {/* Illustration */}
          <div className="empty-state-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>

          {/* Text */}
          <div className="empty-state-text">
            <h4 className="empty-state-title">No Recent Calls</h4>
            <p className="empty-state-description">
              Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button className="empty-state-btn">Start a Call</button>
      </div>
    </div>
  );
}

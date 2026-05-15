import { useState } from 'react';
import { getInitial } from '../../utils/formatters';
import './Header.css';

/**
 * Header component - Top bar with title, tutorial button, and user info.
 */
export default function Header({ profile, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const userInitial = profile ? getInitial(profile.firstName) : '?';

  return (
    <header className="header">
      <h2 className="header-title">Dashboard</h2>

      <div className="header-right">
        {/* Watch Tutorial Button */}
        <button className="header-tutorial-btn">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <polygon points="2,0 12,6 2,12" />
          </svg>
          <span>Watch Tutorial</span>
        </button>

        {/* User Profile */}
        <div
          className="header-user"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="header-avatar">
            {userInitial}
          </div>
          <svg
            className={`header-arrow ${showDropdown ? 'header-arrow--open' : ''}`}
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="header-dropdown">
            <button className="header-dropdown-item" onClick={() => { onLogout(); setShowDropdown(false); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

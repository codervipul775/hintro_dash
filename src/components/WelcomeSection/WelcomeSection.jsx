import './WelcomeSection.css';

/**
 * WelcomeSection component - Shows greeting and "Start New Call" button.
 */
export default function WelcomeSection({ firstName }) {
  const displayName = firstName || 'User';

  return (
    <div className="welcome">
      <div className="welcome-text">
        <h2 className="welcome-greeting">
          Hi, {displayName} Welcome to Hintro
        </h2>
        <p className="welcome-subtitle">
          Ready to make your next call smarter ?
        </p>
      </div>
      <button className="welcome-cta">Start New Call</button>
    </div>
  );
}

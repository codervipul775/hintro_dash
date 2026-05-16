import { formatDuration, formatRelativeTime } from '../../utils/formatters';
import './StatsCards.css';

/**
 * StatsCards component - Shows 4 stat cards in a row.
 * Cards: Total Sessions, Average Duration, AI Used, Last Session.
 */
export default function StatsCards({ stats }) {
  // Format the stats data from the API
  const totalSessions = stats?.totalSessions ?? 0;
  const avgDuration = formatDuration(stats?.averageDuration || 0);
  const aiUsed = stats?.totalAIInteractions ?? 0;

  // Last session: get the most recent date from the array
  const lastSessionDates = stats?.lastSession || [];
  const lastSessionDate = lastSessionDates.length > 0 ? lastSessionDates[0] : null;
  const lastSession = lastSessionDate ? formatRelativeTime(lastSessionDate) : '-';

  // Card data array for easy rendering
  const cards = [
    {
      id: 'sessions',
      label: 'Total Sessions',
      value: totalSessions.toString(),
      iconBg: 'var(--color-stat-sessions-bg)',
      iconColor: 'var(--color-icon-sessions)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2v9h9c0 5-4 9-9 9s-9-4-9-9 4-9 9-9z"/>
          <path d="M13 2.05v7.95h7.95c-.45-4.2-3.75-7.5-7.95-7.95z"/>
        </svg>
      ),
    },
    {
      id: 'duration',
      label: 'Average Duration',
      value: avgDuration,
      iconBg: 'var(--color-stat-duration-bg)',
      iconColor: 'var(--color-icon-duration)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 11H11V7h2v3h2v2z" />
        </svg>
      ),
    },
    {
      id: 'ai',
      label: 'AI Used',
      value: aiUsed === 0 ? '0' : `${aiUsed} times`,
      iconBg: 'var(--color-stat-ai-bg)',
      iconColor: 'var(--color-icon-ai)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35z"/>
        </svg>
      ),
    },
    {
      id: 'last',
      label: 'Last Session',
      value: lastSession,
      iconBg: 'var(--color-stat-last-bg)',
      iconColor: 'var(--color-icon-last)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="stats-cards">
      {cards.map((card) => (
        <div key={card.id} className="stat-card">
          {/* Icon */}
          <div
            className="stat-card-icon"
            style={{ backgroundColor: card.iconBg, color: card.iconColor }}
          >
            {card.icon}
          </div>

          {/* Text */}
          <div className="stat-card-info">
            <span className="stat-card-label">{card.label}</span>
            <span className="stat-card-value">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// UTILITY FUNCTIONS - Time & Data Formatting
// ==========================================

/**
 * Convert seconds to "Xm Ysec" format.
 * Example: 2388 → "39m 48sec"
 * Returns "0" if seconds is 0.
 */
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) return `${remainingSeconds}sec`;
  if (remainingSeconds === 0) return `${minutes}m`;
  return `${minutes}m ${remainingSeconds}sec`;
}

/**
 * Convert an ISO date string to relative time.
 * Example: "2 days ago", "5 hours ago", "just now"
 * Returns "-" if no date is provided.
 */
export function formatRelativeTime(isoDate) {
  if (!isoDate) return '-';

  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

/**
 * Format an ISO date string to time like "11:00 am".
 */
export function formatCallTime(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const minutesStr = minutes.toString().padStart(2, '0');
  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format an ISO date string to "Month Dayth" format.
 * Example: "2026-04-29" → "April 29th"
 */
export function formatCallDate(isoDate) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return `${month} ${day}${suffix}`;
}

/**
 * Get the suffix for a day number (st, nd, rd, th).
 */
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Group call sessions by date for rendering.
 * Returns an array of { date: "April 29th", calls: [...] }
 */
export function groupCallsByDate(sessions) {
  if (!sessions || sessions.length === 0) return [];

  const groups = {};

  sessions.forEach(session => {
    const dateKey = new Date(session.started_at).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = {
        date: formatCallDate(session.started_at),
        calls: [],
      };
    }
    groups[dateKey].calls.push(session);
  });

  // Return as array, sorted by most recent first
  return Object.values(groups);
}

/**
 * Get first letter of a string as uppercase initial.
 */
export function getInitial(name) {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}

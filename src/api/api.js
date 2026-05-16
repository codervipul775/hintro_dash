// ==========================================
// API LAYER - All API call functions
// ==========================================

const BASE_URL = 'https://mock-backend-hintro.vercel.app';

/**
 * Helper function to make API requests with the x-user-id header.
 * @param {string} endpoint - The API endpoint (e.g., '/api/auth/profile')
 * @param {string} userId - The user ID ('u1' or 'u2')
 * @returns {Promise<Object>} - The JSON response data
 */
async function apiRequest(endpoint, userId) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'x-user-id': userId,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch user profile data.
 */
export function fetchProfile(userId) {
  return apiRequest('/api/auth/profile', userId);
}

/**
 * Fetch dashboard data (user info, subscription, usage).
 */
export function fetchDashboard(userId) {
  return apiRequest('/api/auth/dashboard', userId);
}

/**
 * Fetch call session stats (total sessions, avg duration, etc).
 */
export function fetchStats(userId) {
  return apiRequest('/api/call-sessions/stats', userId);
}

/**
 * Fetch call history with pagination.
 * @param {string} userId - The user ID
 * @param {number} limit - Number of records to fetch (default: 10)
 */
export function fetchCallHistory(userId, limit = 10) {
  return apiRequest(`/api/call-sessions?limit=${limit}`, userId);
}

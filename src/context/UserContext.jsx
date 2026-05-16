import { createContext, useContext, useState } from 'react';

// Create context to hold the current user ID
const UserContext = createContext();

/**
 * UserProvider wraps the app and provides userId + setUserId
 * to all child components via React Context.
 */
export function UserProvider({ children }) {
  // Default user is 'u1' (empty state user)
  const [userId, setUserId] = useState('u1');

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Custom hook to access the user context.
 * Returns { userId, setUserId }
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside a UserProvider');
  }
  return context;
}

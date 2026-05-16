import { useUser } from '../../context/UserContext';
import './UserSwitcher.css';

/**
 * UserSwitcher component - Toggle between u1 (empty) and u2 (filled) states.
 * This is a demo utility to showcase the two different user states.
 */
export default function UserSwitcher() {
  const { userId, setUserId } = useUser();

  return (
    <div className="user-switcher">
      <span className="user-switcher-label">Switch User:</span>
      <div className="user-switcher-buttons">
        <button
          className={`user-switcher-btn ${userId === 'u1' ? 'user-switcher-btn--active' : ''}`}
          onClick={() => setUserId('u1')}
        >
          User 1 (Empty)
        </button>
        <button
          className={`user-switcher-btn ${userId === 'u2' ? 'user-switcher-btn--active' : ''}`}
          onClick={() => setUserId('u2')}
        >
          User 2 (Data)
        </button>
      </div>
    </div>
  );
}

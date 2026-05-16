import './LogoutModal.css';

/**
 * LogoutModal component - Confirmation dialog for logging out.
 */
export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="logout-overlay" onClick={onClose} />
      <div className="logout-modal">
        <div className="logout-content">
          {/* Header */}
          <div className="logout-header">
            <div className="logout-header-text">
              <h3 className="logout-title">Leaving already?</h3>
            </div>
            <div className="logout-divider" />
          </div>

          {/* Body */}
          <p className="logout-message">
            You can log back in anytime to continue your meetings with Hintro.
          </p>

          {/* Actions */}
          <div className="logout-actions">
            <button className="logout-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="logout-confirm" onClick={onConfirm}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import './FeedbackModal.css';

const STORAGE_KEY = 'hintro_feedbacks';

/**
 * FeedbackModal component - Slide-in panel for submitting and viewing feedback.
 * Feedback is stored in localStorage.
 */
export default function FeedbackModal({ isOpen, onClose }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [view, setView] = useState('form'); // 'form' or 'history'
  const [submitted, setSubmitted] = useState(false);

  // Load feedbacks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFeedbacks(JSON.parse(stored));
      } catch {
        setFeedbacks([]);
      }
    }
  }, [isOpen]);

  // Save feedback
  function handleSubmit(e) {
    e.preventDefault();

    if (rating === 0) return;

    const newFeedback = {
      id: Date.now(),
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedbacks));

    // Reset form
    setRating(0);
    setComment('');
    setSubmitted(true);

    // Auto-hide submitted message after 2 seconds
    setTimeout(() => setSubmitted(false), 2000);
  }

  // Delete a feedback entry
  function handleDelete(id) {
    const updated = feedbacks.filter((f) => f.id !== id);
    setFeedbacks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="feedback-overlay" onClick={onClose} />
      <div className="feedback-modal">
        {/* Header */}
        <div className="feedback-header">
          <h3 className="feedback-title">
            {view === 'form' ? 'Give Feedback' : 'Feedback History'}
          </h3>
          <button className="feedback-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="feedback-tabs">
          <button
            className={`feedback-tab ${view === 'form' ? 'feedback-tab--active' : ''}`}
            onClick={() => setView('form')}
          >
            Submit
          </button>
          <button
            className={`feedback-tab ${view === 'history' ? 'feedback-tab--active' : ''}`}
            onClick={() => setView('history')}
          >
            History ({feedbacks.length})
          </button>
        </div>

        {/* Content */}
        <div className="feedback-body">
          {view === 'form' ? (
            <form className="feedback-form" onSubmit={handleSubmit}>
              {/* Success message */}
              {submitted && (
                <div className="feedback-success">
                  ✅ Thank you for your feedback!
                </div>
              )}

              {/* Rating */}
              <div className="feedback-field">
                <label className="feedback-label">How would you rate your experience?</label>
                <div className="feedback-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`feedback-star ${star <= rating ? 'feedback-star--active' : ''}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="feedback-field">
                <label className="feedback-label">Tell us more (optional)</label>
                <textarea
                  className="feedback-textarea"
                  rows="4"
                  placeholder="Your feedback helps us improve..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="feedback-submit"
                disabled={rating === 0}
              >
                Submit Feedback
              </button>
            </form>
          ) : (
            <div className="feedback-history">
              {feedbacks.length === 0 ? (
                <p className="feedback-empty">No feedback yet. Be the first!</p>
              ) : (
                feedbacks.map((fb) => (
                  <div key={fb.id} className="feedback-entry">
                    <div className="feedback-entry-top">
                      <div className="feedback-entry-stars">
                        {'★'.repeat(fb.rating)}
                        {'☆'.repeat(5 - fb.rating)}
                      </div>
                      <button
                        className="feedback-entry-delete"
                        onClick={() => handleDelete(fb.id)}
                        title="Delete"
                      >
                        ×
                      </button>
                    </div>
                    {fb.comment && (
                      <p className="feedback-entry-comment">{fb.comment}</p>
                    )}
                    <span className="feedback-entry-date">
                      {new Date(fb.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

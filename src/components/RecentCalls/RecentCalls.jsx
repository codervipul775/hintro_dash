import { groupCallsByDate, formatCallTime, getInitial } from '../../utils/formatters';
import './RecentCalls.css';

/**
 * RecentCalls component - Displays call history grouped by date.
 */
export default function RecentCalls({ callSessions }) {
  const groupedCalls = groupCallsByDate(callSessions || []);

  return (
    <div className="recent-calls">
      <h3 className="recent-calls-title">Recent calls</h3>

      <div className="recent-calls-list">
        {groupedCalls.map((group, groupIndex) => (
          <div key={groupIndex} className="recent-calls-group">
            {/* Date Header */}
            <p className="recent-calls-date">{group.date}</p>

            {/* Call Items */}
            {group.calls.map((call) => (
              <div key={call._id} className="call-item">
                <div className="call-item-left">
                  {/* Client Initial Avatar */}
                  <div className="call-item-avatar">
                    <div className="call-item-initial-bg">
                      {getInitial(call.client)}
                    </div>
                  </div>

                  {/* Call Info */}
                  <div className="call-item-info">
                    <span className="call-item-name">{call.description}</span>

                    {/* Participant Avatars */}
                    <div className="call-item-participants">
                      {call.participants?.map((participant, i) => (
                        <div
                          key={i}
                          className="call-item-participant"
                          style={{ marginLeft: i > 0 ? '-6px' : '0' }}
                          title={participant.name}
                        >
                          {getInitial(participant.name)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="call-item-right">
                  <span className="call-item-time">
                    {formatCallTime(call.started_at)}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

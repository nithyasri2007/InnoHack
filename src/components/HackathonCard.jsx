import React from "react";
import "./HackathonCard.css";

const getDaysLabel = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  if (diff < 0) return `${Math.abs(diff)} day(s) late`;
  if (diff === 0) return "Due today";
  return `${diff} day(s) left`;
};

const getStatusLabel = (deadline, applied) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  if (diff < 0) return "Completed";
  if (diff <= 3) return applied ? "Closing Soon" : "Urgent";
  return applied ? "Applied" : "Open";
};

const HackathonCard = ({
  hackathon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  secondaryDisabled,
  isApplied,
  showStatus,
}) => {
  return (
    <div className="hackathon-card">
      {hackathon.posterUrl && (
        <div className="hackathon-card-image">
          <img src={hackathon.posterUrl} alt={hackathon.name} />
        </div>
      )}
      <div className="hackathon-card-body">
        <h3>{hackathon.name}</h3>
        <p className="college">{hackathon.college}</p>
        <div className="card-details">
          <span className="domain">{hackathon.domain}</span>
          <span className="deadline">
            Deadline: {new Date(hackathon.deadline).toLocaleDateString()}
          </span>
        </div>
        {hackathon.description && (
          <p className="description">{hackathon.description}</p>
        )}
        <div className="meta-row">
          <span className="days-label">{getDaysLabel(hackathon.deadline)}</span>
          {showStatus && (
            <span className={`status ${isApplied ? "status-applied" : ""}`}>
              {getStatusLabel(hackathon.deadline, isApplied)}
            </span>
          )}
        </div>
        <div className="action-buttons">
          {actionLabel && onAction && (
            <button
              className={`action-button ${isApplied ? "action-button-applied" : ""}`}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              className={`action-button ${secondaryDisabled ? "action-button-applied" : ""}`}
              onClick={onSecondaryAction}
              disabled={secondaryDisabled}
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;

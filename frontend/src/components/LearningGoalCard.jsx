import { useState } from 'react';
import { Calendar, Target, BarChart, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from './Badge';
import ProgressBar from './ProgressBar';
import { daysLeft, formatDate } from './DateUtils';

function LearningGoalCard({ goal, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const completedMilestones = goal.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = goal.milestones?.length || 0;
  const progress = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;
  const borderColor = goal.category === 'Programming' ? '#2563eb' : goal.category === 'Design' ? '#ef4444' : goal.category === 'Marketing' ? '#eab308' : '#6b7280';
  const progressColor = goal.category === 'Programming' ? 'blue' : goal.category === 'Design' ? 'red' : goal.category === 'Marketing' ? 'yellow' : 'gray';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-t-4 relative flex flex-col" style={{ borderTopColor: borderColor }}>
      {/* Top badges and actions */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2">
          <Badge color={goal.category}>{goal.category}</Badge>
          <Badge color={goal.status}>{goal.status.replace('_', ' ')}</Badge>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button title="Edit Goal" onClick={() => onEdit(goal)} className="text-gray-500 hover:text-blue-600 p-1 rounded">
              <Edit2 size={18} />
            </button>
          )}
          {onDelete && (
            <button title="Delete Goal" onClick={() => onDelete(goal.id)} className="text-red-500 hover:text-red-700 p-1 rounded">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
      {/* Title & Description */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{goal.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{goal.description}</p>
      </div>
      {/* Progress & Dates */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{formatDate(goal.startDate)} — {formatDate(goal.targetDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target size={14} />
          <span>{daysLeft(goal.targetDate)}</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-2">
        <ProgressBar value={progress} color={progressColor} />
        <div className="flex justify-between text-xs mt-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
      </div>
      {/* Milestone summary and expand/collapse */}
      <div className="flex items-center justify-between mt-2 mb-1">
        <span className="text-xs text-gray-700 font-medium">{totalMilestones} milestone{totalMilestones !== 1 ? 's' : ''}</span>
        {totalMilestones > 0 && (
          <button onClick={() => setExpanded(e => !e)} className="text-blue-600 hover:text-blue-800 flex items-center text-xs">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />} {expanded ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {/* Milestone list */}
      {expanded && (
        <div className="space-y-2 mt-1">
          {goal.milestones.map((milestone, idx) => (
            <div key={idx} className={`flex items-center p-2 rounded-md ${milestone.completed ? 'bg-green-50' : 'bg-gray-50'}`}> 
              <span className="mr-2">
                {milestone.completed ? (
                  <span className="inline-block text-green-500"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></span>
                ) : (
                  <span className="inline-block text-gray-400"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg></span>
                )}
              </span>
              <div className="flex-1">
                <div className={`font-medium text-sm ${milestone.completed ? 'text-green-700' : 'text-gray-800'}`}>{milestone.title}</div>
                {milestone.description && <div className="text-xs text-gray-500">{milestone.description}</div>}
                {milestone.completed && milestone.completedDate && (
                  <div className="text-xs text-green-600 mt-1">Completed on {formatDate(milestone.completedDate)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* View Details link */}
      <Link
        to={`/learning-goals/${goal.id}`}
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium self-end"
      >
        View Details
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}

LearningGoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    targetDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        description: PropTypes.string,
        completedDate: PropTypes.string,
      })
    ),
  }).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default LearningGoalCard; 
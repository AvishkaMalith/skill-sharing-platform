import { Calendar, Target, BarChart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from './Badge';
import ProgressBar from './ProgressBar';
import { daysLeft, formatDate } from './DateUtils';

function LearningGoalCard({ goal, onDelete }) {
  const completedMilestones = goal.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = goal.milestones?.length || 0;
  const progress = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 relative"
      style={{ borderTopColor: goal.category === 'Programming' ? '#2563eb' : goal.category === 'Design' ? '#ef4444' : goal.category === 'Marketing' ? '#eab308' : '#6b7280' }}
    >
      {onDelete && (
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          title="Delete Goal"
          onClick={() => onDelete(goal.id)}
        >
          <Trash2 size={18} />
        </button>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge color={goal.category}>{goal.category}</Badge>
          <div className="mt-2 text-xs">
            <Badge color={goal.status}>{goal.status.replace('_', ' ')}</Badge>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{goal.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
        </div>
      </div>

      <div className="space-y-2 mb-2">
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar size={16} className="mr-2" />
          <span>Start: {formatDate(goal.startDate)}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar size={16} className="mr-2" />
          <span>Target: {formatDate(goal.targetDate)}</span>
          <span className="ml-3">{daysLeft(goal.targetDate)}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <BarChart size={16} className="mr-2" />
          <span>Progress: {completedMilestones}/{totalMilestones} milestones</span>
        </div>
      </div>

      <ProgressBar value={progress} color={goal.category === 'Programming' ? 'blue' : goal.category === 'Design' ? 'red' : goal.category === 'Marketing' ? 'yellow' : 'gray'} />

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-700 mb-1">Milestones:</div>
        <div className="space-y-1">
          {goal.milestones?.slice(0, 3).map((milestone, index) => (
            <div key={index} className="flex items-center text-gray-600 text-xs">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              <span>{milestone.title}</span>
            </div>
          ))}
          {totalMilestones > 3 && (
            <div className="text-xs text-gray-500 ml-4">
              +{totalMilestones - 3} more milestones
            </div>
          )}
        </div>
      </div>

      <Link
        to={`/learning-goals/${goal.id}`}
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
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
      })
    ),
  }).isRequired,
  onDelete: PropTypes.func,
};

export default LearningGoalCard; 
import PropTypes from 'prop-types';
import { CheckCircle2, Circle } from 'lucide-react';
import { formatDate } from './DateUtils';

function MilestoneList({ milestones, onToggle }) {
  if (!milestones || milestones.length === 0) {
    return <div className="text-gray-500">No milestones added.</div>;
  }
  return (
    <div className="space-y-3">
      {milestones.map((milestone, idx) => (
        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
          <button
            type="button"
            onClick={() => onToggle && onToggle(idx)}
            className="focus:outline-none"
            title={milestone.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {milestone.completed ? (
              <CheckCircle2 size={20} className="text-green-500" />
            ) : (
              <Circle size={20} className="text-gray-400" />
            )}
          </button>
          <div className="flex-1">
            <div className="font-medium text-gray-800">{milestone.title}</div>
            {milestone.description && (
              <div className="text-sm text-gray-500">{milestone.description}</div>
            )}
            {milestone.completed && milestone.completedDate && (
              <div className="text-xs text-green-600 mt-1">
                Completed on {formatDate(milestone.completedDate)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

MilestoneList.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      completed: PropTypes.bool,
      completedDate: PropTypes.string,
    })
  ),
  onToggle: PropTypes.func, // Optional, for toggling completion
};

export default MilestoneList; 
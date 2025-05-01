import { CheckCircle2, Circle, Calendar, Target, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LearningGoalCard({ goal }) {
  const completedMilestones = goal.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = goal.milestones?.length || 0;
  const progress = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{goal.title}</h3>
          <p className="text-gray-600 mb-4">{goal.description}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {goal.category}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2" />
          <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Target size={18} className="mr-2" />
          <span>Status: {goal.status}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <BarChart size={18} className="mr-2" />
          <span>Progress: {completedMilestones}/{totalMilestones} milestones</span>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Milestones:</div>
          <div className="space-y-2">
            {goal.milestones?.slice(0, 3).map((milestone, index) => (
              <div key={index} className="flex items-center text-gray-600">
                {milestone.completed ? (
                  <CheckCircle2 size={16} className="mr-2 text-green-500" />
                ) : (
                  <Circle size={16} className="mr-2 text-gray-400" />
                )}
                <span className="text-sm">{milestone.title}</span>
              </div>
            ))}
            {totalMilestones > 3 && (
              <div className="text-sm text-gray-500 ml-6">
                +{totalMilestones - 3} more milestones
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          to={`/learning-goals/${goal.id}`}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
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
    </div>
  );
}

LearningGoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    targetDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ),
  }).isRequired,
};

export default LearningGoalCard; 
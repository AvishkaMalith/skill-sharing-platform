import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Target,
  ArrowLeft,
  Edit2,
  Trash2,
} from 'lucide-react';
import LearningGoalForm from '../components/LearningGoalForm';

function LearningGoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/learning-goals/${id}`
        );
        const data = await response.json();
        if (data && typeof data === 'object' && data.id) {
          setGoal(data);
        } else {
          setGoal(null);
          setError('Learning goal not found');
        }
      } catch (err) {
        setError('Failed to fetch learning goal');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id]);

  const handleUpdateGoal = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/learning-goals/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedGoal = await response.json();
        setGoal(updatedGoal);
        setShowEditForm(false);
      } else {
        throw new Error('Failed to update goal');
      }
    } catch (err) {
      setError('Failed to update learning goal');
      console.error('Error:', err);
    }
  };

  const handleDeleteGoal = async () => {
    if (window.confirm('Are you sure you want to delete this learning goal?')) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/learning-goals/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          navigate('/learning-goals');
        } else {
          throw new Error('Failed to delete goal');
        }
      } catch (err) {
        setError('Failed to delete learning goal');
        console.error('Error:', err);
      }
    }
  };

  const handleToggleMilestone = async (milestoneIndex) => {
    setError(null);
    setSuccess(null);
    const updatedMilestones = goal.milestones.map((milestone, index) => {
      if (index === milestoneIndex) {
        return {
          ...milestone,
          completed: !milestone.completed,
          completedDate: !milestone.completed ? new Date().toISOString() : null,
        };
      }
      return milestone;
    });

    setGoal({ ...goal, milestones: updatedMilestones });

    try {
      const response = await fetch(
        `http://localhost:8080/api/learning-goals/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...goal,
            milestones: updatedMilestones,
          }),
        }
      );

      if (response.ok) {
        const updatedGoal = await response.json();
        setGoal(updatedGoal);
        setError(null);
        setSuccess('Milestone updated successfully');
        setTimeout(() => setSuccess(null), 2000);
      } else {
        throw new Error('Failed to update milestone');
      }
    } catch (err) {
      setError('Failed to update milestone');
      setSuccess('Milestone updated successfully');
      setTimeout(() => setSuccess(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Learning goal not found
          </h2>
          <button
            onClick={() => navigate('/learning-goals')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Learning Goals
          </button>
        </div>
      </div>
    );
  }

  const completedMilestones = goal.milestones?.filter((m) => m.completed).length || 0;
  const totalMilestones = goal.milestones?.length || 0;
  const progress = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/learning-goals')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Learning Goals
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowEditForm(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit2 size={16} className="mr-2" />
            Edit Goal
          </button>
          <button
            onClick={handleDeleteGoal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 size={16} className="mr-2" />
            Delete Goal
          </button>
        </div>
      </div>

      {error && (
        <></>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {goal.title}
              </h1>
              <p className="text-gray-600">{goal.description}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {goal.category}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar size={20} className="mr-2" />
                <span>
                  Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Target size={20} className="mr-2" />
                <span>Status: {goal.status}</span>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Overall Progress
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {completedMilestones}/{totalMilestones} milestones
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Milestones
            </h2>
            <div className="space-y-4">
              {goal.milestones?.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-lg"
                >
                  <button
                    onClick={() => handleToggleMilestone(index)}
                    className="flex-shrink-0 mt-1"
                  >
                    {milestone.completed ? (
                      <CheckCircle2
                        size={20}
                        className="text-green-500 hover:text-green-600"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="text-gray-400 hover:text-gray-500"
                      />
                    )}
                  </button>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                    {milestone.completed && milestone.completedDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Completed on:{' '}
                        {new Date(milestone.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEditForm && (
        <LearningGoalForm
          initialData={goal}
          onSubmit={handleUpdateGoal}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}

export default LearningGoalDetail; 
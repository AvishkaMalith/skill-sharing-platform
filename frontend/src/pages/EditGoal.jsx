import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditGoal = () => {
  const navigate = useNavigate();
  const { goalId } = useParams();
  const [goal, setGoal] = useState({
    userId: "1", // TODO: Replace with actual user ID from auth
    title: '',
    description: '',
    category: '',
    priority: 'MEDIUM',
    difficulty: 'INTERMEDIATE',
    estimatedHours: 0,
    startDate: new Date().toISOString(),
    targetDate: '',
    status: 'IN_PROGRESS',
    milestones: [],
    resources: [],
    tags: [],
    notes: ''
  });

  const [milestone, setMilestone] = useState('');
  const [resource, setResource] = useState({ title: '', url: '' });
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/learning-goals/${goalId}`);
        setGoal(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching goal:', error);
        setError('Failed to load goal details');
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/learning-goals/${goalId}`, goal);
      if (response.status === 200) {
        navigate('/learning-goals');
      }
    } catch (error) {
      console.error('Error updating goal:', error.response?.data || error.message);
      setError('Failed to update goal');
    }
  };

  const addMilestone = () => {
    if (milestone.trim()) {
      setGoal(prev => ({
        ...prev,
        milestones: [...prev.milestones, { title: milestone, completed: false }]
      }));
      setMilestone('');
    }
  };

  const removeMilestone = (index) => {
    setGoal(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const addResource = () => {
    if (resource.title && resource.url) {
      setGoal(prev => ({
        ...prev,
        resources: [...prev.resources, { ...resource }]
      }));
      setResource({ title: '', url: '' });
    }
  };

  const removeResource = (index) => {
    setGoal(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tag.trim()) {
      setGoal(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTag('');
    }
  };

  const removeTag = (index) => {
    setGoal(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Learning Goal</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={goal.title}
            onChange={(e) => setGoal({ ...goal, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={goal.description}
            onChange={(e) => setGoal({ ...goal, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <input
            type="text"
            value={goal.category}
            onChange={(e) => setGoal({ ...goal, category: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Priority</label>
            <select
              value={goal.priority}
              onChange={(e) => setGoal({ ...goal, priority: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Difficulty</label>
            <select
              value={goal.difficulty}
              onChange={(e) => setGoal({ ...goal, difficulty: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2">Status</label>
          <select
            value={goal.status}
            onChange={(e) => setGoal({ ...goal, status: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Estimated Hours</label>
          <input
            type="number"
            value={goal.estimatedHours}
            onChange={(e) => setGoal({ ...goal, estimatedHours: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2">Target Date</label>
          <input
            type="date"
            value={goal.targetDate.split('T')[0]}
            onChange={(e) => setGoal({ ...goal, targetDate: new Date(e.target.value).toISOString() })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Milestones</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add a milestone"
            />
            <button
              type="button"
              onClick={addMilestone}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {goal.milestones.map((m, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{m.title}</span>
                <button
                  type="button"
                  onClick={() => removeMilestone(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block mb-2">Resources</label>
          <div className="space-y-2 mb-2">
            <input
              type="text"
              value={resource.title}
              onChange={(e) => setResource({ ...resource, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Resource title"
            />
            <input
              type="url"
              value={resource.url}
              onChange={(e) => setResource({ ...resource, url: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Resource URL"
            />
            <button
              type="button"
              onClick={addResource}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Resource
            </button>
          </div>
          <ul className="list-disc pl-5">
            {goal.resources.map((r, i) => (
              <li key={i} className="flex items-center justify-between">
                <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                <button
                  type="button"
                  onClick={() => removeResource(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="block mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {goal.tags.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-gray-200 rounded flex items-center gap-2">
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">Notes</label>
          <textarea
            value={goal.notes}
            onChange={(e) => setGoal({ ...goal, notes: e.target.value })}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/learning-goals')}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGoal; 
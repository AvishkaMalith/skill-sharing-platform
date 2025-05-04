import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGoal = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/learning-goals', goal);
      if (response.status === 201) {
        navigate('/learning-goals');
      }
    } catch (error) {
      console.error('Error creating goal:', error.response?.data || error.message);
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

  const addResource = () => {
    if (resource.title && resource.url) {
      setGoal(prev => ({
        ...prev,
        resources: [...prev.resources, { ...resource }]
      }));
      setResource({ title: '', url: '' });
    }
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Learning Goal</h1>
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
              <li key={i}>{m.title}</li>
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
              <li key={i}>{r.title}</li>
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
              <span key={i} className="px-2 py-1 bg-gray-200 rounded">{t}</span>
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
            Create Goal
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

export default CreateGoal; 
import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

function LearningGoalForm({ onSubmit, onClose, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      category: '',
      targetDate: '',
      milestones: [{ title: '', description: '', completed: false }],
    }
  );
  const [error, setError] = useState('');

  // Helper to get today's date in yyyy-mm-dd format
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMilestoneChange = (index, field, value) => {
    setFormData((prev) => {
      const newMilestones = [...prev.milestones];
      newMilestones[index] = {
        ...newMilestones[index],
        [field]: value,
      };
      return { ...prev, milestones: newMilestones };
    });
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: '', description: '', completed: false },
      ],
    }));
  };

  const removeMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Validate target date is today or in the future
    const selectedDate = new Date(formData.targetDate);
    const now = new Date();
    now.setHours(0,0,0,0); // ignore time
    if (!formData.targetDate || selectedDate < now) {
      setError('Target date cannot be in the past.');
      return;
    }
    // Prepare milestones: remove empty, ensure all fields
    const milestones = (formData.milestones || [])
      .filter(m => m.title && m.title.trim() !== '')
      .map(m => ({
        title: m.title,
        description: m.description || '',
        completed: !!m.completed,
        completedDate: m.completed ? (m.completedDate || null) : null,
      }));
    // Prepare date
    const targetDate = formData.targetDate
      ? new Date(formData.targetDate).toISOString()
      : '';
    const payload = {
      ...formData,
      targetDate,
      milestones,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Learning Goal' : 'Create Learning Goal'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Programming">Programming</option>
              <option value="Computing">Web Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
              
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target Date
            </label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min={getToday()}
            />
            {error && (
              <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Milestones
              </label>
              <button
                type="button"
                onClick={addMilestone}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                <Plus size={16} className="mr-1" /> Add Milestone
              </button>
            </div>
            <div className="space-y-3">
              {formData.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-start p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex-grow space-y-2">
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) =>
                        handleMilestoneChange(index, 'title', e.target.value)
                      }
                      placeholder="Milestone title"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      value={milestone.description}
                      onChange={(e) =>
                        handleMilestoneChange(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                      placeholder="Milestone description"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {formData.milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {initialData ? 'Update Goal' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

LearningGoalForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    targetDate: PropTypes.string,
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
      })
    ),
  }),
};

export default LearningGoalForm; 
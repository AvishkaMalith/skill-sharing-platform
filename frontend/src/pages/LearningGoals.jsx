import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import LearningGoalCard from '../components/LearningGoalCard';
import LearningGoalForm from '../components/LearningGoalForm';
import Footer from '../components/Footer';
import learningGoalsApi from '../services/learningGoals';
import { user as userApi } from '../services/api';

function LearningGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Fetch current user and then their learning goals
  useEffect(() => {
    const fetchUserAndGoals = async () => {
      setUserLoading(true);
      setError(null);
      try {
        const userRes = await userApi.getCurrent();
        const userData = userRes.data;
        // Try common user id fields
        const id = userData.userId || userData.id || userData._id;
        if (!id) throw new Error('User ID not found in response');
        setUserId(id);
        // Now fetch goals for this user
        setLoading(true);
        const response = await learningGoalsApi.getByUser(id);
        const data = response.data;
        if (Array.isArray(data)) {
          setGoals(data);
          const uniqueCategories = [...new Set(data.map(goal => goal.category))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        setError('Failed to fetch user or learning goals');
        console.error('Error:', err);
      } finally {
        setLoading(false);
        setUserLoading(false);
      }
    };
    fetchUserAndGoals();
  }, []);

  const handleCreateGoal = async (goalData) => {
    if (!userId) return;
    try {
      await learningGoalsApi.create({
        ...goalData,
        userId,
        status: 'IN_PROGRESS',
      });
      // Refresh goals list
      const updated = await learningGoalsApi.getByUser(userId);
      setGoals(updated.data);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create learning goal');
      console.error('Error:', err);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!userId) return;
    if (!window.confirm('Are you sure you want to delete this learning goal?')) return;
    try {
      await learningGoalsApi.delete(goalId);
      // Refresh goals list
      const updated = await learningGoalsApi.getByUser(userId);
      setGoals(updated.data);
    } catch (err) {
      setError('Failed to delete learning goal');
      console.error('Error:', err);
    }
  };

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || goal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning Goals</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow"
            disabled={userLoading || loading}
          >
            <Plus size={20} className="mr-2" />
            New Goal
          </button>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={userLoading || loading}
            />
          </div>
          <div className="sm:w-64">
            <div className="relative">
              <Filter
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={userLoading || loading}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {userLoading || loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredGoals.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No goals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {goals.length === 0
                ? "Get started by creating a new learning goal"
                : "Try adjusting your search or filter"}
            </p>
            {goals.length === 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  disabled={userLoading || loading}
                >
                  <Plus size={20} className="mr-2" />
                  Create Goal
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map((goal) => (
              <LearningGoalCard key={goal.id} goal={goal} onDelete={handleDeleteGoal} />
            ))}
          </div>
        )}

        {showForm && (
          <LearningGoalForm
            onSubmit={handleCreateGoal}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default LearningGoals; 
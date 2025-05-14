import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboard, auth, user as userApi } from '../services/api';
import learningGoalsApi from '../services/learningGoals';
import { BarChart, Users, BookOpen, Target, TrendingUp, Calendar, Star, Award, MessageSquare, Code, PenTool } from 'lucide-react';
import '../assets/Dashboard.css';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goals, setGoals] = useState([]);
  const [learningProgress, setLearningProgress] = useState([]);
  const navigate = useNavigate();

  // Dummy data for demonstration
  const dummyData = {
    stats: {
      skills: 5,
      posts: 7,
      mentorshipHours: 12,
      skillPoints: 850
    },
    upcomingEvents: [
      { 
        title: 'Web Development Workshop',
        date: '2024-03-20',
        time: '14:00',
        type: 'workshop',
        instructor: 'Sarah Johnson',
        participants: 12
      },
      { 
        title: 'Code Review Session',
        date: '2024-03-22',
        time: '16:00',
        type: 'mentorship',
        instructor: 'Mike Chen',
        participants: 5
      },
      { 
        title: 'UI/UX Design Masterclass',
        date: '2024-03-25',
        time: '15:00',
        type: 'workshop',
        instructor: 'Emma Davis',
        participants: 8
      }
    ],
    skillInsights: {
      topSkills: ['JavaScript', 'Python', 'UI/UX Design'],
      inDemand: ['React', 'Node.js', 'TypeScript'],
      recommended: ['GraphQL', 'Docker', 'AWS']
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get current user and userId
        const userRes = await userApi.getCurrent();
        const userData = userRes.data;
        const userId = userData.userId || userData.id || userData._id;
        setUser(userData);
        if (!userId) throw new Error('User ID not found in response');
        Cookies.set('userName', userData.userName, { expires: 7 });
        Cookies.set('userId', userId, { expires: 7 });

        // Fetch learning goals for this user
        const response = await learningGoalsApi.getByUser(userId);
        const goalsData = response.data;
        setGoals(goalsData);

        // Transform goals data into learning progress format
        const progressData = goalsData.map(goal => {
          const completedMilestones = goal.milestones?.filter(m => m.completed).length || 0;
          const totalMilestones = goal.milestones?.length || 0;
          const progress = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;
          const lastUpdated = new Date(goal.updatedAt || goal.createdAt);
          return {
            skill: goal.title,
            level: goal.category,
            progress: Math.round(progress),
            nextMilestone: goal.milestones?.find(m => !m.completed)?.title || 'No upcoming milestones',
            lastUpdated,
            status: goal.status,
          };
        });
        // Sort by lastUpdated descending and take the latest 3
        progressData.sort((a, b) => b.lastUpdated - a.lastUpdated);
        setLearningProgress(progressData.slice(0, 3));
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.logout();
      // Remove all cookies on logout
      Object.keys(Cookies.get()).forEach(cookieName => Cookies.remove(cookieName));
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.userName || 'User'}!
              </h1>
              <p className="mt-2 text-gray-600">
                Here's what's happening with your learning journey today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {user?.profilePictureUrl && (
                <img 
                  src={user.profilePictureUrl} 
                  alt="Profile" 
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Target className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
                <p className="text-2xl font-bold text-gray-900">{goals.filter(goal => !goal.completed).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Code className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <p className="text-2xl font-bold text-gray-900">{dummyData.stats.skills}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Mentorship Hours</h2>
                <p className="text-2xl font-bold text-gray-900">{dummyData.stats.mentorshipHours}h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
            <div className="space-y-4">
              {learningProgress.length > 0 ? (
                learningProgress.map((skill, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">{skill.skill}</p>
                          <p className="text-sm text-gray-500">{skill.level}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${skill.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{skill.status.replace('_', ' ')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">Next: {skill.nextMilestone}</p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: {skill.lastUpdated.toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No learning goals found. Start by creating a new learning goal!
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {dummyData.upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {event.date} at {event.time}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Instructor: {event.instructor}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.type === 'workshop' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.type === 'workshop' ? 'Workshop' : 'Mentorship'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {event.participants} participants
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Insights */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skill Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Your Top Skills</h3>
                <ul className="space-y-2">
                  {dummyData.skillInsights.topSkills.map((skill, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">In-Demand Skills</h3>
                <ul className="space-y-2">
                  {dummyData.skillInsights.inDemand.map((skill, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Recommended Skills</h3>
                <ul className="space-y-2">
                  {dummyData.skillInsights.recommended.map((skill, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <PenTool className="h-4 w-4 text-blue-500 mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard; 
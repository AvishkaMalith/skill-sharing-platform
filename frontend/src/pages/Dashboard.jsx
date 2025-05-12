import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboard, auth } from '../services/api';
import '../assets/Dashboard.css';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Check auth status first
        const authResponse = await auth.getStatus();
        if (!authResponse.data.isAuthenticated) {
          navigate('/login');
          return;
        }
        
        // Fetch dashboard data
        const response = await dashboard.getData();
        setUser(response.data.user);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to load dashboard data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Skill Sharing Platform</h1>
        <div className="user-profile">
          {user?.profilePictureUrl && (
            <img 
              src={user.profilePictureUrl} 
              alt="Profile" 
              className="profile-image" 
            />
          )}
          <span className="username">{user?.userName || 'User'}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {error && <div className="error-message">{error}</div>}
        
        <div className="welcome-card">
          <h2>Welcome, {user?.userName || 'User'}!</h2>
          <p>This is your skill sharing dashboard where you can track your learning progress and share your skills with others.</p>
        </div>
        
        {/* Additional dashboard content can be added here */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>My Skills</h3>
            <p>{user?.currentSkills?.length || 0} skills</p>
          </div>
          <div className="stat-card">
            <h3>Following</h3>
            <p>{user?.following?.length || 0} users</p>
          </div>
          <div className="stat-card">
            <h3>Followers</h3>
            <p>{user?.followers?.length || 0} users</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 
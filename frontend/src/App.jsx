import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './services/api';
import Home from './pages/Home';
import Navbar from './components/Navbar'; 
import CreatePost from './pages/CreatePost';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import ViewPost from './pages/ViewPost';
import PostWall from './pages/PostWall';
import ManagePost from './pages/ManagePost';
import EditPost from './pages/EditPost';

import LearningGoals from './pages/LearningGoals';
import LearningGoalDetail from './pages/LearningGoalDetail';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Check authentication status when app loads
      const checkAuth = async () => {
        try {
          const response = await auth.getStatus();
          setIsAuthenticated(response.data.isAuthenticated);
        } catch (error) {
          console.error('Auth check error:', error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (loading) {
      return <div className="loading-app">Loading application...</div>;
    }
  
    return (

      <Router>
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard/>
            </ProtectedRoute>
          } />
          <Route path="/learning-goals" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LearningGoals/>
            </ProtectedRoute>
          } />
          <Route path="/learning-goals/:id" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LearningGoalDetail/>
            </ProtectedRoute>
          } />
          <Route path="/create-post" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div>Create Post</div>
              <CreatePost/>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/view-post/:postId" element={<ViewPost />} />
                <Route path="/wall" element={<PostWall />} />
                <Route path="/post/:postId" element={<ViewPost />} />
                <Route path="/manage" element={<ManagePost />} />
                <Route path="/edit/:postId" element={<EditPost />} />
                <Route path="/learning-goals" element={<LearningGoals />} />
                <Route path="/learning-goals/:id" element={<LearningGoalDetail />} />
            </Routes>
        </Router>

    );
  }
  
  export default App;








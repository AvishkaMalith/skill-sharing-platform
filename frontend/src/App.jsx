import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import LearningGoals from './pages/LearningGoals';
import LearningGoalDetail from './pages/LearningGoalDetail';
import CreateGoal from './pages/CreateGoal';
import EditGoal from './pages/EditGoal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/learning-goals" element={<LearningGoals />} />
      <Route path="/learning-goals/:goalId" element={<LearningGoalDetail />} />
      <Route path="/learning-goals/create" element={<CreateGoal />} />
      <Route path="/learning-goals/:goalId/edit" element={<EditGoal />} />
    </Routes>
  );
}

export default App;
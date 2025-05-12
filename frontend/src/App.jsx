import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import LearningGoals from './pages/LearningGoals';
import LearningGoalDetail from './pages/LearningGoalDetail';
import UserProfile from './pages/UserProfile';
import OtherUserProfile from './pages/UserProfileOther';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/learning-goals" element={<LearningGoals />} />
                <Route path="/learning-goals/:id" element={<LearningGoalDetail />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/other-user-profile" element={<OtherUserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
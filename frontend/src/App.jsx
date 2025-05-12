import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import LearningGoals from './pages/LearningGoals';
import LearningGoalDetail from './pages/LearningGoalDetail';
import Posts from './pages/Posts'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/learning-goals" element={<LearningGoals />} />
                <Route path="/learning-goals/:id" element={<LearningGoalDetail />} />

                {/* Geethika */}
                <Route path="/post/:postId" element={<Posts />} />
                <Route path="/post" element={<Posts />} />
            </Routes>
        </Router>
    );
};

export default App;
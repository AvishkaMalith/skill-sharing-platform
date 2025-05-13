import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import PostWall from './pages/PostWall';
import LearningGoals from './pages/LearningGoals';
import LearningGoalDetail from './pages/LearningGoalDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/view-post/:postId" element={<ViewPost />} />
                <Route path="/wall" element={<PostWall />} />
                <Route path="/post/:postId" element={<ViewPost />} />
                <Route path="/learning-goals" element={<LearningGoals />} />
                <Route path="/learning-goals/:id" element={<LearningGoalDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
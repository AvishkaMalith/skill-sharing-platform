import { CircleDot } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const PlatformStatus = () => {

  const [stats, setStats] = useState({
    postsCount: 0,
    usersCount: 0,
    commentsCount: 0,
    learningGoalsCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postResponse,
          userResponse,
          commentResponse,
          learningGoalsResponse] = await Promise.all([
            axios.get("http://localhost:8080/api/learning-goals/get"),
            axios.get("http://localhost:8080/api/posts/get"),
            axios.get("http://localhost:8080/api/users/get"),
            axios.get("http://localhost:8080/api/comments/get"),
          ]);
        setStats((prevDetails) => ({
          ...prevDetails,
          learningGoalsCount: learningGoalsResponse.data.length,
          postsCount: postResponse.data.length,
          usersCount: userResponse.data.length,
          commentsCount: commentResponse.data.length,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 md:py-8 bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
            Creative <br /> Learning <br /> Made Easy
          </h2>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <ul className="text-base sm:text-lg space-y-4 md:space-y-6 text-gray-700 max-w-md">
            <li className="flex items-center">
              <span className="text-blue-500 mr-2"><CircleDot size={18} /></span>
              Thousands of creative classes. Beginner to pro.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2"><CircleDot size={18} /></span>
              Taught by creative pros and industry icons.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2"><CircleDot size={18} /></span>
              Learning Paths to help you achieve your goals.
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2"><CircleDot size={18} /></span>
              Certificates to celebrate your accomplishments.
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-200 min-h-36 flex items-center justify-center rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-blue-900">{stats.usersCount}</p>
              <p className="text-sm md:text-base text-gray-700">Active Users</p>
            </div>
          </div>
          <div className="bg-blue-200 min-h-36 flex items-center justify-center rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-blue-900">{stats.postsCount}</p>
              <p className="text-sm md:text-base text-gray-700">Valuable Posts</p>
            </div>
          </div>
          <div className="bg-blue-200 min-h-36 flex items-center justify-center rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-blue-900">{stats.commentsCount}</p>
              <p className="text-sm md:text-base text-gray-700">Instructors</p>
            </div>
          </div>
          <div className="bg-blue-200 min-h-36 flex items-center justify-center rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-blue-900">{stats.learningGoalsCount}</p>
              <p className="text-sm md:text-base text-gray-700">Incredible Learning Gaols</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatus;
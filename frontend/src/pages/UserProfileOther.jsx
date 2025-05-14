import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const OtherUserProfile = () => {
  const location = useLocation();
  const publisherId = location.state.userId;

  const [publisherData, setPublisherData] = useState({});
  const [publisherPosts, setPublisherPosts] = useState([]);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [followUpdate, setFollowUpdate] = useState(false);

  // Get userId from cookies
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      setLoggedUserId(userId);
    }
  }, []);

  // Fetch publisher data (runs on mount, publisherId change, or followUpdate toggle)
  useEffect(() => {
    const fetchPublisherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/get/${publisherId}`
        );
        const data = response.data;
        setPublisherData(data);
        setFollowersCount(data.followers?.length || 0);
        setIsUserFollowing(data.followers?.includes(Cookies.get("userId")));
      } catch (error) {
        console.error("Error fetching publisher data:", error);
      }
    };

    fetchPublisherData();
  }, [publisherId, followUpdate]);

  // Fetch posts by publisher (only needs publisherId)
  useEffect(() => {
    const fetchPublisherPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts/get/by-user/${publisherId}`
        );
        setPublisherPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPublisherPosts();
  }, []);

  // Follow/unfollow user
  const handleFollowToggle = async () => {
    if (!loggedUserId || !publisherData.userId) return;
    setLoading(true);

    try {
      const endpoint = isUserFollowing
        ? `http://localhost:8080/api/users/unfollow/${loggedUserId}/${publisherData.userId}`
        : `http://localhost:8080/api/users/follow/${loggedUserId}/${publisherData.userId}`;

      const response = await axios.post(endpoint);
      console.log("Server response:", response.data);

      // toggle followUpdate to trigger refetch
      setFollowUpdate(prev => !prev);
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Panel: Profile Info */}
      <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={publisherData.profilePictureUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4"
          />
          <h1 className="text-xl font-bold text-gray-800">
            {publisherData.fullName}
          </h1>
          <p className="text-gray-600">@{publisherData.userName}</p>
          <p className="text-gray-500 mt-1">{publisherData.location}</p>
          <p className="text-gray-700 mt-2 text-center">{publisherData.bio}</p>

          {/* Follow/Unfollow Button */}
          {loggedUserId !== publisherData.userId && (
            <button
              onClick={handleFollowToggle}
              disabled={loading}
              className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white ${
                isUserFollowing
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading
                ? "Processing..."
                : isUserFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
          )}

          {/* Stats */}
          <div className="mt-4 flex gap-6">
            <div>
              <span className="font-semibold text-gray-800">
                {followersCount}
              </span>
              <span className="text-gray-600"> Followers</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {publisherData.following?.length || 0}
              </span>
              <span className="text-gray-600"> Following</span>
            </div>
          </div>

          {/* Joined Date */}
          <p className="text-gray-500 text-sm mt-4">
            Joined{" "}
            {publisherData.createdAt &&
              new Date(publisherData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Right Panel: Posts */}
      <div className="lg:w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Posts by {publisherData.fullName}
        </h2>
        <div className="space-y-6">
          {publisherPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-2 whitespace-pre-wrap">
                {post.content}
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {post.images?.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-gray-500 text-sm mt-1 text-center">
                      {image.caption}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-6 text-gray-500 items-center">
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
                <button className="text-blue-500 hover:text-blue-700">
                  Share
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;

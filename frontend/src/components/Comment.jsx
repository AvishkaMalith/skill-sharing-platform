import { useState, useEffect } from "react";
import axios from "axios";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/comments/get");
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []); // Empty dependency array

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        postId: "post_001",
        userId: "user_001",
        content: newComment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      try {
        const response = await axios.post("http://localhost:8080/api/comments/create", comment, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setComments([response.data, ...comments]);
        setNewComment("");
        setError(null);
      } catch (error) {
        console.error("Error submitting comment:", error);
        setError("Failed to submit comment. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      {/* Static Post */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Learn Advanced Python for Data Science
        </h2>
        <p className="text-gray-600 mb-4">
          Posted by <span className="font-semibold">Jane Doe</span> on April 29,
          2025
        </p>
        <p className="text-gray-700">
          Join our comprehensive workshop to master Python for data science!
          Topics include pandas, numpy, matplotlib, and machine learning basics.
          Perfect for intermediate learners looking to enhance their skills.
          Limited spots available!
        </p>
      </div>

      {/* Comment Input */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Add a Comment
        </h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="w-full max-w-2xl">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id || comment.createdAt}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Commented by User {comment.userId} on{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';

function PostCard({ post }) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/api/comments/post/${post.postId}/count`);
        setCommentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching comment count:', error);
      }
    };
    fetchCommentCount();
  }, [post.postId]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.images && post.images.length > 0 && (
        <img
          src={post.images[0]}
          alt={post.postTitle}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{post.postCategory}</span>
          <div className="flex items-center text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>
        <Link to={`/post/${post.postId}`} className="block">
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
            {post.postTitle}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            By {post.publisherName}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(post.postTime).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard; 
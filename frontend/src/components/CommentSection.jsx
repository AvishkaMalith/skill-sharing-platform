import { useState, useEffect, useRef } from 'react';
import { MoreVertical, Edit2, Trash2, Send, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { user as userApi } from '../services/api';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [showMenuId, setShowMenuId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userApi.getCurrent();
      setCurrentUser(res.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (isExpanded) {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments, isExpanded]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/post/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    try {
      await axios.post('/api/comments', {
        postId,
        userId: currentUser.userId || currentUser.id || currentUser._id,
        content: newComment
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditingContent(comment.content);
    setShowMenuId(null);
  };

  const handleEditSubmit = async (commentId) => {
    try {
      await axios.put(`/api/comments/${commentId}`, {
        userId: currentUser.userId || currentUser.id || currentUser._id,
        content: editingContent
      });
      setEditingId(null);
      setEditingContent('');
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(`/api/comments/${commentId}?userId=${currentUser.userId || currentUser.id || currentUser._id}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const isCurrentUser = (comment) => {
    return currentUser && (comment.user?.userId === currentUser.userId || 
                          comment.user?.userId === currentUser.id || 
                          comment.user?.userId === currentUser._id);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div 
        className="p-4 border-b flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <>
          <div className="p-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="flex-shrink-0">
                  {comment.user?.profilePictureUrl ? (
                    <img
                      src={comment.user.profilePictureUrl}
                      alt={comment.user.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                      {getInitials(comment.user?.fullName)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {comment.user?.fullName || 'Unknown User'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                        {comment.edited && (
                          <span className="text-xs text-gray-500">(edited)</span>
                        )}
                      </div>
                      
                      {isCurrentUser(comment) && !editingId && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMenuId(showMenuId === comment.id ? null : comment.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded-full"
                          >
                            <MoreVertical size={16} className="text-gray-500" />
                          </button>
                          
                          {showMenuId === comment.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(comment);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit2 size={16} className="mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(comment.id);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {editingId === comment.id ? (
                      <div>
                        <textarea
                          className="w-full border rounded-lg p-2 text-sm"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2 justify-end">
                          <button
                            onClick={() => handleEditSubmit(comment.id)}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </div>

          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              {currentUser?.profilePictureUrl ? (
                <img
                  src={currentUser.profilePictureUrl}
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  {getInitials(currentUser?.fullName)}
                </div>
              )}
              <div className="flex-1">
                <textarea
                  className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={2}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 self-end"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default CommentSection;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const CommentSection = ({ postId, publisherId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUserId = 'user1';

  useEffect(() => {
    console.log('CommentSection props:', { postId, publisherId });
    if (!postId) {
      setError('Invalid postId');
      console.warn('No postId provided:', postId);
      return;
    }
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/comments/get?postId=${postId}`);
      console.log('Fetch comments response:', response.data);
      if (!Array.isArray(response.data)) {
        console.warn('Invalid comments data:', response.data);
        setError('Invalid comments data from server');
        setComments([]);
      } else {
        setComments(response.data);
      }
    } catch (err) {
      setError('Failed to fetch comments: ' + err.message);
      console.error('Fetch comments error:', err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const commentData = {
        postId,
        userId: currentUserId,
        content: newComment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      console.log('Sending comment data for postId', postId, ':', commentData);
      await axios.post('http://localhost:8080/api/comments/create', commentData);
      setNewComment('');
      fetchComments();
    } catch (err) {
      setError('Failed to add comment');
      console.error('Add comment error for postId', postId, ':', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setLoading(true);
      setComments(comments.filter((comment) => comment.commentId !== commentId));
      const response = await axios.delete(`http://localhost:8080/api/comments/delete/${commentId}`);
      console.log('Delete response:', response.data);
      fetchComments();
    } catch (err) {
      const message = err.response?.status === 404 ? 'Comment not found' : 'Unable to delete comment. Please try again.';
      setError(message);
      console.error('Delete comment error:', err);
      fetchComments();
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editedContent.trim()) {
      setError('Comment content cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const updatedComment = {
        content: editedContent,
        updatedAt: new Date().toISOString(),
      };
      console.log('Updating comment with ID:', commentId, updatedComment);
      const response = await axios.put(`http://localhost:8080/api/comments/update/${commentId}`, updatedComment);
      console.log('Update response:', response.data);
      setEditingCommentId(null);
      setEditedContent('');
      fetchComments();
    } catch (err) {
      const message = err.response?.status === 404 ? 'Comment not found' : 'Unable to update comment. Please try again.';
      setError(message);
      console.error('Update comment error:', err);
      fetchComments();
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent('');
    setError(null);
  };

  const canEditComment = (commentUserId) => {
    console.log('Checking edit permission:', { currentUserId, commentUserId, publisherId });
    return currentUserId && (currentUserId === commentUserId || currentUserId === publisherId);
  };

  return (
    <div className="mt-6 p-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleAddComment} className="flex flex-row items-center gap-2 mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          disabled={loading}
          className="flex-1 h-12 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="h-12 w-12 flex items-center justify-center bg-blue-600 text-white rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      {loading && comments.length === 0 ? (
        <div className="text-gray-500">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-500">No comments yet</div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div
              key={comment.commentId || index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>User {comment.userId}</span>
                  {canEditComment(comment.userId) && (
                    <>
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit comment"
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete comment"
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </div>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              {editingCommentId === comment.commentId ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    disabled={loading}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateComment(comment.commentId)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                      disabled={loading || !editedContent.trim()}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="leading-relaxed">{comment.content}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
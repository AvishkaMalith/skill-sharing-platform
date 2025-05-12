// src/pages/Posts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from '../components/CommentSection';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching all posts');
        const response = await axios.get('http://localhost:8080/api/posts/get');
        console.log('Posts API response:', response.data);
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid posts data');
        }
        setPosts(response.data);
      } catch (err) {
        setError(`Failed to fetch posts: ${err.message}`);
        console.error('Fetch posts error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-gray-500 text-center">Loading posts...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (posts.length === 0) return <div className="text-gray-500 text-center">No posts found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <div
            key={post.postId}
            className="post bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2">{post.publisherName}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="text-sm text-gray-500 mb-4">
              Posted on {new Date(post.postTime).toLocaleString()}
            </div>
            <CommentSection postId={post.postId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

const ManagePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    // Fetch userId from cookies and posts
    useEffect(() => {
        const fetchedUserId = Cookies.get('userId');
        if (!fetchedUserId) {
            setError('Please log in to view your posts');
            setLoading(false);
            return;
        }
        setUserId(fetchedUserId);

        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/get/by-user/${fetchedUserId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Handle post deletion
    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/delete/${postId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete post');
                }
                setPosts(posts.filter((post) => post.postId !== postId));
                alert('Post deleted successfully');
            } catch (err) {
                alert('Error deleting post: ' + err.message);
            }
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl animate-fade-in">
                            Manage Your Posts
                        </h1>
                        <p className="mt-3 text-lg text-gray-600">
                            You are living in an era where skills define you
                        </p>
                    </div>

                    {/* Card Container */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading your posts...</p>
                            </div>
                        )}
                        {error && (
                            <div className="text-center py-12">
                                <p className="text-red-500 text-lg font-medium">{error}</p>
                                <Link
                                    to="/login"
                                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        )}
                        {!loading && !error && posts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">
                                    You haven’t created any posts yet.
                                </p>
                                <Link
                                    to="/create-post"
                                    className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Your First Post
                                </Link>
                            </div>
                        )}

                        {!loading && !error && posts.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                                    <tr>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                                            Title
                                        </th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                                            Date
                                        </th>
                                        <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                                            Category
                                        </th>
                                        <th className="py-4 px-6 text-center text-sm font-semibold text-white">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {posts.map((post, index) => (
                                        <tr
                                            key={post.postId}
                                            className={`transition-colors ${
                                                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-blue-50`}
                                        >
                                            <td className="py-4 px-6 text-sm text-gray-900">
                                                {post.postTitle}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-600">
                                                {new Date(post.postTime).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-600">
                                                {post.postCategory}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex justify-center space-x-3">
                                                    <Link
                                                        to={`/edit/${post.postId}`}
                                                        className="group relative"
                                                    >
                                                        <button
                                                            className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                                                            title="Edit Post"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </button>
                                                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Edit
                              </span>
                                                    </Link>
                                                    <div className="group relative">
                                                        <button
                                                            onClick={() => handleDelete(post.postId)}
                                                            className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                                                            title="Delete Post"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Delete
                              </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ManagePost;
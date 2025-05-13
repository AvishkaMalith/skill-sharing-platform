import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ManagePost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/posts/get');
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

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Manage Posts
                    </h1>

                    {loading && (
                        <p className="text-center text-gray-600">Loading posts...</p>
                    )}
                    {error && (
                        <p className="text-center text-red-500">Error: {error}</p>
                    )}
                    {!loading && !error && posts.length === 0 && (
                        <p className="text-center text-gray-600">No posts available.</p>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="py-3 px-4 text-left">Title</th>
                                    <th className="py-3 px-4 text-left">Date</th>
                                    <th className="py-3 px-4 text-left">Category</th>
                                    <th className="py-3 px-4 text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {posts.map((post) => (
                                    <tr key={post.postId} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{post.postTitle}</td>
                                        <td className="py-3 px-4">
                                            {new Date(post.postTime).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="py-3 px-4">{post.postCategory}</td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <Link to={`/edit/${post.postId}`}>
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800"
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
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.postId)}
                                                    className="text-red-600 hover:text-red-800"
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
            <Footer />
        </>
    );
};

export default ManagePost;
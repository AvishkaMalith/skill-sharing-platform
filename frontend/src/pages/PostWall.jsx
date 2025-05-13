import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

// Helper function to strip HTML and get first 25 words
const summarizeContent = (htmlContent) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    const words = text.trim().split(/\s+/);
    const summary = words.slice(0, 25).join(' ');
    return words.length > 25 ? `${summary}...` : summary;
};

const PostWall = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 20;

    // Fetch posts when currentPage changes
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
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
    }, []); // Run once on mount; pagination is handled client-side

    // Calculate paginated posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Handle pagination
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                        Community Posts
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


                    <div className="mb-6">
                        <select
                            onChange={(e) => {
                                // Filter posts by category
                                setPosts(posts.filter((post) => post.postCategory === e.target.value || e.target.value === ''));
                            }}
                            className="px-4 py-2 border rounded-md"
                        >
                            <option value="">All Categories</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            {/* Add more categories */}
                        </select>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentPosts.map((post) => (
                            <div
                                key={post.postId}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {post.postCategory}
                    </span>
                                        <span className="text-sm text-gray-500">
                      {new Date(post.postTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                      })}
                    </span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {post.postTitle}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {summarizeContent(post.content)}{' '}
                                        <Link
                                            to={`/post/${post.postId}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Read More
                                        </Link>
                                    </p>

                                    {post.images && post.images.length > 0 && (
                                        <img
                                            src={`http://localhost:8080${post.images[0]}`}
                                            alt={post.postTitle}
                                            className="w-full h-40 object-cover mb-4"
                                        />
                                    )}
                                    <div className="flex items-center">
                    <span className="text-sm text-gray-700">
                      By {post.publisherName}
                    </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center items-center space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === 1
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        onClick={() => paginate(page)}
                                        className={`px-4 py-2 rounded-md ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostWall;
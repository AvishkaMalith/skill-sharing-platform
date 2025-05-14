import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Define the backend base URL (use environment variable in production)
const BACKEND_BASE_URL = 'http://localhost:8080';

const ViewPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/posts/get/${postId}`);
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const data = await response.json();
                // Prepend backend base URL to image and video paths
                const updatedPost = {
                    ...data,
                    images: data.images?.map((img) => `${BACKEND_BASE_URL}${img}`) || [],
                    videos: data.videos?.map((vid) => `${BACKEND_BASE_URL}${vid}`) || [],
                };
                setPost(updatedPost);
            } catch (err) {
                setError(err.message || 'Error fetching post');
            } finally {
                setLoading(false);
            }
        };

        const fetchCommentCount = async () => {
            try {
                const response = await axios.get(`${BACKEND_BASE_URL}/api/comments/post/${postId}/count`);
                if (response.data && typeof response.data.count === 'number') {
                    setCommentCount(response.data.count);
                }
            } catch (error) {
                console.warn('Error fetching comment count:', error.message);
                setCommentCount(0); // Fallback to 0
            }
        };

        fetchPost();
        fetchCommentCount();
    }, [postId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <NavBar />
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="h-64 bg-gray-200 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <NavBar />
                <div className="max-w-4xl mx-auto">
                    <div className="text-red-500 text-center text-lg">{error || 'Post not found'}</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    {/* Post Header */}
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.postTitle}</h1>
                    <div className="flex items-center text-sm text-gray-600 mb-6">
                        <span>By {post.publisherName}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.postTime).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</span>
                    </div>

                    {/* Post Category */}
                    <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
              {post.postCategory}
            </span>
                    </div>

                    {/* Post Content */}
                    <div
                        className="prose max-w-none text-gray-800 mb-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Images */}
                    {post.images?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Images</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {post.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-lg shadow-sm"
                                        onError={() => console.error(`Failed to load image: ${img}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Videos */}
                    {post.videos?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Videos</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {post.videos.map((vid, index) => (
                                    <video
                                        key={index}
                                        controls
                                        className="w-full h-auto rounded-lg shadow-sm"
                                        onError={() => console.error(`Failed to load video: ${vid}`)}
                                    >
                                        <source src={vid} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="mt-12">
                        <div className="flex items-center mb-4">
                            <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">
                                Comments ({commentCount})
                            </h3>
                        </div>
                        <CommentSection postId={postId} setCommentCount={setCommentCount} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewPost;
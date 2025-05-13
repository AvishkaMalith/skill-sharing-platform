import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
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
                const response = await axios.get(`/api/posts/get/${postId}`);
                setPost(response.data);
            } catch (error) {
                setError('Failed to load post');
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCommentCount = async () => {
            try {
                const response = await axios.get(`/api/comments/post/${postId}/count`);
                setCommentCount(response.data.count);
            } catch (error) {
                console.error('Error fetching comment count:', error);
            }
        };

        fetchPost();
        fetchCommentCount();
    }, [postId]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
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
        );
    }

    if (error || !post) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="text-red-500">{error || 'Post not found'}</div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-8">
                        {/* Main Content */}
                        <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-4xl font-bold text-gray-900">{post.postTitle}</h1>
                                <div className="flex items-center text-gray-600">
                                    <MessageCircle size={20} className="mr-2" />
                                    <span>{commentCount} comments</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-6">
                                By {post.publisherName} | {new Date(post.postTime).toLocaleString()}
                            </p>
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                            {post.images && post.images.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-700">Images</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                        {post.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Post image ${index + 1}`}
                                                className="w-full h-auto rounded-lg object-cover"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {post.videos && post.videos.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-700">Videos</h3>
                                    <div className="grid grid-cols-1 gap-4 mt-2">
                                        {post.videos.map((vid, index) => (
                                            <video
                                                key={index}
                                                controls
                                                className="w-full h-auto rounded-lg"
                                            >
                                                <source src={vid} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Comments Section */}
                        <div className="w-96">
                            <CommentSection postId={postId} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ViewPost;
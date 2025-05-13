import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Footer from '../components/Footer';

// Define the backend base URL (use environment variable in production)
const BACKEND_BASE_URL = 'http://localhost:8080';

const ViewPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/get/${postId}`);
                const data = await response.json();
                if (response.ok) {
                    // Prepend backend base URL to image and video paths
                    const updatedPost = {
                        ...data,
                        images: data.images
                            ? data.images.map((img) => `${BACKEND_BASE_URL}${img}`)
                            : [],
                        videos: data.videos
                            ? data.videos.map((vid) => `${BACKEND_BASE_URL}${vid}`)
                            : [],
                    };
                    setPost(updatedPost);
                } else {
                    setError('Post not found');
                }
            } catch (err) {
                setError('Error fetching post');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!post) return <p className="text-center mt-10">No post available</p>;

    return (
        <>

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.postTitle}</h1>
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
            </div>
            <Footer />
        </>
    );
};

export default ViewPost;
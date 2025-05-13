import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({
        postTitle: '',
        content: '',
        postCategory: '',
        publisherName: '',
        publisherId: '',
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/get/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
                setFormData({
                    postTitle: data.postTitle || '',
                    content: data.content || '',
                    postCategory: data.postCategory || '',
                    publisherName: data.publisherName || '',
                    publisherId: data.publisherId || '',
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    // JoditEditor config
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Write your post content here...',
            height: 300,
            toolbarButtonSize: 'middle',
            buttons: [
                'bold', 'italic', 'underline', '|',
                'ul', 'ol', '|',
                'font', 'fontsize', 'paragraph', '|',
                'image', 'video', 'table', 'link', '|',
                'align', 'undo', 'redo', '|',
                'hr', 'eraser', 'fullsize',
            ],
            uploader: {
                insertImageAsBase64URI: true,
            },
        }),
        []
    );

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file uploads
    const handleImageUpload = (e) => {
        setImageFiles([...e.target.files]);
    };

    const handleVideoUpload = (e) => {
        setVideoFiles([...e.target.files]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formDataToSend = new FormData();
        formDataToSend.append('postTitle', formData.postTitle);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('postCategory', formData.postCategory);
        formDataToSend.append('publisherName', formData.publisherName);
        formDataToSend.append('publisherId', formData.publisherId);
        imageFiles.forEach((file) => formDataToSend.append('imageFiles', file));
        videoFiles.forEach((file) => formDataToSend.append('videoFiles', file));

        try {
            const response = await fetch(`http://localhost:8080/api/posts/update/${postId}`, {
                method: 'PUT',
                body: formDataToSend,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update post');
            }
            setSuccess('Post updated successfully');
            setTimeout(() => navigate('/manage'), 2000); // Redirect after 2 seconds
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !post) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Loading post...</p>
            </div>
        );
    }

    if (error && !post) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Edit Post
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Publisher Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Publisher Name
                            </label>
                            <input
                                type="text"
                                name="publisherName"
                                value={formData.publisherName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Publisher ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Publisher ID
                            </label>
                            <input
                                type="text"
                                name="publisherId"
                                value={formData.publisherId}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your ID"
                                required
                            />
                        </div>

                        {/* Post Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Post Title
                            </label>
                            <input
                                type="text"
                                name="postTitle"
                                value={formData.postTitle}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter post title"
                                required
                            />
                        </div>

                        {/* Post Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Post Category
                            </label>
                            <select
                                name="postCategory"
                                value={formData.postCategory}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Business">Business</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Post Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Post Content
                            </label>
                            <JoditEditor
                                value={formData.content}
                                config={config}
                                onBlur={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))}
                                onChange={() => {}}
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload New Images
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                accept="image/*"
                            />
                            {post?.images?.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">Existing Images:</p>
                                    <ul className="list-disc pl-5">
                                        {post.images.map((img, index) => (
                                            <li key={index} className="text-sm text-gray-600">
                                                {img.split('/').pop()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Videos */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload New Videos
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleVideoUpload}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                accept="video/*"
                            />
                            {post?.videos?.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">Existing Videos:</p>
                                    <ul className="list-disc pl-5">
                                        {post.videos.map((vid, index) => (
                                            <li key={index} className="text-sm text-gray-600">
                                                {vid.split('/').pop()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-3 text-white rounded-md shadow transition ${
                                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Updating...' : 'Update Post'}
                            </button>
                        </div>

                        {/* Feedback Messages */}
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditPost;
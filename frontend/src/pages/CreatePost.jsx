import { useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Footer from '../components/Footer';
import usePostStore from '../stores/postStore';

const CreatePost = () => {
    const {
        content,
        images,
        videos,
        publisherName,
        publisherId,
        isLoading,
        error,
        success,
        setContent,
        setImages,
        setVideos,
        setPublisherName,
        setPublisherId,
        createPost,
    } = usePostStore();

    const [imageInput, setImageInput] = useState('');
    const [videoInput, setVideoInput] = useState('');

    // Memoize the Jodit Editor configuration to prevent focus issues
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
                insertImageAsBase64URI: true, // For testing, use base64; later, configure for file uploads
            },
        }),
        []
    );

    const handleAddImage = () => {
        if (imageInput.trim()) {
            setImages([...images, imageInput.trim()]);
            setImageInput('');
        }
    };

    const handleAddVideo = () => {
        if (videoInput.trim()) {
            setVideos([...videos, videoInput.trim()]);
            setVideoInput('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Create a New Post
                    </h2>

                    <div className="space-y-6">
                        {/* Publisher Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Publisher Name
                            </label>
                            <input
                                type="text"
                                value={publisherName}
                                onChange={(e) => setPublisherName(e.target.value)}
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
                                value={publisherId}
                                onChange={(e) => setPublisherId(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your ID"
                                required
                            />
                        </div>

                        {/* Post Content (Jodit Editor) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Post Content
                            </label>
                            <JoditEditor
                                value={content}
                                config={config}
                                onBlur={(newContent) => setContent(newContent)} // Update content on blur for better performance
                                onChange={() => {}} // Empty onChange to prevent unnecessary re-renders
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Images (Enter file paths for now)
                            </label>
                            <div className="flex items-center space-x-4 mt-1">
                                <input
                                    type="text"
                                    value={imageInput}
                                    onChange={(e) => setImageInput(e.target.value)}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., uploads/images/image1.jpg"
                                />
                                <button
                                    onClick={handleAddImage}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add Image
                                </button>
                            </div>
                            {images.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                    {images.map((img, index) => (
                                        <li key={index} className="text-sm text-gray-600">
                                            {img}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Videos */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Videos (Enter file paths for now)
                            </label>
                            <div className="flex items-center space-x-4 mt-1">
                                <input
                                    type="text"
                                    value={videoInput}
                                    onChange={(e) => setVideoInput(e.target.value)}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., uploads/videos/video1.mp4"
                                />
                                <button
                                    onClick={handleAddVideo}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add Video
                                </button>
                            </div>
                            {videos.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                    {videos.map((vid, index) => (
                                        <li key={index} className="text-sm text-gray-600">
                                            {vid}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`w-full px-6 py-3 text-white rounded-md shadow transition ${
                                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isLoading ? 'Creating...' : 'Create Post'}
                            </button>
                        </div>

                        {/* Feedback Messages */}
                        {error && (
                            <p className="text-red-500 text-center mt-4">{error}</p>
                        )}
                        {success && (
                            <p className="text-green-500 text-center mt-4">
                                Post created successfully! {success}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreatePost;
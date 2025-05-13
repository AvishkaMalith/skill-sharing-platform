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
        postCategory,
        postTitle,
        isLoading,
        error,
        success,
        setContent,
        setImages,
        setVideos,
        setPublisherName,
        setPublisherId,
        setPostCategory,
        setPostTitle,
        createPost,
    } = usePostStore();

    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);

    // Memoize the Jodit Editor configuration
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

    const handleImageUpload = (e) => {
        setImageFiles([...e.target.files]);
    };

    const handleVideoUpload = (e) => {
        setVideoFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('publisherName', publisherName);
        formData.append('publisherId', publisherId);
        formData.append('postCategory', postCategory);
        formData.append('postTitle', postTitle);
        formData.append('content', content);
        imageFiles.forEach((file) => formData.append('imageFiles', file));
        videoFiles.forEach((file) => formData.append('videoFiles', file));

        await createPost(formData);
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

                        {/* Post Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Post Category
                            </label>
                            <input
                                type="text"
                                value={postCategory}
                                onChange={(e) => setPostCategory(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter post category"
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
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter post title"
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
                                onBlur={(newContent) => setContent(newContent)}
                                onChange={() => {}}
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Images
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                accept="image/*"
                            />
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
                                Upload Videos
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={handleVideoUpload}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                accept="video/*"
                            />
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
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreatePost;
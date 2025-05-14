import { useEffect, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import usePostStore from '../stores/postStore';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    const {
        content,
        setContent,
        images,
        setImages,
        videos,
        setVideos,
        publisherName,
        setPublisherName,
        publisherId,
        setPublisherId,
        postTitle,
        setPostTitle,
        postCategory,
        setPostCategory,
        isLoading,
        error,
        success,
        createPost,
    } = usePostStore();

    // Fetch userId and userName from cookies on mount
    useEffect(() => {
        const userId = Cookies.get('userId');
        const userName = Cookies.get('userName');
        if (userId && userName) {
            setPublisherId(userId);
            setPublisherName(userName);
        } else {
            console.warn('Cookies not found: userId or userName missing');
        }
    }, [setPublisherId, setPublisherName]);

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!publisherId || !publisherName) {
            usePostStore.setState({ error: 'Please log in to create a post' });
            return;
        }

        const formData = new FormData();
        formData.append('publisherName', publisherName);
        formData.append('publisherId', publisherId);
        formData.append('postTitle', postTitle);
        formData.append('content', content);
        formData.append('postCategory', postCategory);
        images.forEach((file) => formData.append('imageFiles', file));
        videos.forEach((file) => formData.append('videoFiles', file));

        await createPost(formData);

        // Assigning a badge for the user on the number of posts created
        const response = await axios.post(`http://localhost:8080/api/users/assign-badge/${Cookies.get('userId')}`);
        
        // Check if the badge was assigned successfully
        console.log(response.data);
    };

    // Handle file uploads
    const handleImageUpload = (e) => {
        setImages([...e.target.files]);
    };

    const handleVideoUpload = (e) => {
        setVideos([...e.target.files]);
    };






    return (


        <>

            <div className="mb-6">
                <Link
                    to="/manage"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Manage Posts
                </Link>
            </div>

            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Create a New Post
                    </h2>



                    <form onSubmit={handleSubmit} className="space-y-6">

                        <p className="text-gray-600 mb-4">Posting as: {publisherName}</p>
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

                        {/* Post Category Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Post Category
                            </label>
                            <select
                                value={postCategory}
                                onChange={(e) => setPostCategory(e.target.value)}
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
                                value={content}
                                config={config}
                                onBlur={(newContent) => setContent(newContent)} // Update content on blur for better performance
                                onChange={() => { }} // Empty onChange to prevent unnecessary re-renders
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
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full px-6 py-3 text-white rounded-md shadow transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {isLoading ? 'Creating...' : 'Create Post'}
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

export default CreatePost;
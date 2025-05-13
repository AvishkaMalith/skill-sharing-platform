import { create } from 'zustand';

const usePostStore = create((set) => ({
    content: '',
    images: [],
    videos: [],
    publisherName: '',
    publisherId: '',
    postTitle: '',
    isLoading: false,
    error: null,
    success: null,

    setContent: (content) => set({ content }),
    setImages: (images) => set({ images }),
    setVideos: (videos) => set({ videos }),
    setPostTitle: (postTitle) => set({ postTitle }),
    setPublisherName: (publisherName) => set({ publisherName }),
    setPublisherId: (publisherId) => set({ publisherId }),

    createPost: async (formData) => {
        set({ isLoading: true, error: null, success: null });
        try {
            const response = await fetch('http://localhost:8080/api/posts/create', {
                method: 'POST',
                body: formData, // No Content-Type header for FormData
            });

            const result = await response.json();
            if (response.ok) {
                set({ success: result.message, isLoading: false });
                // Reset form after successful submission
                set({
                    content: '',
                    images: [],
                    videos: [],
                    postTitle: '',
                    publisherName: '',
                    publisherId: '',
                });
            } else {
                throw new Error(result.message || 'Failed to create post');
            }
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default usePostStore;
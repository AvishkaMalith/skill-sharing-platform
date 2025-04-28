import { create } from 'zustand';

const usePostStore = create((set) => ({
    content: '',
    images: [],
    videos: [],
    publisherName: '',
    publisherId: '',
    isLoading: false,
    error: null,
    success: null,

    setContent: (content) => set({ content }),
    setImages: (images) => set({ images }),
    setVideos: (videos) => set({ videos }),
    setPublisherName: (publisherName) => set({ publisherName }),
    setPublisherId: (publisherId) => set({ publisherId }),

    createPost: async () => {
        set({ isLoading: true, error: null, success: null });
        try {
            const postData = {
                publisherName: usePostStore.getState().publisherName,
                publisherId: usePostStore.getState().publisherId,
                content: usePostStore.getState().content,
                images: usePostStore.getState().images,
                videos: usePostStore.getState().videos,
            };

            const response = await fetch('http://localhost:8080/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const result = await response.json();
            if (response.ok) {
                set({ success: result, isLoading: false });
                // Reset form after successful submission
                set({
                    content: '',
                    images: [],
                    videos: [],
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
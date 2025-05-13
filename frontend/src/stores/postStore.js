import { create } from 'zustand';

const usePostStore = create((set) => ({
    content: '',
    images: [],
    videos: [],
    publisherName: '',
    publisherId: '',
    postTitle: '',
    postCategory: '',
    isLoading: false,
    error: null,
    success: null,
    setContent: (content) => set({ content }),
    setImages: (images) => set({ images }),
    setVideos: (videos) => set({ videos }),
    setPublisherName: (publisherName) => set({ publisherName }),
    setPublisherId: (publisherId) => set({ publisherId }),
    setPostTitle: (postTitle) => set({ postTitle }),
    setPostCategory: (postCategory) => set({ postCategory }),
    createPost: async (formData) => {
        set({ isLoading: true, error: null, success: null });
        try {
            const response = await fetch('http://localhost:8080/api/posts/create', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                set({ success: data.message, isLoading: false });
            } else {
                set({ error: data.message || 'Failed to create post', isLoading: false });
            }
        } catch (err) {
            set({ error: 'Error creating post', isLoading: false });
        }
    },
    updatePost: async (postId, formData) => {
        set({ isLoading: true, error: null, success: null });
        try {
            const response = await fetch(`http://localhost:8080/api/posts/update/${postId}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                set({ success: data.message, isLoading: false });
            } else {
                set({ error: data.message || 'Failed to update post', isLoading: false });
            }
        } catch (err) {
            set({ error: 'Error updating post', isLoading: false });
        }
    },
    deletePost: async (postId) => {
        set({ isLoading: true, error: null, success: null });
        try {
            const response = await fetch(`http://localhost:8080/api/posts/delete/${postId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                set({ success: data.message, isLoading: false });
            } else {
                set({ error: data.message || 'Failed to delete post', isLoading: false });
            }
        } catch (err) {
            set({ error: 'Error deleting post', isLoading: false });
        }
    },
}));

export default usePostStore;
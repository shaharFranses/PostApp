import { useState } from 'react';
import axios from 'axios';

// Custom hook for managing posts data and operations
export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: postData.title.trim(),
        body: postData.body.trim()
      });

      if (response.status === 201) {
        const newPost = {
          id: response.data.id,
          title: postData.title.trim(),
          body: postData.body.trim()
        };
        
        setPosts(prevPosts => [newPost, ...prevPosts]);
        return { success: true, post: newPost };
      }
    } catch (err) {
      throw new Error('Failed to create post. Please try again.');
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost
  };
}; 
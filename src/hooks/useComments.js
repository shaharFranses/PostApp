import { useState } from 'react';
import axios from 'axios';

// Custom hook for managing comments data and operations
export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setComments(response.data);
    } catch (err) {
      setComments([]);
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    fetchComments
  };
}; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Container, 
  CircularProgress,
  Alert,
  Box,
  Snackbar
} from '@mui/material';
import './MainPage.css';
import SearchBar from '../SearchBar/SearchBar';
import CustomButton from '../CustomButton/CustomButton';
import NewPostForm from '../NewPostForm/NewPostForm';

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Simple wait function
  const wait = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Wait for 3 seconds
      await wait(3);
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setFilteredPosts(response.data); // Initialize filtered posts with all posts
    } catch (err) {
      let errorMessage;
      if (err.response?.status && err.response?.data?.message) {
        errorMessage = `Error ${err.response.status}: ${err.response.data.message}`;
      } else if (err.response?.status) {
        errorMessage = `Error ${err.response.status}: Sadly the page is not available at the moment. Please try again later.`;
      } else {
        errorMessage = 'Network Error: Sadly the page is not available. Please check your connection and try again.';
      }
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts); // Show all posts if search is empty
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handlePostClick = (postId) => {
    const postData = posts.find(post => post.id === parseInt(postId));
    navigate(`/post/${postId}`, { state: { post: postData } });
  };

  const handleAddPost = () => {
    setShowNewPostForm((prev) => !prev);
  };

  const handleNewPostSubmit = (newPost) => {
    // Add the new post to the local state
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setFilteredPosts([newPost, ...filteredPosts]);
    setShowNewPostForm(false);
    
    // Show success notification
    setNotification({
      open: true,
      message: 'Post created successfully!',
      severity: 'success'
    });
  };

  const handleNewPostCancel = () => {
    setShowNewPostForm(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      {/* Success/Error Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Grid container direction="column" alignItems="center" sx={{ width: '80vw', mx: 'auto', mt: 4 }}>
        <Grid item sx={{ width: '100%' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Posts
          </Typography>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            mb: 2,
            gap: 2
          }}>
            <SearchBar onSearch={handleSearch} buttonSx={{ minWidth: 140, height: 56 }} />
            <CustomButton 
              onClick={handleAddPost} 
              variant="contained" 
              color="primary" 
              sx={{ 
                minWidth: 140, 
                height: 56,
                mb: 3
              }}
            >
              Create New Post
            </CustomButton>
          </Box>
        </Grid>
        {showNewPostForm && (
          <Grid item sx={{ width: '100%' }}>
            <NewPostForm onSubmit={handleNewPostSubmit} onCancel={handleNewPostCancel} cardSx={{
              width: '100%',
              mb: 3,
              borderRadius: 3,
            }} />
          </Grid>
        )}
        <Grid item sx={{ width: '100%' }}>
          {filteredPosts.length > 0 ? (
            <Grid container spacing={3} direction="column" alignItems="center">
              {filteredPosts.map(post => (
                <Grid item sx={{ width: '100%' }} key={post.id}>
                  <Card 
                    className="post-card"
                    sx={{
                      width: '100%',
                      borderRadius: 3,
                    }}
                    onClick={() => handlePostClick(post.id)}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.body}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No posts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or browse all posts.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../CustomButton/CustomButton';
import './SinglePostPage.css';

function SinglePostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(location.state?.post || null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(!location.state?.post); // Only loading if post not passed
  const [error, setError] = useState(null);

  useEffect(() => {
    // If post is not available, fetch it
    if (!post) {
      fetchPost();
    } else {
      setLoading(false);
    }
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPost(response.data);
    } catch (err) {
      setError('Failed to load post details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setComments(response.data);
    } catch (err) {
      setError('Failed to load post comments.');
    }
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
        <CustomButton
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Posts
        </CustomButton>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CustomButton
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Posts
      </CustomButton>

      {post && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {post.body}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Typography variant="h5" gutterBottom>
        Comments ({comments.length})
      </Typography>

      {comments.length > 0 ? (
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" color="primary">
                      {comment.email}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" component="span">
                      {comment.body}
                    </Typography>
                  }
                />
              </ListItem>
              {index < comments.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Card sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          <Typography variant="body1" color="text.secondary">
            No comments for this post yet.
          </Typography>
        </Card>
      )}
    </Container>
  );
}

export default SinglePostPage;
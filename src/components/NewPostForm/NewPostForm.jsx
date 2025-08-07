import React, { useState } from 'react';
import { Box, TextField, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import CustomButton from '../CustomButton/CustomButton';
import './NewPostForm.css';

// Form component for creating new posts with title and body fields
function NewPostForm({ onSubmit, onCancel, cardSx }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  // Handles form submission and API communication
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Both title and body are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: title.trim(),
        body: body.trim()
      });

      if (response.status === 201) {
        // Add the new post to the local state
        onSubmit({ 
          id: response.data.id, 
          title: title.trim(), 
          body: body.trim() 
        });
        setTitle('');
        setBody('');
        setPosted(true);
        
        // Reset posted state after 3 seconds
        setTimeout(() => {
          setPosted(false);
        }, 3000);
      }
    } catch (err) {
      let errorMessage;
      if (err.response?.status && err.response?.data?.message) {
        errorMessage = `Error ${err.response.status}: ${err.response.data.message}`;
      } else if (err.response?.status) {
        errorMessage = `Error ${err.response.status}: Failed to create post. Please try again.`;
      } else {
        errorMessage = 'Network Error: Failed to create post. Please check your connection and try again.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handles form cancellation and resets all states
  const handleCancel = () => {
    setTitle('');
    setBody('');
    setError('');
    setPosted(false);
    onCancel();
  };

  return (
    <Paper
      elevation={3}
      className="new-post-form"
      sx={{
        width: '100%',
        mb: 3,
        borderRadius: 3,
        p: { xs: 2, sm: 3 },
        boxSizing: 'border-box',
        ...(cardSx || {}),
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Create New Post
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading}
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={0}
          disabled={loading}
        />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
          <CustomButton 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading || posted}
            sx={{ 
              minWidth: 120,
              ...(posted && {
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#45a049',
                }
              })
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} color="inherit" />
                Submitting...
              </Box>
            ) : posted ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon />
                Posted
              </Box>
            ) : (
              'Submit'
            )}
          </CustomButton>
          <CustomButton 
            variant="outlined" 
            color="secondary" 
            onClick={handleCancel}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            Cancel
          </CustomButton>
        </Box>
      </form>
    </Paper>
  );
}

export default NewPostForm;
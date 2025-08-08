import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import './DataCard.css';

// Reusable card component for displaying data
function DataCard({ title, content, onClick, className, sx }) {
  // Protect against undefined content
  const safeContent = content || 'No content available';
  
  return (
    <Card
      className={`data-card ${className || ''}`}
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
        } : {},
        ...sx
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {title && (
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, color: 'var(--black)', mb: 2 }}
          >
            {title}
          </Typography>
        )}
        <Box>
          {typeof safeContent === 'string' ? (
            <Typography variant="body1" color="text.primary">
              {safeContent}
            </Typography>
          ) : (
            safeContent
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default DataCard;

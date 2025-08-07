import React from 'react';
import Button from '@mui/material/Button';
import './CustomButton.css';

function CustomButton({ children, onClick, type = 'button', variant = 'contained', color = 'primary', startIcon, ...rest }) {
  return (
    <Button
      className="custom-button"
      onClick={onClick}
      type={type}
      variant={variant}
      color={color}
      startIcon={startIcon}
      textTransform= 'none'
      {...rest}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
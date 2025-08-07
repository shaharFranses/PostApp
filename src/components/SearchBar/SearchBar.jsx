import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from '../CustomButton/CustomButton';
import './SearchBar.css';

// Search component with input field and filter/clear buttons
function SearchBar({ onSearch, buttonSx }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handles search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // Clears the search term and resets search results
  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); // Clear filter results
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, height: 56, display: 'flex', alignItems: 'flex-end' }} className="search-bar-container">
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Filter posts by title... (Press Enter to filter)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        <CustomButton 
          type="submit" 
          variant="contained"
          sx={buttonSx || { minWidth: 120 }}
        >
          Filter
        </CustomButton>
        {searchTerm && (
          <CustomButton 
            variant="outlined"
            onClick={handleClear}
            sx={buttonSx || { minWidth: 120 }}
          >
            Clear
          </CustomButton>
        )}
      </Box>
    </Box>
  );
}

export default SearchBar;

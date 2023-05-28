import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: '20px',
      }}
    >
      <img src="/path/to/company-logo.png" alt="Company Logo" />
    </Box>
  );
};

export default Header;

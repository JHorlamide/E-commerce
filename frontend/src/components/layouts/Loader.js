import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

const Loader = () => {
  return (
    <Box style={{ position: 'relative' }}>
      <CircularProgress
        color='inherit'
        style={{ marginLeft: '50%' }}
        top={10}
        left={-20}
        size={50}
      />
    </Box>
  );
};

export default Loader;

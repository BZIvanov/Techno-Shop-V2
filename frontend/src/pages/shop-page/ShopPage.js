import { Box } from '@mui/material';

const ShopPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box>Filters</Box>
      <Box sx={{ flexGrow: 1 }}>Products</Box>
    </Box>
  );
};

export default ShopPage;

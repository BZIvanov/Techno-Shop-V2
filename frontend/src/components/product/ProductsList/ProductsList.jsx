import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Pagination,
} from '@mui/material';
import { AddShoppingCart, Preview } from '../../mui/Icons';
import ProductCard from '../ProductCard/ProductCard';
import AverageRating from '../../common/rating/AverageRating/AverageRating';

const ProductsList = ({
  header,
  products,
  page,
  handlePageChange,
  totalCount,
  productsPerPage,
  showPagination = true,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant='h5'
        sx={{
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        {header}
      </Typography>

      <Paper sx={{ padding: 2 }}>
        {products.length > 0 ? (
          <Grid container={true} spacing={3}>
            {products.map((product) => (
              <Grid
                key={product._id}
                item={true}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <AverageRating ratings={product.ratings} size='small' />

                <ProductCard product={product}>
                  <Button
                    component={Link}
                    to={`/product/${product._id}`}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Preview />
                    <Typography variant='caption'>Details</Typography>
                  </Button>
                  <Button
                    onClick={() => console.log('works')}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <AddShoppingCart />
                    <Typography variant='caption'>Add to cart</Typography>
                  </Button>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ textAlign: 'center' }} variant='subtitle2'>
            No Products found.
          </Typography>
        )}

        {showPagination && products.length > 0 && (
          <Stack sx={{ margin: 2, display: 'flex', alignItems: 'center' }}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={Math.ceil(totalCount / productsPerPage)}
              boundaryCount={2}
              showFirstButton={true}
              showLastButton={true}
            />
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default ProductsList;

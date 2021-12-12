import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Stack,
  Pagination,
} from '@mui/material';
import { AddShoppingCart, Preview } from '@mui/icons-material';
import { ProductCard } from '../../components/product-card';
import { getProductsAction } from '../../store/action-creators';
import { PRODUCTS_LIST_TYPES } from '../../constants';

const PRODUCTS_PER_PAGE = 3;

const ProductsList = ({ type, header }) => {
  const { products, totalCount } = useSelector(({ product }) =>
    type === PRODUCTS_LIST_TYPES.newest ? product.newest : product.bestselling
  );

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: type,
        sortColumn: type === PRODUCTS_LIST_TYPES.newest ? 'createdAt' : 'sold',
        page,
        perPage: PRODUCTS_PER_PAGE,
      })
    );
  }, [dispatch, type, page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        <Typography variant='h1' sx={{ textAlign: 'center' }}>
          {header}
        </Typography>

        <Paper sx={{ width: '100%', padding: 2 }}>
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
                  <ProductCard product={product}>
                    <>
                      <IconButton
                        component={Link}
                        to={`/product/${product._id}`}
                        size='medium'
                        color='warning'
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '5px 12px',
                        }}
                      >
                        <Preview />
                        <Typography variant='caption'>Details</Typography>
                      </IconButton>
                      <IconButton
                        size='medium'
                        color='warning'
                        onClick={() => console.log('works')}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '5px 12px',
                        }}
                      >
                        <AddShoppingCart />
                        <Typography variant='caption'>Add to cart</Typography>
                      </IconButton>
                    </>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ textAlign: 'center' }} variant='subtitle2'>
              No Products found.
            </Typography>
          )}

          {products.length > 0 && (
            <Stack sx={{ margin: 2, display: 'flex', alignItems: 'center' }}>
              <Pagination
                page={page}
                onChange={handlePageChange}
                count={Math.ceil(totalCount / PRODUCTS_PER_PAGE)}
                boundaryCount={2}
                showFirstButton={true}
                showLastButton={true}
              />
            </Stack>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default ProductsList;

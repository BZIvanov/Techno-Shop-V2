import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import { AddShoppingCart, Preview } from '@mui/icons-material';
import { ProductCard } from '../../components/product-card';
import { getProductsAction } from '../../store/action-creators';
import { PRODUCTS_LIST_TYPES } from '../../constants';

const ProductsList = ({ type, header }) => {
  const { products } = useSelector(({ product }) =>
    type === PRODUCTS_LIST_TYPES.newest ? product.newest : product.bestselling
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: type,
        sortColumn: type === PRODUCTS_LIST_TYPES.newest ? 'createdAt' : 'sold',
        perPage: 3,
      })
    );
  }, [dispatch, type]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: { xs: '10px', sm: '20px', md: '40px' },
          width: '100%',
        }}
      >
        <Typography variant='h1'>{header}</Typography>

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
                        to={`/admin/product/${product._id}`}
                        size='medium'
                        color='warning'
                      >
                        <Preview />
                      </IconButton>
                      <IconButton
                        size='medium'
                        color='warning'
                        onClick={() => console.log('works')}
                      >
                        <AddShoppingCart />
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
        </Paper>
      </Box>
    </>
  );
};

export default ProductsList;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import { AddShoppingCart, Preview } from '@mui/icons-material';
import { ProductCard } from '../../components/product-card';
import { Jumbotron } from '../../components/jumbotron';
import { ApiCallAlert } from '../../components/api-call-alert';
import { ApiCallLoader } from '../../components/api-call-loader';
import { getProductsAction } from '../../store/action-creators';

const JUMBOTRON_TEXTS = ['Latest Products', 'New Arrivals', 'Best Sellers'];

const HomePage = () => {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <>
      <Jumbotron texts={JUMBOTRON_TEXTS} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: { xs: '10px', sm: '20px', md: '40px' },
        }}
      >
        <Typography variant='h1'>{JUMBOTRON_TEXTS[0]}</Typography>

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
            <Typography variant='subtitle2'>
              No Products found. Use the form above to create some.
            </Typography>
          )}
        </Paper>

        <ApiCallLoader />

        <ApiCallAlert />
      </Box>
    </>
  );
};

export default HomePage;

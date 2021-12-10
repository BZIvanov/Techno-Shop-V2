import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { Jumbotron } from '../../components/jumbotron';
import { ProductsList } from '../../components/products-list';
import { ApiCallAlert } from '../../components/api-call-alert';
import { ApiCallLoader } from '../../components/api-call-loader';
import { getProductsAction } from '../../store/action-creators';
import { PRODUCTS_LIST_TYPES, JUMBOTRON_TEXTS } from '../../constants';

const HomePage = () => {
  const { newestProducts, bestsellingProducts } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: PRODUCTS_LIST_TYPES.newest,
        sortColumn: 'createdAt',
        perPage: 3,
      })
    );
    dispatch(
      getProductsAction({
        productsType: PRODUCTS_LIST_TYPES.bestselling,
        sortColumn: 'sold',
        perPage: 3,
      })
    );
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
        <ProductsList header={JUMBOTRON_TEXTS[0]} products={newestProducts} />

        <ProductsList
          header={JUMBOTRON_TEXTS[1]}
          products={bestsellingProducts}
        />
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default HomePage;

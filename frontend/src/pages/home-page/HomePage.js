import { Box } from '@mui/material';
import { Jumbotron } from '../../components/jumbotron';
import { ProductsList } from '../../components/products-list';
import { ApiCallAlert } from '../../components/api-call-alert';
import { ApiCallLoader } from '../../components/api-call-loader';
import { PRODUCTS_LIST_TYPES, JUMBOTRON_TEXTS } from '../../constants';

const HomePage = () => {
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
        <ProductsList
          type={PRODUCTS_LIST_TYPES.newest}
          header={JUMBOTRON_TEXTS[0]}
        />

        <ProductsList
          type={PRODUCTS_LIST_TYPES.bestselling}
          header={JUMBOTRON_TEXTS[1]}
        />
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default HomePage;

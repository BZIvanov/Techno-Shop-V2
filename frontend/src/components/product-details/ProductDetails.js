import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { getProductAction } from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';

const ProductDetails = () => {
  const { selectedProduct: product } = useSelector((state) => state.product);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction(id));
  }, [dispatch, id]);

  return (
    <>
      {product && (
        <Box>
          <Typography>{product.title}</Typography>
        </Box>
      )}

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default ProductDetails;

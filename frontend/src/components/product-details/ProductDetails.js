import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { getProductAction } from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
        <Grid
          container={true}
          sx={{ '& .slide img': { maxHeight: '390px', objectFit: 'cover' } }}
        >
          <Grid item={true} sm={12} md={6}>
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
              {product.images.map(({ publicId, url }) => (
                <img src={url} key={publicId} alt='product-preview' />
              ))}
            </Carousel>
          </Grid>
          <Typography>{product.title}</Typography>
        </Grid>
      )}

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default ProductDetails;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
} from '@mui/material';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import { getProductsAction } from '../../store/action-creators';

const ProductsCardsList = () => {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h1'>Products List</Typography>

      <Box>
        {products.map(({ _id, title, description, images }) => (
          <Card key={_id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                image={images.length > 0 ? images[0].url : ''}
                alt='app product'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary'>
                Click
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ProductsCardsList;

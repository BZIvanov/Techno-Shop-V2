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
  IconButton,
  Grid,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import { getProductsAction } from '../../store/action-creators';
import productImage from '../../assets/images/product.png';

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

      <Grid container={true} spacing={3} sx={{ padding: 4 }}>
        {products.map(({ _id, title, description, images }) => (
          <Grid key={_id} item={true} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image={images.length > 0 ? images[0].url : productImage}
                  alt='app product'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {description.length > 80
                      ? description.substring(0, 80) + '...'
                      : description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <IconButton size='medium' color='warning'>
                  <Edit />
                </IconButton>
                <IconButton size='medium' color='warning'>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ProductsCardsList;

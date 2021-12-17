import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Chip,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import { getProductAction } from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import productImage from '../../assets/images/product.png';

const ProductDetails = () => {
  const { selectedProduct: product } = useSelector((state) => state.product);

  const navigate = useNavigate();
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
              {product.images.length > 0 ? (
                product.images.map(({ publicId, url }) => (
                  <img src={url} key={publicId} alt='product-preview' />
                ))
              ) : (
                <img src={productImage} alt='product-preview' />
              )}
            </Carousel>
          </Grid>

          <Grid item={true} sm={12} md={6} sx={{ padding: 2 }}>
            <Typography
              gutterBottom={true}
              variant='h2'
              sx={{
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.info.main,
                padding: 1,
              }}
            >
              {product.title}
            </Typography>

            <Card>
              <CardContent>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <ListItem secondaryAction={`$ ${product.price}`}>
                    <ListItemText primary='Price' />
                  </ListItem>

                  <ListItem
                    secondaryAction={
                      <Chip
                        label={product.category.name}
                        variant='outlined'
                        onClick={() => navigate('/admin/password')}
                        size='small'
                      />
                    }
                  >
                    <ListItemText primary='Category' />
                  </ListItem>

                  <ListItem
                    secondaryAction={
                      <Stack direction='row' spacing={1}>
                        {product.subcategories.map((subcategory) => (
                          <Chip
                            key={subcategory._id}
                            label={subcategory.name}
                            variant='outlined'
                            onClick={() => navigate('/admin/password')}
                            size='small'
                          />
                        ))}
                      </Stack>
                    }
                  >
                    <ListItemText primary='Subcategories' />
                  </ListItem>

                  <ListItem secondaryAction={product.shipping}>
                    <ListItemText primary='Shipping' />
                  </ListItem>
                  <ListItem secondaryAction={product.color}>
                    <ListItemText primary='Color' />
                  </ListItem>
                  <ListItem secondaryAction={product.brand}>
                    <ListItemText primary='Brand' />
                  </ListItem>
                  <ListItem secondaryAction={product.quantity}>
                    <ListItemText primary='Quantity' />
                  </ListItem>
                  <ListItem secondaryAction={product.sold}>
                    <ListItemText primary='Sold' />
                  </ListItem>
                </List>
              </CardContent>

              <CardActions>
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
                  <Favorite />
                  <Typography variant='caption'>Add to wishlist</Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default ProductDetails;

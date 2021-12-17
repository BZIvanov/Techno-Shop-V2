import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Box,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import { getProductAction } from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import productImage from '../../assets/images/product.png';

const ProductDetails = () => {
  const { selectedProduct: product } = useSelector((state) => state.product);

  const [tabValue, setTabValue] = useState(0);

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

          <Grid item={true} xs={12} sm={12} md={6} sx={{ padding: 2 }}>
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

            <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <CardContent>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                    }}
                  >
                    <Typography variant='body1'>Price:</Typography>
                    <Typography variant='body1'>{`$ ${product.price}`}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='body1'>Category:</Typography>
                    <Chip
                      label={product.category.name}
                      variant='outlined'
                      onClick={() =>
                        navigate(`/category/${product.category._id}`)
                      }
                      size='small'
                      sx={{ margin: 0.2 }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='body1'>Subcategories:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {product.subcategories.map((subcategory) => (
                        <Chip
                          key={subcategory._id}
                          label={subcategory.name}
                          variant='outlined'
                          onClick={() =>
                            navigate(`/subcategory/${subcategory._id}`)
                          }
                          size='small'
                          sx={{ margin: 0.2 }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                    }}
                  >
                    <Typography variant='body1'>Shipping:</Typography>
                    <Typography variant='body1'>{product.shipping}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                    }}
                  >
                    <Typography variant='body1'>Color:</Typography>
                    <Typography variant='body1'>{product.color}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                    }}
                  >
                    <Typography variant='body1'>Brand:</Typography>
                    <Typography variant='body1'>{product.brand}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                    }}
                  >
                    <Typography variant='body1'>Quantity:</Typography>
                    <Typography variant='body1'>{product.quantity}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                    }}
                  >
                    <Typography variant='body1'>Sold:</Typography>
                    <Typography variant='body1'>{product.sold}</Typography>
                  </Box>
                </Box>
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

          <Grid item={true} xs={12}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={(event, newValue) => {
                    setTabValue(newValue);
                  }}
                >
                  <Tab label='Description' value={0} />
                  <Tab label='Contact us' value={1} />
                </TabList>
              </Box>
              <TabPanel value={0}>{product.description}</TabPanel>
              <TabPanel value={1}>
                Contact us on +359899 000 111 or on email: info@test.com
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      )}

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default ProductDetails;

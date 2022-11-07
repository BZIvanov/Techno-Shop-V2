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
} from '@mui/material';
import {
  AddShoppingCart,
  Favorite,
  Star,
  StarBorderOutlined,
} from '@mui/icons-material';
import { ImagesCarousel } from '../images-carousel';
import { RatingDialog } from '../rating-dialog';
import { AverageRating } from '../average-rating';
import { ProductInfoTabs } from '../product-info-tabs';
import { ProductsList } from '../products-list';
import {
  getProductAction,
  getSimilarProductsAction,
  rateProductAction,
} from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';

const ProductDetails = () => {
  const { user, token } = useSelector((state) => state.user);
  const { product, similarProducts } = useSelector(
    (state) => state.product.selectedProduct
  );

  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction(id));
    dispatch(getSimilarProductsAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && user) {
      const userRating = product.ratings.find(
        (rating) => rating.postedBy === user._id
      );
      userRating && setRating(userRating.star);
    }

    return () => setRating(0);
  }, [product, user]);

  const rateProduct = () => {
    dispatch(rateProductAction(product._id, { rating }, token));
  };

  return (
    <>
      {product && (
        <Grid
          container={true}
          sx={{ '& .slide img': { maxHeight: '390px', objectFit: 'cover' } }}
        >
          <Grid item={true} sm={12} md={6}>
            <ImagesCarousel images={product.images} />
          </Grid>

          <Grid item={true} xs={12} sm={12} md={6} sx={{ padding: 2 }}>
            <Typography
              gutterBottom={true}
              variant='h4'
              sx={{
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.info.main,
                padding: 1,
              }}
            >
              {product.title}
            </Typography>

            <AverageRating ratings={product.ratings} />

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
                <IconButton
                  size='medium'
                  color='warning'
                  onClick={() => {
                    if (user) {
                      setShowRatingModal(true);
                    } else {
                      navigate('/login', {
                        state: { productId: product._id },
                      });
                    }
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '5px 12px',
                  }}
                >
                  {rating > 0 ? <Star /> : <StarBorderOutlined />}
                  <Typography variant='caption'>
                    {user ? 'Leave rating' : 'Login to leave rating'}
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          <Grid item={true} xs={12}>
            <ProductInfoTabs description={product.description} />
          </Grid>

          <Grid item={true} xs={12}>
            <ProductsList
              header='Similar Products'
              products={similarProducts}
              showPagination={false}
            />
          </Grid>
        </Grid>
      )}

      <RatingDialog
        showRatingModal={showRatingModal}
        setShowRatingModal={setShowRatingModal}
        rating={rating}
        setRating={setRating}
        rateProduct={rateProduct}
      />

      <ApiCallLoader />

      <ApiCallAlert />
    </>
  );
};

export default ProductDetails;

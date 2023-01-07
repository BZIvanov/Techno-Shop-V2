import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
} from '@mui/material';
import {
  AddShoppingCart,
  Favorite,
  Star,
  StarBorderOutlined,
} from '../../mui/Icons';
import { ImagesCarousel } from '../../common/images/ImagesCarousel';
import RatingDialog from '../../common/dialogs/RatingDialog/RatingDialog';
import AverageRating from '../../common/rating/AverageRating/AverageRating';
import { ProductInfoTabs } from '../ProductInfoTabs';
import ProductsList from '../ProductsList/ProductsList';
import {
  getProductAction,
  getSimilarProductsAction,
  rateProductAction,
} from '../../../store/features/product/productSlice';
import {
  addToCart,
  setDrawerOpen,
} from '../../../store/features/cart/cartSlice';
import { ApiCallAlert } from '../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../common/async/ApiCallLoader';

const ProductDetails = () => {
  const user = useSelector((state) => state.user.user);
  const { product, similarProducts } = useSelector(
    (state) => state.product.selectedProduct
  );
  const cart = useSelector((state) => state.cart.cart);

  const currentProductCart = product && cart[product._id];

  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const navigate = useNavigate();
  const { productId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction(productId));
    dispatch(getSimilarProductsAction(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && user) {
      const userRating = product.ratings.find(
        (rating) => rating.postedBy === user._id
      );
      userRating && setRating(userRating.stars);
    }

    return () => setRating(0);
  }, [product, user]);

  const rateProduct = () => {
    dispatch(rateProductAction({ productId: product._id, rating }));
  };

  return (
    <>
      {product && (
        <Grid container={true} sx={{ padding: 2 }}>
          <Grid
            item={true}
            sm={12}
            md={6}
            sx={{ '& .slide img': { maxHeight: '390px', objectFit: 'cover' } }}
          >
            <ImagesCarousel images={product.images} />
          </Grid>

          <Grid item={true} xs={12} sm={12} md={6} sx={{ paddingLeft: 1 }}>
            <Typography
              gutterBottom={true}
              variant='h5'
              sx={{
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.primary.main,
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
                    <Typography variant='body1'>{`$ ${product.price.toFixed(
                      2
                    )}`}</Typography>
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
                <Button
                  onClick={() => {
                    if (!currentProductCart) {
                      dispatch(addToCart({ product, count: 1 }));
                      dispatch(setDrawerOpen(true));
                    }
                  }}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <AddShoppingCart />
                  <Typography variant='caption'>
                    {currentProductCart ? 'Already in the cart' : 'Add to cart'}
                  </Typography>
                </Button>

                <Button
                  onClick={() => console.log('works')}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Favorite />
                  <Typography variant='caption'>Add to wishlist</Typography>
                </Button>

                <Button
                  onClick={() => {
                    if (user) {
                      setShowRatingModal(true);
                    } else {
                      // if the user was trying to rate a product while not logged in, redirect him back to the product page after login
                      navigate('/login', {
                        state: {
                          customNavigateTo: `/product/${product._id}`,
                        },
                      });
                    }
                  }}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {rating > 0 ? <Star /> : <StarBorderOutlined />}
                  <Typography variant='caption'>
                    {user ? 'Leave rating' : 'Login to leave rating'}
                  </Typography>
                </Button>
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

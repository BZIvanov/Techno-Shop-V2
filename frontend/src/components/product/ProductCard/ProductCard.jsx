import { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Skeleton,
  Button,
} from '@mui/material';
import { Edit, Delete, Preview, AddShoppingCart } from '../../mui/Icons';
import { ConfirmDialog } from '../../common/dialogs/ConfirmDialog';
import AverageRating from '../../common/rating/AverageRating/AverageRating';
import { useSelector, useDispatch } from '../../../store/hooks';
import { deleteProductAction } from '../../../store/features/product/productSlice';
import {
  addToCart,
  setDrawerOpen,
} from '../../../store/features/cart/cartSlice';
import productImage from '../../../assets/images/product.png';

const ProductCard = ({ product }) => {
  const { _id, title, price, description, images, ratings } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.apiCall.loading);
  const cart = useSelector((state) => state.cart.cart);

  const currentProductCart = cart[_id];

  const isUserAdmin = user && user.role === 'admin';

  const [removeProductDialog, setRemoveProductDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });

  const handleProductDeleteClick = (productId) => () => {
    setRemoveProductDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });
    dispatch(deleteProductAction(productId));
  };

  return (
    <Fragment>
      <AverageRating ratings={ratings} size='small' />
      <Card>
        <CardActionArea onClick={() => navigate(`/product/${_id}`)}>
          {loading ? (
            <Skeleton
              sx={{ height: 140 }}
              animation='wave'
              variant='rectangular'
            />
          ) : (
            <CardMedia
              component='img'
              height='140'
              image={images.length > 0 ? images[0].imageUrl : productImage}
              alt='app product'
            />
          )}
          <CardContent sx={{ paddingBlock: '8px' }}>
            {loading ? (
              <Fragment>
                <Skeleton
                  animation='wave'
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation='wave'
                  height={10}
                  width='80%'
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation='wave' height={10} />
              </Fragment>
            ) : (
              <Fragment>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography gutterBottom={true} variant='body1' noWrap={true}>
                    {title}
                  </Typography>
                  <Typography gutterBottom={true} variant='body1'>
                    <strong>${price.toFixed(2)}</strong>
                  </Typography>
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  {description.length > 80
                    ? description.substring(0, 80) + '...'
                    : description}
                </Typography>
              </Fragment>
            )}
          </CardContent>
        </CardActionArea>

        <CardActions>
          {loading ? (
            <Fragment>
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
            </Fragment>
          ) : (
            <Fragment>
              {isUserAdmin ? (
                <Fragment>
                  <Button
                    component={Link}
                    to={`/admin/product/${_id}`}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Edit />
                    <Typography variant='caption'>Edit</Typography>
                  </Button>
                  <Button
                    onClick={() =>
                      setRemoveProductDialog({
                        open: true,
                        text: 'Are you sure you want to delete this product?',
                        onConfirm: handleProductDeleteClick(_id),
                      })
                    }
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Delete />
                    <Typography variant='caption'>Delete</Typography>
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Button
                    component={Link}
                    to={`/product/${_id}`}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Preview />
                    <Typography variant='caption'>Details</Typography>
                  </Button>

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
                      {currentProductCart
                        ? 'Already in the cart'
                        : 'Add to cart'}
                    </Typography>
                  </Button>
                </Fragment>
              )}
            </Fragment>
          )}
        </CardActions>
      </Card>

      <ConfirmDialog
        dialogConfig={removeProductDialog}
        setDialogConfig={setRemoveProductDialog}
      />
    </Fragment>
  );
};

export default ProductCard;

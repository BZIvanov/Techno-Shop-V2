import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from '../../../store/hooks';
import { setDrawerOpen } from '../../../store/features/cart/cartSlice';
import productImage from '../../../assets/images/product.png';

const CartDrawer = () => {
  const dispatch = useDispatch();

  const isDrawerOpen = useSelector((state) => state.cart.drawerOpen);
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={() => dispatch(setDrawerOpen(false))}
    >
      <Typography sx={{ paddingBlock: 1, textAlign: 'center' }} variant='body1'>
        Products in cart
      </Typography>

      <Divider />

      {Object.keys(cart).map((cartProductKey) => {
        const { product } = cart[cartProductKey];

        return (
          <Card key={product._id} sx={{ margin: 1 }}>
            <CardMedia
              sx={{ height: 30, minWidth: 250 }}
              image={
                product.images.length > 0
                  ? product.images[0].imageUrl
                  : productImage
              }
              title={product.title}
            />
            <CardContent sx={{ '&:last-child': { padding: 1 } }}>
              <Typography gutterBottom={false} variant='body2'>
                {product.title}
              </Typography>
            </CardContent>
          </Card>
        );
      })}

      <Button
        variant='contained'
        component={Link}
        to='/cart'
        onClick={() => dispatch(setDrawerOpen(false))}
        size='small'
      >
        Go to cart
      </Button>
    </Drawer>
  );
};

export default CartDrawer;

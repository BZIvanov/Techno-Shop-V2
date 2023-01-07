import ModalImage from 'react-modal-image';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TextField,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Delete, Check, Clear } from '../../mui/Icons';
import {
  addToCart,
  removeFromCart,
} from '../../../store/features/cart/cartSlice';
import productImage from '../../../assets/images/product.png';

const CartProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  const cartProductsKeys = Object.keys(cart);

  return (
    <Box>
      <Paper sx={{ margin: 1 }}>
        <Toolbar variant='dense'>
          <Typography sx={{ flex: '1 1 100%' }} variant='h6'>
            {cartProductsKeys.length} products selected.
          </Typography>

          <Button
            variant='contained'
            disabled={cartProductsKeys.length === 0}
            onClick={() => {
              if (user) {
              } else {
                // if the user was trying to buy products from cart while not logged in, redirect it back to the cart page after login
                navigate('/login', { state: { customNavigateTo: '/cart' } });
              }
            }}
          >
            Buy
          </Button>
        </Toolbar>

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Image</TableCell>
                <TableCell align='center'>Title</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>Brand</TableCell>
                <TableCell align='center'>Color</TableCell>
                <TableCell align='center'>Quantity</TableCell>
                <TableCell align='center'>Shipping</TableCell>
                <TableCell align='center'>Total price</TableCell>
                <TableCell align='center'>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartProductsKeys.map((cartProductKey) => {
                const { product, count } = cart[cartProductKey];
                const {
                  _id,
                  title,
                  images,
                  price,
                  quantity,
                  brand,
                  color,
                  shipping,
                } = product;

                return (
                  <TableRow key={cartProductKey}>
                    <TableCell
                      align='center'
                      sx={{ '& > div > img': { height: '30px' } }} // only apply small height to the small image
                    >
                      {images.length > 0 ? (
                        <ModalImage
                          small={images[0].imageUrl}
                          large={images[0].imageUrl}
                          alt={title}
                        />
                      ) : (
                        <ModalImage
                          small={productImage}
                          large={productImage}
                          alt='Default preview'
                        />
                      )}
                    </TableCell>
                    <TableCell align='center'>{title}</TableCell>
                    <TableCell align='center'>$ {price.toFixed(2)}</TableCell>
                    <TableCell align='center'>{brand}</TableCell>
                    <TableCell align='center'>{color}</TableCell>
                    <TableCell align='center'>
                      <TextField
                        sx={{ maxWidth: 50 }}
                        type='number'
                        min='0'
                        variant='standard'
                        value={count}
                        onChange={(e) => {
                          const value = +e.target.value;
                          if (value > 0 && value <= quantity) {
                            dispatch(
                              addToCart({ product, count: +e.target.value })
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {shipping === 'Yes' ? (
                        <Check color='success' />
                      ) : (
                        <Clear color='warning' />
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      $ {(count * price).toFixed(2)}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        size='small'
                        onClick={() => dispatch(removeFromCart(_id))}
                      >
                        <Delete fontSize='inherit' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={5} />
                <TableCell colSpan={2} align='center'>
                  <strong>Total</strong>
                </TableCell>
                <TableCell align='center'>
                  <strong>
                    ${' '}
                    {cartProductsKeys
                      .map((cartProductKey) => {
                        const {
                          product: { price },
                          count,
                        } = cart[cartProductKey];

                        return price * count;
                      })
                      .reduce((a, b) => a + b, 0)
                      .toFixed(2)}
                  </strong>
                </TableCell>
                <TableCell colSpan={1} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CartProducts;

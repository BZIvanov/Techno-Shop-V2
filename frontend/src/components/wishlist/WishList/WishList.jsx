import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ConfirmDialog from '../../common/dialogs/ConfirmDialog/ConfirmDialog';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  getWishlistAction,
  addToWishlistAction,
} from '../../../store/features/wishlist/wishlistSlice';
import { Delete } from '../../mui/Icons';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const WishList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.wishlist.products);

  useEffect(() => {
    dispatch(getWishlistAction());
  }, [dispatch]);

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

    dispatch(addToWishlistAction(productId));
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Wishlist Products</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box>
        <Paper sx={{ margin: 1 }}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Title</TableCell>
                  <TableCell align='center'>Price</TableCell>
                  <TableCell align='center'>Brand</TableCell>
                  <TableCell align='center'>Color</TableCell>
                  <TableCell align='center'>Quantity</TableCell>
                  <TableCell align='center'>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(
                  ({ _id, title, brand, color, price, quantity }) => {
                    return (
                      <TableRow key={_id}>
                        <TableCell align='center'>
                          <Link to={`/product/${_id}`}>{title}</Link>
                        </TableCell>
                        <TableCell align='center'>
                          {currencyFormatter.format(price)}
                        </TableCell>
                        <TableCell align='center'>{brand}</TableCell>
                        <TableCell align='center'>{color}</TableCell>
                        <TableCell align='center'>{quantity}</TableCell>
                        <TableCell align='center'>
                          <IconButton
                            size='small'
                            onClick={() =>
                              setRemoveProductDialog({
                                open: true,
                                text: 'Are you sure you want to delete this product?',
                                onConfirm: handleProductDeleteClick(_id),
                              })
                            }
                          >
                            <Delete fontSize='inherit' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <ConfirmDialog
        dialogConfig={removeProductDialog}
        setDialogConfig={setRemoveProductDialog}
      />
    </Box>
  );
};

export default WishList;

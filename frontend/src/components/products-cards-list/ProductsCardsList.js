import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Grid, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ConfirmDialog } from '../confirm-dialog';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import {
  getProductsAction,
  deleteProductAction,
} from '../../store/action-creators';
import { ProductCard } from '../product-card';

const ProductsCardsList = () => {
  const { token } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
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
    dispatch(deleteProductAction(productId, token));
  };

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

      <Paper sx={{ width: '100%', padding: 2 }}>
        {products.length > 0 ? (
          <Grid container={true} spacing={3}>
            {products.map((product) => (
              <Grid key={product._id} item={true} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product}>
                  <>
                    <IconButton
                      component={Link}
                      to={`/admin/product/${product._id}`}
                      size='medium'
                      color='warning'
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size='medium'
                      color='warning'
                      onClick={() =>
                        setRemoveProductDialog({
                          open: true,
                          text: 'Are you sure you want to delete this product?',
                          onConfirm: handleProductDeleteClick(product._id),
                        })
                      }
                    >
                      <Delete />
                    </IconButton>
                  </>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='subtitle2'>
            No Products found. Use the form above to create some.
          </Typography>
        )}
      </Paper>

      <ConfirmDialog
        dialogConfig={removeProductDialog}
        setDialogConfig={setRemoveProductDialog}
      />

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ProductsCardsList;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Pagination,
} from '@mui/material';
import { Edit, Delete } from '../../mui/Icons';
import { ConfirmDialog } from '../../common/dialogs/ConfirmDialog';
import AverageRating from '../../common/rating/AverageRating/AverageRating';
import { ApiCallAlert } from '../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../common/async/ApiCallLoader';
import {
  getProductsAction,
  deleteProductAction,
} from '../../../store/features/product/productSlice';
import ProductCard from '../../product/ProductCard/ProductCard';
import { PRODUCTS_LIST_TYPES } from '../../../constants';

const PRODUCTS_PER_PAGE = 12;

const ProductsCardsList = () => {
  const dispatch = useDispatch();

  const { products, totalCount } = useSelector((state) => state.product.all);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getProductsAction({
        productsType: PRODUCTS_LIST_TYPES.all,
        page,
        perPage: PRODUCTS_PER_PAGE,
      })
    );
  }, [dispatch, page]);

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px' },
      }}
    >
      <Typography variant='h5'>Products List</Typography>

      <Paper sx={{ width: '100%', padding: 2 }}>
        {products.length > 0 ? (
          <Grid container={true} spacing={3}>
            {products.map((product) => (
              <Grid
                key={product._id}
                item={true}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <AverageRating ratings={product.ratings} size='small' />

                <ProductCard product={product}>
                  <Button
                    component={Link}
                    to={`/admin/product/${product._id}`}
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
                        onConfirm: handleProductDeleteClick(product._id),
                      })
                    }
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Delete />
                    <Typography variant='caption'>Delete</Typography>
                  </Button>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            No products found
          </Typography>
        )}

        {totalCount > PRODUCTS_PER_PAGE && (
          <Stack sx={{ margin: 2, display: 'flex', alignItems: 'center' }}>
            <Pagination
              page={page}
              onChange={(_, value) => setPage(value)}
              count={Math.ceil(totalCount / PRODUCTS_PER_PAGE)}
              boundaryCount={2}
              showFirstButton={true}
              showLastButton={true}
            />
          </Stack>
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

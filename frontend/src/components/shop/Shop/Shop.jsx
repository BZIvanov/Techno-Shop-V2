import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { Box, List, Slider } from '@mui/material';
import { ProductsList } from '../../product/ProductsList';
import { FilterListItem } from '../../common/lists/FilterListItem';
import { getProductsAction } from '../../../store/features/product/productSlice';
import { filterAction } from '../../../store/features/products-filter/productsFilterSlice';
import { PRODUCTS_LIST_TYPES } from '../../../constants';

const ShopPage = () => {
  const { products, totalCount } = useSelector((state) => state.product.all);
  const { text, price } = useSelector((state) => state.productsFilter);

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const throttle = setTimeout(() => {
      dispatch(
        getProductsAction({
          productsType: PRODUCTS_LIST_TYPES.all,
          page,
          text,
          price: price.join(),
        })
      );
    }, 1000);

    return () => clearTimeout(throttle);
  }, [dispatch, page, text, price]);

  const handlePriceChange = (event, newValue) => {
    dispatch(filterAction({ price: newValue }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <List sx={{ minWidth: '260px', bgcolor: 'background.paper' }}>
          <FilterListItem title={`Price (${price[0]}-${price[1]})`}>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay='auto'
              disableSwap={true}
              max={4999}
            />
          </FilterListItem>
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <ProductsList
          header='Products'
          products={products}
          page={page}
          handlePageChange={(_, value) => setPage(value)}
          totalCount={totalCount}
          productsPerPage={12}
        />
      </Box>
    </Box>
  );
};

export default ShopPage;
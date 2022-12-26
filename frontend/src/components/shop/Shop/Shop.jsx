import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  Box,
  List,
  Slider,
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import { ProductsList } from '../../product/ProductsList';
import { FilterListItem } from '../../common/lists/FilterListItem';
import { getProductsAction } from '../../../store/features/product/productSlice';
import { filterAction } from '../../../store/features/products-filter/productsFilterSlice';
import { getAllCategoriesAction } from '../../../store/features/category/categorySlice';
import { PRODUCTS_LIST_TYPES } from '../../../constants';

const ShopPage = () => {
  const { products, totalCount } = useSelector((state) => state.product.all);
  const { text, price, categories } = useSelector(
    (state) => state.productsFilter
  );
  const allCategories = useSelector((state) => state.category.categories);

  const [page, setPage] = useState(1);
  const [localPrice, setLocalPrice] = useState(price);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const throttle = setTimeout(() => {
      dispatch(
        getProductsAction({
          productsType: PRODUCTS_LIST_TYPES.all,
          page,
          text,
          price: price.join(','),
          categories: categories.map((category) => category._id).join(','),
        })
      );
    }, 500);

    return () => clearTimeout(throttle);
  }, [dispatch, page, text, price, categories]);

  // change the price, when the user is sliding
  const handleLocalPriceChange = (event, newValue) => {
    setLocalPrice(newValue);
  };
  // change the price in the store, when the user is done sliding, which will then trigger api call with the updated store price value
  const handleStorePriceChange = (event, newValue) => {
    dispatch(filterAction({ price: newValue }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <List
        dense={true}
        sx={{ minWidth: '300px', width: '300px', bgcolor: 'background.paper' }}
      >
        <FilterListItem title={`Price (${price[0]}-${price[1]})`}>
          <Box sx={{ padding: '0 32px' }}>
            <Slider
              value={localPrice}
              onChange={handleLocalPriceChange}
              onChangeCommitted={handleStorePriceChange}
              valueLabelDisplay='auto'
              disableSwap={true}
              step={100}
              max={4999}
              valueLabelFormat={(value) => `$ ${value}`}
              size='small'
            />
          </Box>
        </FilterListItem>

        <FilterListItem title={'Category'}>
          <Box sx={{ padding: '0 20px' }}>
            <Autocomplete
              multiple={true}
              options={allCategories}
              disableCloseOnSelect={true}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox checked={selected} />
                    {option.name}
                  </li>
                );
              }}
              renderInput={(params) => {
                return <TextField {...params} variant='standard' />;
              }}
              limitTags={3}
              isOptionEqualToValue={(v, a) => {
                return v._id === a._id;
              }}
              value={categories}
              onChange={(event, values) => {
                dispatch(filterAction({ categories: values }));
              }}
            />
          </Box>
        </FilterListItem>
      </List>

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

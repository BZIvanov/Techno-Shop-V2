import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  Box,
  List,
  Slider,
  Autocomplete,
  Checkbox,
  TextField,
  Rating,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  AttachMoney,
  Category,
  AutoAwesomeMosaic,
  Star,
  LocalShipping,
} from '../../mui/Icons';
import ProductsList from '../../product/ProductsList/ProductsList';
import { FilterListItem } from '../../common/lists/FilterListItem';
import { getProductsAction } from '../../../store/features/product/productSlice';
import { filterAction } from '../../../store/features/products-filter/productsFilterSlice';
import { getAllCategoriesAction } from '../../../store/features/category/categorySlice';
import { getSubcategoriesAction } from '../../../store/features/subcategory/subcategorySlice';
import { PRODUCTS_LIST_TYPES, MAX_RATING_VALUE } from '../../../constants';

const ShopPage = () => {
  const { products, totalCount } = useSelector((state) => state.product.all);
  const { text, price, categories, subcategories, rating, shipping } =
    useSelector((state) => state.productsFilter);
  const allCategories = useSelector((state) => state.category.categories);
  const allSubcategories = useSelector(
    (state) => state.subcategory.subcategories
  );

  const [page, setPage] = useState(1);
  const [localPrice, setLocalPrice] = useState(price);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getSubcategoriesAction());
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
          subcategories: subcategories
            .map((subcategory) => subcategory._id)
            .join(','),
          rating,
          shipping,
        })
      );
    }, 500);

    return () => clearTimeout(throttle);
  }, [
    dispatch,
    page,
    text,
    price,
    categories,
    subcategories,
    rating,
    shipping,
  ]);

  return (
    <Box sx={{ display: 'flex' }}>
      <List
        dense={true}
        sx={{ minWidth: '300px', width: '300px', bgcolor: 'background.paper' }}
      >
        <FilterListItem
          title={`Price (${price[0]}-${price[1]})`}
          icon={<AttachMoney fontSize='small' />}
        >
          <Box sx={{ padding: '0 32px' }}>
            <Slider
              value={localPrice}
              onChange={(event, newValue) => {
                // change the price, when the user is sliding
                setLocalPrice(newValue);
              }}
              onChangeCommitted={(event, newValue) => {
                // change the price in the store, when the user is done sliding, which will then trigger api call with the updated store price value
                dispatch(filterAction({ price: newValue }));
              }}
              valueLabelDisplay='auto'
              disableSwap={true}
              step={100}
              max={4999}
              valueLabelFormat={(value) => `$ ${value}`}
              size='small'
            />
          </Box>
        </FilterListItem>

        <FilterListItem title='Category' icon={<Category fontSize='small' />}>
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

        <FilterListItem
          title='Subcategory'
          icon={<AutoAwesomeMosaic fontSize='small' />}
        >
          <Box sx={{ padding: '0 20px' }}>
            <Autocomplete
              multiple={true}
              options={allSubcategories}
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
              value={subcategories}
              onChange={(event, values) => {
                dispatch(filterAction({ subcategories: values }));
              }}
            />
          </Box>
        </FilterListItem>

        <FilterListItem title='Rating' icon={<Star fontSize='small' />}>
          <Box sx={{ padding: '0 20px' }}>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                dispatch(filterAction({ rating: newValue }));
              }}
              precision={1}
              size='large'
              max={MAX_RATING_VALUE}
            />
          </Box>
        </FilterListItem>

        <FilterListItem
          title='Shipping'
          icon={<LocalShipping fontSize='small' />}
        >
          <Box sx={{ padding: '0 20px' }}>
            <FormControl sx={{ width: '100%' }}>
              <Select
                variant='standard'
                value={shipping}
                onChange={(event) => {
                  dispatch(filterAction({ shipping: event.target.value }));
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </Select>
            </FormControl>
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

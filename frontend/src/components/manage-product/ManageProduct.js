import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { TextFieldAdapter } from '../text-field-adapter';
import { SelectDropdownAdapter } from '../select-dropdown-adapter';
import { SelectDropdownMultichipAdapter } from '../select-dropdown-multichip-adapter';
import { ApiCallLoader } from '../api-call-loader';
import { ApiCallAlert } from '../api-call-alert';
import {
  getAllCategoriesAction,
  getCategorySubcategoriesAction,
  createProductAction,
} from '../../store/action-creators';
import schema from './form-schema';

const ManageProduct = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { token } = useSelector((state) => state.user);
  const { categories, selectedCategorySubcategories } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const { control, handleSubmit, formState, reset, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      shipping: 'Yes',
      quantity: 0,
      color: '',
      brand: '',
      categoryId: '',
      subcategories: [],
    },
    resolver: yupResolver(schema),
  });

  const handleProductSubmit = (values) => {
    const subcategoriesIds = values.subcategories.map(
      (subcategory) => subcategory._id
    );

    dispatch(
      createProductAction({ ...values, subcategories: subcategoriesIds }, token)
    );

    reset();
  };

  const selectedCategoryId = watch('categoryId');

  useEffect(() => {
    if (selectedCategoryId) {
      setValue('subcategories', []);
      dispatch(getCategorySubcategoriesAction(selectedCategoryId));
    }
  }, [dispatch, setValue, selectedCategoryId]);

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h1'>Manage Products</Typography>

      <Box sx={{ width: '99%' }}>
        <form onSubmit={handleSubmit(handleProductSubmit)}>
          <Box my={1}>
            <TextFieldAdapter control={control} name='title' label='Title' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='description'
              label='Description'
            />
          </Box>
          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='price'
              label='Price'
              type='number'
            />
          </Box>
          <Box my={1}>
            <SelectDropdownAdapter
              control={control}
              name='shipping'
              label='Shipping'
              options={['Yes', 'No']}
            />
          </Box>
          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='quantity'
              label='Quantity'
              type='number'
            />
          </Box>
          <Box my={1}>
            <TextFieldAdapter control={control} name='color' label='Color' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter control={control} name='brand' label='Brand' />
          </Box>
          <Box my={1}>
            <SelectDropdownAdapter
              control={control}
              name='categoryId'
              label='Category'
              options={categories}
            />
          </Box>

          <Box>
            <SelectDropdownMultichipAdapter
              control={control}
              name='subcategories'
              label='Subcategory'
              options={selectedCategorySubcategories}
            />
          </Box>

          <Box mt={2} ml={1}>
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => {
                reset();
              }}
              disabled={formState.submitting || loading}
            >
              Reset
            </Button>
            <Button
              sx={{ marginLeft: '5px' }}
              variant='contained'
              type='submit'
              disabled={formState.submitting || loading}
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ManageProduct;

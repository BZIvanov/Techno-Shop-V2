import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Badge,
  Avatar,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { TextFieldAdapter } from '../text-field-adapter';
import { SelectDropdownAdapter } from '../select-dropdown-adapter';
import { SelectDropdownMultichipAdapter } from '../select-dropdown-multichip-adapter';
import { ImagesFieldAdapter } from '../images-field-adapter';
import { ApiCallLoader } from '../api-call-loader';
import { ApiCallAlert } from '../api-call-alert';
import {
  getAllCategoriesAction,
  getCategorySubcategoriesAction,
  getProductAction,
  createProductAction,
} from '../../store/action-creators';
import schema from './form-schema';

const ManageProduct = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { token } = useSelector((state) => state.user);
  const { categories, selectedCategorySubcategories } = useSelector(
    (state) => state.category
  );
  const { product } = useSelector((state) => state.product);

  const { id } = useParams();

  const [previewImages, setPreviewImages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // if product id is found in the url, we are editing a product
    if (id) {
      dispatch(getProductAction(id));
    }

    dispatch(getAllCategoriesAction());
  }, [dispatch, id]);

  const { control, handleSubmit, formState, reset, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      shipping: 'Yes',
      quantity: '',
      color: '',
      brand: '',
      category: '',
      subcategories: [],
      images: [],
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

  const selectedFormCategoryId = watch('category');
  const selectedFormImages = watch('images');

  useEffect(() => {
    if (product && categories.length > 0) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('shipping', product.shipping);
      setValue('quantity', product.quantity);
      setValue('color', product.color);
      setValue('brand', product.brand);
      setValue('category', product.category._id);
    }
  }, [setValue, product, categories]);

  // reset selected subcategories and fetch subcategories for the selected category, when category changes
  useEffect(() => {
    if (selectedFormCategoryId) {
      setValue('subcategories', []);
      dispatch(getCategorySubcategoriesAction(selectedFormCategoryId));
    }
  }, [dispatch, setValue, selectedFormCategoryId]);

  // watch images
  useEffect(() => {
    const images = selectedFormImages.map((img) =>
      Object.assign(img, {
        preview: URL.createObjectURL(img),
      })
    );

    setPreviewImages(images);
  }, [selectedFormImages]);

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
              name='category'
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

          <Divider sx={{ margin: '8px 0' }} />
          <Box>
            <ImagesFieldAdapter control={control} name='images' />
          </Box>

          <Stack sx={{ marginTop: 3 }} spacing={2} direction='row'>
            {previewImages.map((previewImg) => (
              <Badge
                key={previewImg.name}
                badgeContent={
                  <CloseOutlined
                    sx={{ cursor: 'pointer' }}
                    htmlColor={'red'}
                    onClick={() =>
                      setValue(
                        'images',
                        previewImages.filter(
                          (pi) => pi.name !== previewImg.name
                        )
                      )
                    }
                  />
                }
              >
                <Avatar
                  alt='product preview'
                  src={previewImg.preview}
                  sx={{ width: 90, height: 90 }}
                />
              </Badge>
            ))}
          </Stack>

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

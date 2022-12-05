import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Badge,
  Avatar,
} from '@mui/material';
import { CloseOutlined } from '../../mui/Icons';
import { TextFieldAdapter } from '../../common/forms/TextFieldAdapter';
import { SelectDropdownAdapter } from '../../common/forms/SelectDropdownAdapter';
import { SelectDropdownMultichipAdapter } from '../../common/forms/SelectDropdownMultichipAdapter';
import { ImagesFieldAdapter } from '../../common/forms/ImagesFieldAdapter';
import { ApiCallLoader } from '../../common/async/ApiCallLoader';
import { ApiCallAlert } from '../../common/async/ApiCallAlert';
import {
  getAllCategoriesAction,
  getCategorySubcategoriesAction,
} from '../../../store/features/category/categorySlice';
import {
  getProductAction,
  createProductAction,
  updateProductAction,
} from '../../../store/features/product/productSlice';
import { formConfig } from './form-schema';
import useForm from '../../../providers/form/hooks/useForm';

const ManageProduct = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { token } = useSelector((state) => state.user);
  const { categories, selectedCategorySubcategories } = useSelector(
    (state) => state.category
  );
  const { product } = useSelector((state) => state.product.selectedProduct);

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

  useEffect(() => {
    if (product) {
      dispatch(getCategorySubcategoriesAction(product.category._id));
    }
  }, [dispatch, product]);

  const { control, handleSubmit, formState, reset, watch, setValue } =
    useForm(formConfig);

  const handleProductSubmit = (values) => {
    if (id) {
      const { images, ...rest } = values;
      dispatch(
        updateProductAction(
          { _id: id, images: images.length > 0 ? images : undefined, ...rest },
          token
        )
      );
    } else {
      dispatch(createProductAction(values, token));
    }

    reset();
  };

  const selectedFormCategoryId = watch('category');
  const selectedFormImages = watch('images');

  useEffect(() => {
    if (
      id &&
      product &&
      categories.length > 0 &&
      selectedCategorySubcategories.length > 0
    ) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('shipping', product.shipping);
      setValue('quantity', product.quantity);
      setValue('color', product.color);
      setValue('brand', product.brand);
      setValue('category', product.category._id);
      setValue(
        'subcategories',
        product.subcategories.map((subcategory) => subcategory._id)
      );
    }
  }, [setValue, id, product, categories, selectedCategorySubcategories]);

  // reset selected subcategories and fetch subcategories for the selected category, when category changes
  useEffect(() => {
    if (selectedFormCategoryId) {
      setValue('subcategories', []);
      dispatch(getCategorySubcategoriesAction(selectedFormCategoryId));
    }
  }, [dispatch, setValue, selectedFormCategoryId]);

  // watch images
  useEffect(() => {
    setPreviewImages(selectedFormImages);
  }, [selectedFormImages]);

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Products</Typography>

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
                    onClick={() => {
                      setValue(
                        'images',
                        previewImages.filter(
                          (pi) => pi.name !== previewImg.name
                        )
                      );
                    }}
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
              {id ? 'Update' : 'Create'}
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
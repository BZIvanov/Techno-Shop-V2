import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
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
import { useForm } from '../../../providers/form/hooks';
import FormProvider from '../../../providers/form/FormProvider';
import PreviewNewImageAvatar from '../../common/avatars/PreviewNewImageAvatar/PreviewNewImageAvatar';
import PreviewExistingImageAvatar from '../../common/avatars/PreviewExistingImageAvatar/PreviewExistingImageAvatar';

const ManageProduct = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  const { loading } = useSelector((state) => state.apiCall);
  const { categories, selectedCategorySubcategories } = useSelector(
    (state) => state.category
  );
  const { product } = useSelector((state) => state.product.selectedProduct);

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // we will have these, when editing a product

  useEffect(() => {
    // if product id is found in the url, we are editing a product
    if (productId) {
      dispatch(getProductAction(productId));
    }

    dispatch(getAllCategoriesAction());
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      dispatch(getCategorySubcategoriesAction(product.category._id));
    }
  }, [dispatch, product]);

  const formMethods = useForm(formConfig);
  const { formState, reset, watch, setValue } = formMethods;

  const handleProductSubmit = (values) => {
    if (productId) {
      dispatch(
        updateProductAction({
          productId,
          existingImages,
          ...values,
        })
      );
    } else {
      dispatch(createProductAction(values));
    }

    reset();
    setExistingImages([]);
  };

  const selectedFormCategoryId = watch('category');
  const selectedFormImages = watch('images');

  useEffect(() => {
    if (
      productId &&
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
      setExistingImages(product.images);
    }
  }, [setValue, productId, product, categories, selectedCategorySubcategories]);

  // reset selected subcategories and fetch subcategories for the selected category, when category changes
  useEffect(() => {
    if (selectedFormCategoryId) {
      setValue('subcategories', []);
      dispatch(getCategorySubcategoriesAction(selectedFormCategoryId));
    }
  }, [dispatch, setValue, selectedFormCategoryId]);

  // watch images
  useEffect(() => {
    setNewImages(selectedFormImages);
  }, [selectedFormImages]);

  const removeNewImage = (imageName) => {
    setValue(
      'images',
      newImages.filter((previewImage) => previewImage.name !== imageName)
    );
  };

  const removeExistingImage = (imageId) => {
    const filteredImages = existingImages.filter((existingImage) => {
      return existingImage.publicId !== imageId;
    });
    setExistingImages(filteredImages);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Product Form</Typography>

      <Box sx={{ width: '99%' }}>
        <FormProvider onSubmit={handleProductSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='title' label='Title' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='description' label='Description' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='price' label='Price' type='number' />
          </Box>
          <Box my={1}>
            <SelectDropdownAdapter
              name='shipping'
              label='Shipping'
              options={['Yes', 'No']}
            />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='quantity' label='Quantity' type='number' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='color' label='Color' />
          </Box>
          <Box my={1}>
            <TextFieldAdapter name='brand' label='Brand' />
          </Box>
          <Box my={1}>
            <SelectDropdownAdapter
              name='category'
              label='Category'
              options={categories}
            />
          </Box>
          <Box>
            <SelectDropdownMultichipAdapter
              name='subcategories'
              label='Subcategory'
              options={selectedCategorySubcategories}
            />
          </Box>

          <Divider sx={{ margin: '8px 0' }} />
          <Box>
            <ImagesFieldAdapter name='images' />
          </Box>

          <Stack sx={{ marginTop: 3 }} spacing={2} direction='row'>
            {/* Newly uploaded images */}
            {newImages.map((previewImage) => {
              return (
                <PreviewNewImageAvatar
                  key={previewImage.path}
                  image={previewImage}
                  handleRemoveImage={removeNewImage}
                />
              );
            })}
            {/* Previosuly uploaded images, when editing a product */}
            {existingImages.map((previewImage) => {
              return (
                <PreviewExistingImageAvatar
                  key={previewImage.publicId}
                  image={previewImage}
                  handleRemoveImage={removeExistingImage}
                />
              );
            })}
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
              {productId ? 'Update' : 'Create'}
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ManageProduct;

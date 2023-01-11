import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import TextFieldAdapter from '../../common/forms/TextFieldAdapter/TextFieldAdapter';
import { SelectDropdownAdapter } from '../../common/forms/SelectDropdownAdapter';
import { SelectDropdownMultichipAdapter } from '../../common/forms/SelectDropdownMultichipAdapter';
import { ImagesFieldAdapter } from '../../common/forms/ImagesFieldAdapter';
import { ApiCallLoader } from '../../common/async/ApiCallLoader';
import { ApiCallAlert } from '../../common/async/ApiCallAlert';
import {
  getAllCategoriesAction,
  getCategorySubcategoriesAction,
  resetCategories,
  resetSelectedCategorySubcategories,
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

  const loading = useSelector((state) => state.apiCall.loading);
  const { categories, selectedCategorySubcategories } = useSelector(
    (state) => state.category
  );

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // we will have these, when editing a product

  const formMethods = useForm(formConfig);
  const { formState, reset, watch, setValue } = formMethods;

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllCategoriesAction());

      // if product id is found in the url, we are editing a product
      if (productId) {
        const { payload } = await dispatch(getProductAction(productId));
        await dispatch(getCategorySubcategoriesAction(payload.category._id));

        // setValues after categories and subcategories are loaded to correctly populate the dropdowns
        setValue('title', payload.title);
        setValue('description', payload.description);
        setValue('price', payload.price);
        setValue('shipping', payload.shipping);
        setValue('quantity', payload.quantity);
        setValue('color', payload.color);
        setValue('brand', payload.brand);
        setValue('category', payload.category._id);
        setValue(
          'subcategories',
          payload.subcategories.map((subcategory) => subcategory._id)
        );
        setExistingImages(payload.images);
      }
    };
    loadData();

    return () => {
      reset();
      dispatch(resetCategories());
      dispatch(resetSelectedCategorySubcategories());
    };
  }, [dispatch, setValue, reset, productId]);

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

  const selectedFormImages = watch('images');
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
              extendedOnChange={(event) => {
                setValue('subcategories', []);
                dispatch(getCategorySubcategoriesAction(event.target.value));
              }}
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

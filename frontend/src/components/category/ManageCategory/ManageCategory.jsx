import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Chip,
  TextField,
  FormControl,
} from '@mui/material';
import { TextFieldAdapter } from '../../common/forms/TextFieldAdapter';
import { ListItem } from '../../common/lists/ListItem';
import { ConfirmDialog } from '../../common/dialogs/ConfirmDialog';
import {
  getAllCategoriesAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '../../../store/features/category/categorySlice';
import { ApiCallAlert } from '../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../common/async/ApiCallLoader';
import { formConfig } from './form-schema';
import { useForm } from '../../../providers/form/hooks';
import FormProvider from '../../../providers/form/FormProvider';

const ManageCategory = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { categories } = useSelector((state) => state.category);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [removeCategoryDialog, setRemoveCategoryDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });
  const [filterCategoryText, setFilterCategoryText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const formMethods = useForm(formConfig);
  const { formState, reset, setValue } = formMethods;

  const handleCategorySubmit = ({ category }) => {
    if (selectedCategory) {
      dispatch(
        updateCategoryAction({ id: selectedCategory._id, name: category })
      );
    } else {
      dispatch(createCategoryAction({ name: category }));
    }

    reset();

    setSelectedCategory(null);
  };

  const handleCategoryDeleteClick = (categoryId) => () => {
    setRemoveCategoryDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });
    dispatch(deleteCategoryAction(categoryId));
    setSelectedCategory(null);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Categories</Typography>

      <Box>
        <FormProvider onSubmit={handleCategorySubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='category' label='Category Name' />
          </Box>

          <Box mt={2} ml={1}>
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => {
                setSelectedCategory(null);
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
              {selectedCategory ? 'Update' : 'Create'}
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            label='Search'
            variant='standard'
            value={filterCategoryText}
            onChange={(e) => setFilterCategoryText(e.target.value)}
          />
        </FormControl>
      </Box>

      <Paper
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 2,
          m: 0,
        }}
        component='ul'
      >
        {categories.length ? (
          categories
            .filter(({ name }) =>
              name.toLowerCase().includes(filterCategoryText.toLowerCase())
            )
            .map(({ _id, name }) => {
              return (
                <ListItem key={_id}>
                  <Chip
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    icon={undefined}
                    label={name}
                    onClick={() => {
                      setValue('category', name);
                      setSelectedCategory({ _id, name });
                    }}
                    onDelete={() =>
                      setRemoveCategoryDialog({
                        open: true,
                        text: 'Are you sure you want to delete this category?',
                        onConfirm: handleCategoryDeleteClick(_id),
                      })
                    }
                  />
                </ListItem>
              );
            })
        ) : (
          <Typography variant='subtitle2'>
            No categories. Use the form above to create some.
          </Typography>
        )}
      </Paper>

      <ConfirmDialog
        dialogConfig={removeCategoryDialog}
        setDialogConfig={setRemoveCategoryDialog}
      />

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ManageCategory;

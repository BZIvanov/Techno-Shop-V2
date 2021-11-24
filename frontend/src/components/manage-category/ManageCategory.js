import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Chip,
  TextField,
} from '@mui/material';
import { TextFieldAdapter } from '../text-field-adapter';
import { ListItem } from '../list-item';
import { ConfirmDialog } from '../confirm-dialog';
import {
  getAllCategoriesAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import schema from './form-schema';

const ManageCategory = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { token } = useSelector((state) => state.user);
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

  const { control, handleSubmit, formState, reset, setValue } = useForm({
    defaultValues: { category: '' },
    resolver: yupResolver(schema),
  });

  const handleCategorySubmit = ({ category }) => {
    if (selectedCategory) {
      dispatch(
        updateCategoryAction(
          { _id: selectedCategory._id, name: category },
          token
        )
      );
    } else {
      dispatch(createCategoryAction({ name: category }, token));
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
    dispatch(deleteCategoryAction(categoryId, token));
    setSelectedCategory(null);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h1'>Manage Categories</Typography>

      <Box sx={{ width: '99%' }}>
        <form onSubmit={handleSubmit(handleCategorySubmit)}>
          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='category'
              label='Category Name'
            />
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
        </form>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label='Search'
          variant='standard'
          value={filterCategoryText}
          onChange={(e) => setFilterCategoryText(e.target.value)}
        />
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

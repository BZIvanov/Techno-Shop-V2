import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Chip,
  TextField,
} from '@mui/material';
import { Category } from '@mui/icons-material';
import { TextFieldAdapter } from '../text-field-adapter';
import { ListItem } from '../list-item';
import { ConfirmDialog } from '../confirm-dialog';
import {
  required,
  minLength,
  composeValidators,
} from '../../utils/form-field-validators';
import {
  getAllCategoriesAction,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  getSubcategoriesAction,
} from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';

const ManageSubcategory = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { token } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subcategory);

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
    dispatch(getSubcategoriesAction());
  }, [dispatch]);

  const handleCategorySubmit = ({ category }, handlers) => {
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

    handlers.restart();

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
      <Typography variant='h1'>Manage Subcategories</Typography>

      <Box sx={{ width: '90%' }}>
        <Form
          initialValues={{
            category: selectedCategory?.name || '',
          }}
          onSubmit={handleCategorySubmit}
          render={({ handleSubmit, submitting, form, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  name='category'
                  component={TextFieldAdapter}
                  validate={composeValidators(required, minLength(2))}
                  label='Subcategory Name'
                  Icon={Category}
                />

                <Box mt={2} ml={1}>
                  <Button
                    variant='contained'
                    color='secondary'
                    type='button'
                    onClick={() => {
                      setSelectedCategory(null);
                      form.reset();
                    }}
                    disabled={submitting || loading || !values.category}
                  >
                    Reset Form
                  </Button>
                  <Button
                    sx={{ marginLeft: '5px' }}
                    variant='contained'
                    type='submit'
                    disabled={submitting || loading}
                  >
                    {selectedCategory ? 'Update' : 'Create'}
                  </Button>
                </Box>
              </form>
            );
          }}
        />
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
                    onClick={() => setSelectedCategory({ _id, name })}
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
            No subcategories. Use the form above to create some.
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

export default ManageSubcategory;

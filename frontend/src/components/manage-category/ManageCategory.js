import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Box, Typography, Button, Divider, Paper, Chip } from '@mui/material';
import { Category } from '@mui/icons-material';
import { TextFieldAdapter } from '../text-field-adapter';
import { ListItem } from '../list-item';
import {
  required,
  minLength,
  composeValidators,
} from '../../utils/form-field-validators';
import {
  getAllCategoriesAction,
  createCategoryAction,
  deleteCategoryAction,
} from '../../store/action-creators';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';

const ManageCategory = () => {
  const { token } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const handleFormSubmit = ({ category }, handlers) => {
    dispatch(createCategoryAction({ name: category }, token));
    handlers.restart();
  };

  const handleCategoryDelete = (categoryId) => () => {
    dispatch(deleteCategoryAction(categoryId, token));
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h1'>Manage Categories</Typography>

      <Box sx={{ width: '90%' }}>
        <Form
          onSubmit={handleFormSubmit}
          render={({ handleSubmit, submitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  name='category'
                  component={TextFieldAdapter}
                  validate={composeValidators(required, minLength(2))}
                  label='Category Name'
                  Icon={Category}
                />

                <Box mt={2} ml={1}>
                  <Button
                    variant='contained'
                    type='submit'
                    disabled={submitting}
                  >
                    Create
                  </Button>
                </Box>
              </form>
            );
          }}
        />
      </Box>

      <Divider style={{ margin: '20px 0' }} />

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
        {categories.map((category) => {
          return (
            <ListItem key={category._id}>
              <Chip
                icon={undefined}
                label={category.name}
                onDelete={handleCategoryDelete(category._id)}
              />
            </ListItem>
          );
        })}
      </Paper>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ManageCategory;

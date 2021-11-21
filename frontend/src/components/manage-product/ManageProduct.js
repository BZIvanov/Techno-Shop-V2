import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Box, Typography, Button } from '@mui/material';
import { TextFieldAdapter } from '../text-field-adapter';
import { SelectDropdownAdapter } from '../select-dropdown-adapter';
import {
  required,
  minLength,
  mustBeNumber,
  minValue,
  composeValidators,
} from '../../utils/form-field-validators';
import {
  getAllCategoriesAction,
  createProductAction,
} from '../../store/action-creators';

const ManageProduct = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { token } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const handleProductSubmit = ({ title }, handlers) => {
    dispatch(createProductAction({ title }, token));

    handlers.restart();
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h1'>Manage Products</Typography>

      <Box sx={{ width: '99%' }}>
        <Form
          initialValues={{
            title: '',
            description: '',
            price: '0',
            shipping: 'Yes',
            quantity: '0',
            color: '',
            brand: '',
          }}
          onSubmit={handleProductSubmit}
          render={({ handleSubmit, submitting, form, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field
                  name='title'
                  component={TextFieldAdapter}
                  validate={composeValidators(required, minLength(2))}
                  label='Title'
                />
                <Field
                  name='description'
                  component={TextFieldAdapter}
                  validate={composeValidators(required, minLength(2))}
                  label='Description'
                />
                <Field
                  name='price'
                  component={TextFieldAdapter}
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                    minValue(0.01)
                  )}
                  label='Price'
                  type='number'
                />
                <Field
                  name='shipping'
                  component={SelectDropdownAdapter}
                  validate={composeValidators(required)}
                  label='Shipping'
                  options={['Yes', 'No']}
                />
                <Field
                  name='quantity'
                  component={TextFieldAdapter}
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                    minValue(1)
                  )}
                  label='Quantity'
                  type='number'
                />
                <Field
                  name='color'
                  component={TextFieldAdapter}
                  validate={composeValidators(required, minLength(2))}
                  label='Color'
                />
                <Field
                  name='brand'
                  component={TextFieldAdapter}
                  validate={composeValidators(required, minLength(2))}
                  label='Brand'
                />
                <Field
                  name='categoryId'
                  component={SelectDropdownAdapter}
                  validate={composeValidators(required)}
                  label='Category'
                  options={categories}
                />

                <Box mt={2} ml={1}>
                  <Button
                    variant='contained'
                    color='secondary'
                    type='button'
                    onClick={() => {
                      form.reset();
                    }}
                    disabled={submitting || loading}
                  >
                    Reset Form
                  </Button>
                  <Button
                    sx={{ marginLeft: '5px' }}
                    variant='contained'
                    type='submit'
                    disabled={submitting || loading}
                  >
                    Create
                  </Button>
                </Box>
                {JSON.stringify(values)}
              </form>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageProduct;

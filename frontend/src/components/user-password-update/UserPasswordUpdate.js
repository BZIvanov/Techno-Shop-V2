import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Box, Typography, Button } from '@mui/material';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import { ApiCallAlert } from '../api-call-alert';
import { ApiCallLoader } from '../api-call-loader';
import {
  required,
  minLength,
  composeValidators,
} from '../../utils/form-field-validators';
import { updatePasswordAction } from '../../store/action-creators';

const UserPasswordUpdate = () => {
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const handleFormSubmit = (values, handlers) => {
    dispatch(updatePasswordAction(values));
    handlers.restart();
  };

  const handleFormValidate = (values) => {
    const errors = {};
    if (
      values.newPassword &&
      values.confirmNewPassword &&
      values.newPassword !== values.confirmNewPassword
    ) {
      errors.confirmNewPassword = 'Passwords must match';
    }

    return errors;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h1'>Password Update Form</Typography>

      <Box
        sx={{
          width: { xs: '90%', sm: '290px' },
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
      >
        <Form
          onSubmit={handleFormSubmit}
          validate={handleFormValidate}
          render={({ handleSubmit, form, submitting, pristine }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box my={1}>
                  <Field
                    name='oldPassword'
                    component={PasswordTextFieldAdapter}
                    validate={composeValidators(required, minLength(8))}
                    label='Old Password'
                  />
                </Box>
                <Box my={1}>
                  <Field
                    name='newPassword'
                    component={PasswordTextFieldAdapter}
                    validate={composeValidators(required, minLength(8))}
                    label='New Password'
                  />
                </Box>
                <Box my={1}>
                  <Field
                    name='confirmNewPassword'
                    component={PasswordTextFieldAdapter}
                    validate={composeValidators(required, minLength(8))}
                    label='Confirm New Password'
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '20px',
                  }}
                >
                  <Button
                    variant='contained'
                    color='secondary'
                    type='button'
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset Form
                  </Button>
                  <Button
                    variant='contained'
                    type='submit'
                    disabled={submitting || loading}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            );
          }}
        />
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default UserPasswordUpdate;

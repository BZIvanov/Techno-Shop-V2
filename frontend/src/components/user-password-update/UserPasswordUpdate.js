import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import {
  required,
  minLength,
  composeValidators,
} from '../../utils/form-field-validators';
import {
  updatePasswordAction,
  apiCallResetType,
} from '../../store/action-creators';

const UserPasswordUpdate = () => {
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const handleCloseSnackbar = () => {
    dispatch(apiCallResetType());
  };

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
      <Typography variant='h1'>Password Reset Form</Typography>

      <Box
        sx={{
          width: { xs: '90%', sm: '290px' },
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
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
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            );
          }}
        />
      </Box>
      {(error || success) && (
        <Snackbar
          open={Boolean(error) || Boolean(success)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            severity={error ? 'error' : 'success'}
            onClose={handleCloseSnackbar}
          >
            {error ? error : success}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UserPasswordUpdate;

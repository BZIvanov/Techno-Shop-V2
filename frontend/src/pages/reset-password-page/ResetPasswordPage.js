import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
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
  resetPasswordAction,
  apiCallResetType,
} from '../../store/action-creators';
import { RESET_PASSWORD_CODE } from '../../store/action-creators/api-call';

const ResetPasswordPage = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, callCode } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { token } = useParams();

  const handleCloseError = () => {
    dispatch(apiCallResetType());
  };

  const handleFormSubmit = (values) => {
    dispatch(resetPasswordAction({ ...values, token }));
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

  if (user) {
    return <Navigate to='/' />;
  }

  if (callCode && callCode === RESET_PASSWORD_CODE) {
    return <Navigate to='/login' />;
  }

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
      {error && (
        <Snackbar
          open={Boolean(error)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseError}
        >
          <Alert severity='error' onClose={handleCloseError}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ResetPasswordPage;

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
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
import { Email } from '@mui/icons-material';
import { TextFieldAdapter } from '../../components/text-field-adapter';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import { ForgotPasswordDialog } from '../../components/forgot-password-dialog';
import {
  required,
  minLength,
  composeValidators,
} from '../../utils/form-field-validators';
import { loginUserAction, apiCallResetType } from '../../store/action-creators';

const LoginPage = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const handleCloseError = () => {
    dispatch(apiCallResetType());
  };

  const handleFormSubmit = (values) => {
    dispatch(loginUserAction(values));
  };

  if (user) {
    return <Navigate to='/' />;
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
      <Typography variant='h1'>Login Form</Typography>

      <Box
        sx={{
          width: { xs: '90%', sm: '290px' },
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1 }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
        <Form
          onSubmit={handleFormSubmit}
          render={({ handleSubmit, submitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box my={1}>
                  <Field
                    name='email'
                    component={TextFieldAdapter}
                    validate={required}
                    label='Email'
                    Icon={Email}
                  />
                </Box>
                <Box my={1}>
                  <Field
                    name='password'
                    component={PasswordTextFieldAdapter}
                    validate={composeValidators(required, minLength(8))}
                    label='Password'
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '20px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    variant='contained'
                    type='submit'
                    disabled={submitting || loading}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            );
          }}
        />
        <Box
          sx={{
            marginTop: '30px',
            textAlign: 'right',
          }}
        >
          <Button
            color='warning'
            onClick={() => setShowForgotPasswordModal(true)}
          >
            <Typography variant='body2'>Forgot Password?</Typography>
          </Button>
        </Box>
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
      <Box>
        <ForgotPasswordDialog
          showForgotPasswordModal={showForgotPasswordModal}
          setShowForgotPasswordModal={setShowForgotPasswordModal}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;

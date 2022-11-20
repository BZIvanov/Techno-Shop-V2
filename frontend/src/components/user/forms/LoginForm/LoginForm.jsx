import { useState } from 'react';
import { useSelector, useDispatch } from '../../../../store/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { Email } from '@mui/icons-material';
import { TextFieldAdapter } from '../../../common/forms/TextFieldAdapter';
import { PasswordTextFieldAdapter } from '../../../common/forms/PasswordTextFieldAdapter';
import { ForgotPasswordDialog } from '../../../forgot-password-dialog';
import { ApiCallAlert } from '../../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../../common/async/ApiCallLoader';
import { loginUserAction } from '../../../../store/features/user/userSlice';
import schema from './form-schema';

const LoginForm = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();
  const location = useLocation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    dispatch(loginUserAction(values));
  };

  if (user) {
    // if the user was trying to rate a product while not logged in, redirect him back to the product page
    const productId = location.state && location.state.productId;
    if (productId) {
      return <Navigate to={`/product/${productId}`} />;
    }

    if (user.role === 'admin') {
      return <Navigate to='/admin/dashboard' />;
    }
    return <Navigate to='/user/dashboard' />;
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
      <Typography variant='h5'>Login Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='email'
              label='Email'
              Icon={Email}
            />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              control={control}
              name='password'
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
              disabled={formState.submitting || loading}
            >
              Login
            </Button>
          </Box>
        </form>

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

      <ForgotPasswordDialog
        showForgotPasswordModal={showForgotPasswordModal}
        setShowForgotPasswordModal={setShowForgotPasswordModal}
      />

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default LoginForm;

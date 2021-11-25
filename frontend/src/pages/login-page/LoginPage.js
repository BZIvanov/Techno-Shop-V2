import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
import { Email } from '@mui/icons-material';
import { TextFieldAdapter } from '../../components/text-field-adapter';
import { PasswordTextFieldAdapter } from '../../components/password-text-field-adapter';
import { ForgotPasswordDialog } from '../../components/forgot-password-dialog';
import { ApiCallAlert } from '../../components/api-call-alert';
import { ApiCallLoader } from '../../components/api-call-loader';
import { loginUserAction } from '../../store/action-creators';
import schema from './form-schema';

const LoginPage = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

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
      <Typography variant='h1'>Login Form</Typography>

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

      <Box>
        <ForgotPasswordDialog
          showForgotPasswordModal={showForgotPasswordModal}
          setShowForgotPasswordModal={setShowForgotPasswordModal}
        />
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default LoginPage;

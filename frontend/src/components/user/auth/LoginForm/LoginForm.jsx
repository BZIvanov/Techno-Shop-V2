import { useState } from 'react';
import { useSelector, useDispatch } from '../../../../store/hooks';
import { Box, Typography, Button } from '@mui/material';
import { Email } from '../../../mui/Icons';
import { TextFieldAdapter } from '../../../common/forms/TextFieldAdapter';
import { PasswordTextFieldAdapter } from '../../../common/forms/PasswordTextFieldAdapter';
import { ForgotPasswordDialog } from '../../password/ForgotPasswordDialog';
import { ApiCallAlert } from '../../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../../common/async/ApiCallLoader';
import { loginUserAction } from '../../../../store/features/user/userSlice';
import { formConfig } from './form-schema';
import useForm from '../../../../providers/form/hooks/useForm';

const LoginForm = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { control, handleSubmit, formState } = useForm(formConfig);

  const handleFormSubmit = (values) => {
    dispatch(loginUserAction(values));
  };

  const handleShowForgotModal = (shouldShow) => {
    setShowForgotPasswordModal(shouldShow);
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
          <Button color='warning' onClick={() => handleShowForgotModal(true)}>
            Forgot Password?
          </Button>
        </Box>
      </Box>

      <ForgotPasswordDialog
        showForgotPasswordModal={showForgotPasswordModal}
        handleShowForgotModal={handleShowForgotModal}
      />

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default LoginForm;

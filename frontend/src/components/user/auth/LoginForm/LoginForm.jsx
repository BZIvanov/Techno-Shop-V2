import { useState } from 'react';
import { useSelector, useDispatch } from '../../../../store/hooks';
import { Box, Typography, Button } from '@mui/material';
import { Email } from '../../../mui/Icons';
import TextFieldAdapter from '../../../common/forms/TextFieldAdapter/TextFieldAdapter';
import PasswordTextFieldAdapter from '../../../common/forms/PasswordTextFieldAdapter/PasswordTextFieldAdapter';
import ForgotPasswordDialog from '../../password/ForgotPasswordDialog/ForgotPasswordDialog';
import ApiCallAlert from '../../../common/async/ApiCallAlert/ApiCallAlert';
import ApiCallLoader from '../../../common/async/ApiCallLoader/ApiCallLoader';
import { loginUserAction } from '../../../../store/features/user/userSlice';
import { formConfig } from './form-schema';
import { useForm } from '../../../../providers/form/hooks';
import FormProvider from '../../../../providers/form/FormProvider';

const LoginForm = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const loading = useSelector((state) => state.apiCall.loading);

  const dispatch = useDispatch();

  const formMethods = useForm(formConfig);
  const { formState } = formMethods;

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
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='email' label='Email' icon={<Email />} />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter name='password' label='Password' />
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
        </FormProvider>

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

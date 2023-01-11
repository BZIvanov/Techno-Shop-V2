import { useSelector, useDispatch } from '../../../../store/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import PasswordTextFieldAdapter from '../../../common/forms/PasswordTextFieldAdapter/PasswordTextFieldAdapter';
import { ApiCallAlert } from '../../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../../common/async/ApiCallLoader';
import { resetPasswordAction } from '../../../../store/features/user/userSlice';
import { formConfig } from './form-schema';
import { useForm } from '../../../../providers/form/hooks';
import FormProvider from '../../../../providers/form/FormProvider';

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const loading = useSelector((state) => state.apiCall.loading);

  const dispatch = useDispatch();

  const { token } = useParams();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = async (values) => {
    await dispatch(resetPasswordAction({ ...values, token }));
    navigate('/login'); // TODO don't navigate if error
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
      <Typography variant='h5'>Password Reset Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <Box my={1}>
            <PasswordTextFieldAdapter name='newPassword' label='New Password' />
          </Box>

          <Box my={1}>
            <PasswordTextFieldAdapter
              name='confirmNewPassword'
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
              onClick={() => reset()}
              disabled={formState.submitting}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={formState.submitting || loading}
            >
              Reset Password
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ResetPasswordForm;
